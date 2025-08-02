import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodayQueue = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [filterType, setFilterType] = useState('Exam');

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [formData, setFormData] = useState({ symptoms: '', diagnosis: '', conclusion: '', medicines: [] });
    const [servicesList, setServicesList] = useState([]);
    const [doctorsList, setDoctorsList] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedProcedure, setSelectedProcedure] = useState(null);
    const [testResult, setTestResult] = useState(null);

    const [medicalRecords, setMedicalRecords] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const fetchMedicalRecords = async (profileId) => {
        try {
            const response = await axios.get(`/api/doctor/danhsachhosobenhancuabenhnhan`, {
                params: { profileId },
            });
            setMedicalRecords(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };
    const handleViewHistory = (profile) => {
        console.log(profile);
        setSelectedProfile(profile);
        fetchMedicalRecords(profile);
        setIsModalOpen(true);
    };

    const doctorId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        const fetchQueue = async () => {
            if (!doctorId || !selectedDate) return;
            setLoading(true);
            try {
                const res = await axios.get(`/api/doctor/today-queue?doctorId=${doctorId}&date=${selectedDate}`);
                const filteredTickets = res.data
                    .filter(ticket => ticket.status === 'Completed' && ticket.statusMedical === filterType)
                    .sort((a, b) => a.queueNumber - b.queueNumber);
                setTickets(filteredTickets);
            } catch (err) {
                alert('Lỗi khi lấy hàng chờ: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };
        fetchQueue();
    }, [doctorId, selectedDate, filterType]);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const [servicesRes, doctorsRes] = await Promise.all([
                    axios.get('/api/doctor/dichvu'),
                    axios.get('/api/doctor/bacsixetnghiem?role=Doctor2'),
                ]);
                setServicesList(servicesRes.data);
                setDoctorsList(doctorsRes.data);
            } catch (err) {
                alert('Lỗi khi tải dữ liệu dịch vụ/bác sĩ.');
            }
        };
        fetchMetadata();
    }, []);

    const handleViewResult = async (ticket) => {
        const record = ticket.medicalRecordId;
        if (!record || !record.procedureRequests || record.procedureRequests.length === 0) {
            alert("Không có yêu cầu xét nghiệm.");
            return;
        }

        const procedure = record.procedureRequests[0]; // lấy cái đầu tiên (có thể lặp nếu nhiều cái)
        const testType = procedure.testType || (procedure.services?.[0]?.testType);
        const procedureRequestId = procedure._id;

        if (!procedureRequestId || !testType) {
            alert("Thiếu dữ liệu procedureRequestId hoặc testType.");
            return;
        }

        try {
            const res = await axios.get('/api/doctor/ketquakham', {
                params: {
                    procedureRequestId,
                    testType
                }
            });

            setTestResult(res.data);
            setSelectedProcedure(procedure);
        } catch (err) {
            alert("Lỗi khi lấy kết quả: " + (err.response?.data?.message || err.message));
        }
    };


    const handleStartExam = async (ticket) => {
        setSelectedTicket(ticket);
        setFormData({ symptoms: '', diagnosis: '', conclusion: '', medicines: [] });
        setSelectedServices([]);
        if (ticket.medicalRecordId) {
            try {
                const res = await axios.get(`/api/doctor/medicalrecord/${ticket.medicalRecordId._id}`);
                const record = res.data;
                setFormData(prev => ({
                    ...prev,
                    symptoms: record.symptoms || '',
                    diagnosis: record.diagnosis || '',
                    conclusion: record.conclusion || '',
                }));
                if (record.prescriptions?.length > 0) {
                    const presRes = await axios.get(`/api/doctor/prescription/${record.prescriptions[0]}`);
                    setFormData(prev => ({ ...prev, medicines: presRes.data.medicines || [] }));
                }
            } catch (err) {
                alert('Lỗi khi tải hồ sơ bệnh án: ' + (err.response?.data?.message || err.message));
            }
        }
    };

    const handleCloseModal = () => setSelectedTicket(null);

    const handleCheckboxChange = (serviceId) => {
        const exists = selectedServices.find(s => s.serviceId === serviceId);
        if (exists) {
            setSelectedServices(prev => prev.filter(s => s.serviceId !== serviceId));
        } else {
            setSelectedServices(prev => [...prev, { serviceId, doctorId: '' }]);
        }
    };

    const handleDoctorSelect = (serviceId, doctorId) => {
        setSelectedServices(prev =>
            prev.map(s => s.serviceId === serviceId ? { ...s, doctorId } : s)
        );
    };

    const updateMedicine = (index, field, value) => {
        const newMeds = [...(formData.medicines || [])];
        newMeds[index][field] = value;
        setFormData({ ...formData, medicines: newMeds });
    };

    const handleCompleteExam = async () => {
        try {
            const { symptoms, diagnosis, conclusion, medicines } = formData;
            const profileId = selectedTicket.patientId._id;
            let medicalRecordId = selectedTicket.medicalRecordId;

            if (!medicalRecordId) {
                const res = await axios.post('/api/doctor/taohosobenhnhan', {
                    profileId,
                    doctorId,
                    createdBy: doctorId,
                    symptoms,
                    diagnosis,
                    conclusion,
                    status: 'completed'
                });
                medicalRecordId = res.data._id;

                await axios.patch(`/api/doctor/updateticket/${selectedTicket._id}`, {
                    medicalRecordId,
                    statusMedical: 'Done'
                });
            } else {
                await axios.patch(`/api/doctor/updatemedicalrecord/${medicalRecordId._id || medicalRecordId}`, {
                    symptoms,
                    diagnosis,
                    conclusion,
                    status: 'Completed'
                });

                await axios.patch(`/api/doctor/updateticket/${selectedTicket._id}`, {
                    medicalRecordId: medicalRecordId._id || medicalRecordId,
                    statusMedical: 'Done'
                });
            }

            if (medicines && medicines.length > 0) {
                await axios.post('/api/doctor/taodonthuoc', {
                    medicalRecordId: medicalRecordId._id || medicalRecordId,
                    medicines,
                    createdBy: doctorId
                });
            }

            const refreshedRecordRes = await axios.get(`/api/doctor/medicalrecord/${medicalRecordId._id || medicalRecordId}`);
            const refreshedMedicalRecord = refreshedRecordRes.data;

            const serviceIds = refreshedMedicalRecord.procedureRequests
                ?.flatMap(pr => pr.services?.map(s => s.serviceId?._id))
                .filter(Boolean);

            if (serviceIds.length > 0) {
                try {
                    const res = await axios.post("http://localhost:9999/api/staff/invoices", {
                        userId: selectedTicket.patientId.userId || null,
                        profileId: selectedTicket.patientId._id,
                        ArrayServiceId: serviceIds
                    }, {
                        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                    });
                    console.log("Tạo hóa đơn thành công:", res.data);
                } catch (error) {
                    console.error("Tạo hóa đơn thất bại:", error.response?.data || error.message);
                }
            } else {
                console.warn("Không có dịch vụ nào để tạo hóa đơn.");
            }

            alert('Đã hoàn thành khám!');
            handleCloseModal();

        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    const handleAssignServices = async () => {
        try {
            const { symptoms, diagnosis, conclusion } = formData;
            const profileId = selectedTicket.patientId._id;

            let medicalRecordId = selectedTicket.medicalRecordId;

            if (!medicalRecordId) {
                const res = await axios.post('/api/doctor/taohosobenhnhan', {
                    profileId,
                    doctorId,
                    createdBy: doctorId,
                    symptoms,
                    diagnosis,
                    conclusion,
                    status: 'in-progress'
                });
                medicalRecordId = res.data._id;

                await axios.patch(`/api/doctor/updateticket/${selectedTicket._id}`, {
                    medicalRecordId,
                    statusMedical: 'Labtest'
                });
            } else {
                // Nếu nó là object, chuyển sang chuỗi id
                if (medicalRecordId && typeof medicalRecordId === 'object') {
                    medicalRecordId = medicalRecordId._id?.toString?.() || medicalRecordId.toString();
                }
                await axios.patch(`/api/doctor/updatemedicalrecord/${medicalRecordId}`, {
                    symptoms, diagnosis, conclusion, status: 'Labtest'
                });
            }

            // if (selectedServices.length > 0) {
            //     await axios.post('/api/doctor/chidinhdichvu', {
            //         medicalRecordId,
            //         profileId,
            //         doctorId,
            //         services: selectedServices.map(s => ({
            //             serviceId: s.serviceId,
            //             scheduledTime: null,
            //             status: 'Waiting',
            //             doctorId: s.doctorId || ''
            //         }))
            //     });
            // }

            if (selectedServices.length > 0) {
                await axios.post('/api/doctor/chidinhdichvu', {
                    medicalRecordId,
                    profileId,
                    doctorId,
                    services: selectedServices.map(s => {
                        const matchedService = servicesList.find(item => item._id === s.serviceId);
                        const serviceName = matchedService?.name?.toLowerCase() || '';
                        let testType = 'other';
                        if (serviceName.includes('máu')) {
                            testType = 'blood';
                        } else if (serviceName.includes('nước tiểu')) {
                            testType = 'urine';
                        } else if (serviceName.includes('x-quang') || serviceName.includes('x quang')) {
                            testType = 'xray';
                        }
                        else if (serviceName.includes('Siêu âm')) {
                            testType = 'ultrasound';
                        }
                        else if (serviceName.includes('Điện tim')) {
                            testType = 'ecg';
                        }
                        return {
                            serviceId: s.serviceId,
                            scheduledTime: null,
                            status: 'Waiting',
                            doctorId: s.doctorId || '',
                            testType // thêm testType cho mỗi dịch vụ
                        };
                    })
                });
            }

            alert('Đã chỉ định dịch vụ!');
            handleCloseModal();

        } catch (err) {
            alert('Lỗi: ' + (err.response?.data?.message || err.message));
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
            <div className="flex items-center gap-4 mb-6">
                <label className="font-semibold">Lọc theo:</label>
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border px-3 py-1 rounded"
                >
                    <option value="Exam">Chờ khám</option>
                    <option value="Labtest">Chờ xét nghiệm</option>
                </select>
                <label className="font-semibold ml-6">Chọn ngày:</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border px-3 py-1 rounded"
                />
            </div>

            {loading ? (
                <p className="text-gray-600 italic">Đang tải dữ liệu...</p>
            ) : tickets.length === 0 ? (
                <p className="text-gray-600 italic">Không có bệnh nhân nào chờ hôm nay.</p>
            ) : (
                <div className="overflow-auto rounded-lg border">
                    <table className="min-w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
                            <tr>
                                <th className="px-4 py-2 border">STT</th>
                                <th className="px-4 py-2 border">Tên bệnh nhân</th>
                                <th className="px-4 py-2 border">CCCD</th>
                                <th className="px-4 py-2 border text-center">Hành động</th>
                                <th className="px-4 py-2 border text-center">Lịch sử khám</th>

                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{ticket.queueNumber}</td>
                                    <td className="px-4 py-2 border">{ticket.patientId?.name}</td>
                                    <td className="px-4 py-2 border">{ticket.patientId?.identityNumber}</td>
                                    <td className="px-4 py-2 border text-center space-x-2">
                                        {filterType === 'Labtest' && (
                                            <button
                                                onClick={() => handleViewResult(ticket)}
                                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                            >
                                                Xem kết quả
                                            </button>

                                        )}

                                        {selectedDate === new Date().toISOString().split('T')[0] && (
                                            <button
                                                onClick={() => handleStartExam(ticket)}
                                                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                                            >
                                                Khám bệnh
                                            </button>
                                        )}

                                        {selectedDate !== new Date().toISOString().split('T')[0] && (
                                            <button
                                                className="px-3 py-1 bg-gray-300 text-gray-500 rounded text-sm cursor-not-allowed"
                                                disabled
                                            >
                                                Khám bệnh
                                            </button>


                                        )}

                                    </td>
                                    <td className="p-2 border text-center">
                                        <button
                                            onClick={() => handleViewHistory(ticket.patientId._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Xem lịch sử
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal khám bệnh */}
            {selectedTicket && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6">
                        <h2 className="text-xl font-bold mb-4">Khám bệnh: {selectedTicket.patientId.name}</h2>

                        {/* Triệu chứng, chẩn đoán, kết luận */}
                        <div className="grid gap-4 mb-4">
                            <textarea placeholder="Triệu chứng" className="w-full border rounded px-3 py-2" value={formData.symptoms} onChange={e => setFormData({ ...formData, symptoms: e.target.value })} />
                            <textarea placeholder="Chuẩn đoán" className="w-full border rounded px-3 py-2" value={formData.diagnosis} onChange={e => setFormData({ ...formData, diagnosis: e.target.value })} />
                            <textarea placeholder="Kết luận" className="w-full border rounded px-3 py-2" value={formData.conclusion} onChange={e => setFormData({ ...formData, conclusion: e.target.value })} />
                        </div>

                        {/* Dịch vụ */}
                        <div className="mb-4">
                            <label className="font-semibold block mb-2">Chỉ định dịch vụ:</label>
                            {servicesList.map(service => {
                                const checked = selectedServices.some(s => s.serviceId === service._id);
                                const current = selectedServices.find(s => s.serviceId === service._id);

                                return (
                                    <div key={service._id} className="flex items-center gap-2 mb-2">
                                        <input type="checkbox" checked={checked} onChange={() => handleCheckboxChange(service._id)} />
                                        <span>{service.name}</span>
                                        {/* {checked && (
                                            <select
                                                className="border px-2 py-1 rounded"
                                                value={current?.doctorId || ''}
                                                onChange={(e) => handleDoctorSelect(service._id, e.target.value)}
                                            >
                                                <option value="">-- Chọn bác sĩ --</option>
                                                {doctorsList.map(doc => (
                                                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                                                ))}
                                            </select>
                                        )} */}
                                        {checked && (() => {
                                            const serviceDoctors = service.doctors || [];
                                            const filteredDoctors = doctorsList.filter(doc => serviceDoctors.includes(doc._id));
                                            return (
                                                <select
                                                    className="border px-2 py-1 rounded"
                                                    value={current?.doctorId || ''}
                                                    onChange={(e) => handleDoctorSelect(service._id, e.target.value)}
                                                >
                                                    <option value="">-- Chọn bác sĩ --</option>
                                                    {filteredDoctors.map(doc => (
                                                        <option key={doc._id} value={doc._id}>{doc.name}</option>
                                                    ))}
                                                </select>
                                            );
                                        })()}

                                    </div>
                                );
                            })}
                        </div>

                        {/* Đơn thuốc */}
                        <div>
                            <label className="font-semibold block mb-2">Đơn thuốc:</label>
                            {formData.medicines.map((med, index) => (
                                <div key={index} className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                                    <input placeholder="Tên thuốc" value={med.name} onChange={e => updateMedicine(index, 'name', e.target.value)} className="border px-2 py-1 rounded" />
                                    <input placeholder="Liều dùng" value={med.dosage} onChange={e => updateMedicine(index, 'dosage', e.target.value)} className="border px-2 py-1 rounded" />
                                    <input placeholder="Tần suất" value={med.frequency} onChange={e => updateMedicine(index, 'frequency', e.target.value)} className="border px-2 py-1 rounded" />
                                    <input placeholder="Số ngày dùng" value={med.duration} onChange={e => updateMedicine(index, 'duration', e.target.value)} className="border px-2 py-1 rounded" />
                                    <input placeholder="Ghi chú" value={med.note} onChange={e => updateMedicine(index, 'note', e.target.value)} className="border px-2 py-1 rounded col-span-full" />
                                </div>
                            ))}
                            <button
                                type="button"
                                className="text-blue-600 hover:underline text-sm"
                                onClick={() =>
                                    setFormData(prev => ({
                                        ...prev,
                                        medicines: [...(prev.medicines || []), { name: '', dosage: '', frequency: '', duration: '', note: '' }]
                                    }))
                                }
                            >
                                + Thêm thuốc
                            </button>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={handleCloseModal} className="px-4 py-2 border rounded hover:bg-gray-100">Đóng</button>
                            <button onClick={handleAssignServices} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                                Chỉ định dịch vụ
                            </button>
                            <button onClick={handleCompleteExam} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Hoàn thành khám
                            </button>

                        </div>
                    </div>
                </div>
            )}
            {selectedProcedure && testResult && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-6">
                        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Kết quả xét nghiệm ({testResult.testType})</h2>

                        {testResult.resultDetails?.length > 0 ? (
                            <table className="w-full border text-sm">
                                <thead className="bg-blue-100 text-gray-800">
                                    <tr>
                                        <th className="p-2 border">Chỉ số</th>
                                        <th className="p-2 border">Giá trị</th>
                                        <th className="p-2 border">Đơn vị</th>
                                        <th className="p-2 border">Khoảng tham chiếu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testResult.resultDetails.map((item, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="p-2 border">{item.name}</td>
                                            <td className="p-2 border">{item.value}</td>
                                            <td className="p-2 border">{item.unit || '-'}</td>
                                            <td className="p-2 border">{item.referenceRange || '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-600">Không có chi tiết kết quả.</p>
                        )}

                        {testResult.resultNote && (
                            <div className="mt-4">
                                <h4 className="font-semibold text-gray-700 mb-1">Ghi chú:</h4>
                                <p className="p-2 bg-gray-100 rounded text-gray-800 text-sm">
                                    {testResult.resultNote}
                                </p>
                            </div>
                        )}

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => {
                                    setSelectedProcedure(null);
                                    setTestResult(null);
                                }}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
                        <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                            Lịch sử khám của: {selectedProfile?.name}
                        </h2>

                        <ul className="space-y-3 max-h-96 overflow-y-auto">
                            {medicalRecords.map((record) => (
                                <li key={record._id} className="border p-3 rounded text-sm">
                                    <p><strong>Ngày khám:</strong> {new Date(record.createdAt).toLocaleString()}</p>
                                    <p><strong>Triệu chứng:</strong> {record.symptoms}</p>
                                    <p><strong>Chẩn đoán:</strong> {record.diagnosis}</p>
                                    <p><strong>Kết luận:</strong> {record.conclusion}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-6 text-right">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
};

export default TodayQueue;
