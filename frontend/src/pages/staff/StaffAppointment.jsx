import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const [appointments, setAppointments] = useState([]);
    const [filters, setFilters] = useState({
        status: '',
        department: '',
        date: ''
    });
    const [departments, setDepartments] = useState([]);
    const [waitingTickets, setWaitingTickets] = useState({}); // Lưu thông tin ticket có thể click "Đã đến"

    const fetchAppointments = async () => {
        try {
            const params = {};
            if (filters.status) params.status = filters.status;
            if (filters.department) params.department = filters.department;
            if (filters.date) params.date = filters.date;

            const res = await axios.get('/api/doctor/appointments', { params });
            const appts = res.data;

            setAppointments(appts);

            const waitingMap = {};

            // Kiểm tra trạng thái ticket tương ứng
            for (let appt of appts) {
                try {
                    const res = await axios.get('/api/doctor/ticket/status', {
                        params: {
                            doctorId: appt.doctorId._id || appt.doctorId,
                            profileId: appt.profileId._id || appt.profileId,
                            date: appt.appointmentDate,
                            ticketNumber: appt.ticketNumber
                        }
                    });

                    if (res.data.status === 'Waiting') {
                        waitingMap[appt._id] = true;
                    }
                } catch (err) {
                    console.error('Không lấy được trạng thái ticket', err);
                }
            }

            setWaitingTickets(waitingMap);
        } catch (err) {
            console.error('Lỗi khi lấy lịch hẹn:', err);
            alert('Không thể tải lịch hẹn');
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get('/api/doctor/department');
            setDepartments(res.data);
        } catch (err) {
            console.error('Không thể lấy danh sách khoa');
        }
    };

    const handleArrived = async (appt) => {
        if (!window.confirm('Xác nhận bệnh nhân đã đến?')) return;

        try {
            await axios.put('/api/doctor/arrived', {
                doctorId: appt.doctorId._id || appt.doctorId,
                profileId: appt.profileId._id || appt.profileId,
                date: appt.appointmentDate,
                ticketNumber: appt.ticketNumber
            });

            fetchAppointments(); // Reload lại dữ liệu
        } catch (err) {
            console.error(err);
            alert('Không thể cập nhật trạng thái!');
        }
    };

    const handleChange = (e) => {
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleEdit = (e) => {
        setEditingAppointment(e);
        setShowModal(true);
    };
    const handleSaveEdit = async () => {
        try {
            await axios.put(`/api/appointment/${editingAppointment._id}`, editingAppointment);
            setShowModal(false);
            fetchAppointments(); // Refresh danh sách
        } catch (err) {
            alert("Lỗi khi cập nhật lịch hẹn");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xoá lịch hẹn này?")) return;
        try {
            await axios.delete(`/api/appointment/${id}`);
            fetchAppointments();
        } catch (err) {
            alert("Lỗi khi xoá lịch hẹn");
        }
    };

    useEffect(() => {
        fetchAppointments();
        fetchDepartments();
    }, [filters]);

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Danh sách lịch hẹn</h2>

            <div className="flex flex-wrap gap-4 mb-6">
                <select name="status" onChange={handleChange} value={filters.status} className="p-2 border rounded">
                    <option value="">-- Trạng thái --</option>
                    <option value="Booked">Đã đặt</option>
                    <option value="Completed">Đã khám</option>
                    <option value="Canceled">Đã huỷ</option>
                </select>

                <select name="department" onChange={handleChange} value={filters.department} className="p-2 border rounded">
                    <option value="">-- Khoa --</option>
                    {departments.map((dep) => (
                        <option key={dep._id} value={dep._id}>{dep.name}</option>
                    ))}
                </select>

                <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleChange}
                    className="p-2 border rounded"
                />
            </div>

            {appointments.length === 0 ? (
                <p>Không có lịch hẹn nào.</p>
            ) : (
                <table className="w-full table-auto border text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 border">Bệnh nhân</th>
                            <th className="p-2 border">Khoa</th>
                            <th className="p-2 border">Bác sĩ</th>
                            <th className="p-2 border">Ngày</th>
                            <th className="p-2 border">Giờ</th>
                            <th className="p-2 border">Trạng thái</th>
                            <th className="p-2 border">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt._id} className="text-center hover:bg-gray-50">
                                <td className="border p-2">{appt.profileId?.name || 'Không rõ'}</td>
                                <td className="border p-2">{appt.department?.name || 'N/A'}</td>
                                <td className="border p-2">{appt.doctorId?.name || 'N/A'}</td>
                                <td className="border p-2">{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                                <td className="border p-2">
                                    {new Date(appt.timeSlot?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
                                    {new Date(appt.timeSlot?.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </td>
                                <td className="border p-2">{appt.status}</td>
                                <td className="border p-2 space-x-1">
                                    {waitingTickets[appt._id] && (
                                        <button
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                            onClick={() => handleArrived(appt)}
                                        >
                                            Đã đến
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleEdit(appt._id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(appt._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
};

export default AppointmentList;
