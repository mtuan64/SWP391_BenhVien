// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function BookingFormStaff() {
//     const [profiles, setProfiles] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [slots, setSlots] = useState([]);
//     const [cccd, setCccd] = useState('');

//     const [form, setForm] = useState({
//         profileId: '',
//         department: '',
//         doctorId: '',
//         date: '',
//         timeSlot: '',
//     });

//     // Fetch departments on mount
//     useEffect(() => {
//         axios.get('/api/departments').then(res => setDepartments(res.data.departments));
//     }, []);

//     // Fetch doctors when department changes
//     useEffect(() => {
//         if (form.department) {
//             axios.get(`/api/staff/employees?department=${form.department}`)
//                 .then(res => setDoctors(res.data));
//         }
//     }, [form.department]);

//     // Fetch time slots when doctor and date selected
//     useEffect(() => {
//         if (form.doctorId && form.date) {
//             axios.get(`/api/doctor/lich?employeeId=${form.doctorId}&date=${form.date}`)
//                 .then(res => {
//                     const available = res.data?.timeSlots?.filter(t => t.status === 'Available') || [];
//                     setSlots(available);
//                 });
//         }
//     }, [form.doctorId, form.date]);

//     const handleFetchProfiles = async () => {
//         try {
//             const res = await axios.get(`/api/doctor/danhsachprofile/tatca?cccd=${cccd}`);
//             setProfiles(res.data);
//             if (res.data.length === 0) {
//                 alert("khong tim thay profile");
//             } else {
//                 alert("Tim thay profile");
//             }
//         } catch (err) {
//             alert('Không tìm thấy hồ sơ.');
//         }
//     };

//     const handleSubmit = async () => {
//         try {
//             const selectedSlot = slots.find(s => s.startTime === form.timeSlot);
//             if (!selectedSlot) {
//                 alert('Khung giờ không hợp lệ.');
//                 return;
//             }

//             await axios.post('/api/doctor/staffdatlich', {
//                 profileId: form.profileId,
//                 department: form.department,
//                 doctorId: form.doctorId,
//                 date: form.date,
//                 timeSlot: selectedSlot
//             });

//             alert('Đặt lịch thành công!');
//         } catch (err) {
//             alert(err.response?.data?.message || 'Lỗi khi đặt lịch');
//         }
//     };

//     return (
//         <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Đặt lịch khám bệnh</h2>

//             {/* Nhập CCCD */}
//             <label>CCCD:</label>
//             <input
//                 type="text"
//                 value={cccd}
//                 onChange={e => setCccd(e.target.value)}
//                 className="w-full border p-2 mb-2"
//                 placeholder="Nhập CCCD"
//             />
//             <div className="flex gap-2 mb-4">
//                 <button
//                     onClick={handleFetchProfiles}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Tìm hồ sơ
//                 </button>
//                 <button
//                     onClick={() => window.location.href = '/staff/tao-ho-so'}
//                     className="bg-green-500 text-white px-4 py-2 rounded"
//                 >
//                     Tạo hồ sơ mới
//                 </button>
//             </div>

//             {/* Hồ sơ */}
//             <label>Hồ sơ:</label>
//             <select
//                 value={form.profileId}
//                 onChange={e => setForm({ ...form, profileId: e.target.value })}
//                 className="w-full border p-2 mb-4"
//             >
//                 <option value="">Chọn hồ sơ</option>
//                 {profiles.map(p => (
//                     <option key={p._id} value={p._id}>{p.name}</option>
//                 ))}
//             </select>

//             {/* Khoa */}
//             <label>Khoa:</label>
//             <select
//                 value={form.department}
//                 onChange={e => setForm({ ...form, department: e.target.value })}
//                 className="w-full border p-2 mb-4"
//             >
//                 <option value="">Chọn khoa</option>
//                 {departments.map(d => (
//                     <option key={d._id} value={d._id}>{d.name}</option>
//                 ))}
//             </select>

//             {/* Bác sĩ */}
//             <label>Bác sĩ:</label>
//             <select
//                 value={form.doctorId}
//                 onChange={e => setForm({ ...form, doctorId: e.target.value })}
//                 className="w-full border p-2 mb-4"
//             >
//                 <option value="">Chọn bác sĩ</option>
//                 {doctors.map(d => (
//                     <option key={d._id} value={d._id}>{d.name}</option>
//                 ))}
//             </select>

//             {/* Ngày */}
//             <label>Ngày khám:</label>
//             <input
//                 type="date"
//                 value={form.date}
//                 onChange={e => setForm({ ...form, date: e.target.value })}
//                 className="w-full border p-2 mb-4"
//             />

//             {/* Khung giờ */}
//             <label>Khung giờ:</label>
//             <select
//                 value={form.timeSlot}
//                 onChange={e => setForm({ ...form, timeSlot: e.target.value })}
//                 className="w-full border p-2 mb-4"
//             >
//                 <option value="">Chọn khung giờ</option>
//                 {slots.map((s, i) => (
//                     <option key={i} value={s.startTime}>
//                         {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
//                         {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </option>
//                 ))}
//             </select>

//             <button
//                 className="mt-4 p-2 w-full bg-blue-600 text-white rounded"
//                 onClick={handleSubmit}
//             >
//                 Đặt lịch
//             </button>
//         </div>
//     );
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, UserPlus, Calendar, Clock, User, Building, Stethoscope, FileText } from 'lucide-react';

export default function BookingFormStaff() {
    const [profiles, setProfiles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);
    const [cccd, setCccd] = useState('');
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        profileId: '',
        department: '',
        doctorId: '',
        date: '',
        timeSlot: '',
    });

    // Fetch departments on mount
    useEffect(() => {
        axios.get('/api/departments').then(res => setDepartments(res.data.departments));
    }, []);

    // Fetch doctors when department changes
    useEffect(() => {
        if (form.department) {
            axios.get(`/api/staff/employees?department=${form.department}`)
                .then(res => setDoctors(res.data));
        }
    }, [form.department]);

    // Fetch time slots when doctor and date selected
    useEffect(() => {
        if (form.doctorId && form.date) {
            axios.get(`/api/doctor/lich?employeeId=${form.doctorId}&date=${form.date}`)
                .then(res => {
                    const available = res.data?.timeSlots?.filter(t => t.status === 'Available') || [];
                    setSlots(available);
                });
        }
    }, [form.doctorId, form.date]);

    const handleFetchProfiles = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/doctor/danhsachprofile/tatca?cccd=${cccd}`);
            setProfiles(res.data);
            if (res.data.length === 0) {
                alert("Không tìm thấy profile");
            } else {
                alert("Tìm thấy profile");
            }
        } catch (err) {
            alert('Không tìm thấy hồ sơ.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const selectedSlot = slots.find(s => s.startTime === form.timeSlot);
            if (!selectedSlot) {
                alert('Khung giờ không hợp lệ.');
                return;
            }

            await axios.post('/api/doctor/staffdatlich', {
                profileId: form.profileId,
                department: form.department,
                doctorId: form.doctorId,
                date: form.date,
                timeSlot: selectedSlot
            });

            alert('Đặt lịch thành công!');
        } catch (err) {
            alert(err.response?.data?.message || 'Lỗi khi đặt lịch');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = form.profileId && form.department && form.doctorId && form.date && form.timeSlot;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                        <Calendar className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch khám bệnh</h1>
                    <p className="text-gray-600">Hệ thống đặt lịch dành cho nhân viên y tế</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                        <h2 className="text-xl font-semibold text-white flex items-center">
                            <FileText className="w-5 h-5 mr-2" />
                            Thông tin đặt lịch
                        </h2>
                    </div>

                    <div className="p-8 space-y-6">
                        {/* CCCD Search Section */}
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                Số CCCD
                            </label>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={cccd}
                                        onChange={e => setCccd(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                        placeholder="Nhập số CCCD để tìm hồ sơ"
                                    />
                                </div>
                                <button
                                    onClick={handleFetchProfiles}
                                    disabled={!cccd || loading}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Search className="w-4 h-4" />
                                    )}
                                    Tìm kiếm
                                </button>
                                <button
                                    onClick={() => window.location.href = '/staff/tao-ho-so'}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Tạo mới
                                </button>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid gap-6">
                            {/* Profile Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <FileText className="w-4 h-4 mr-2 text-blue-600" />
                                    Chọn hồ sơ bệnh nhân
                                </label>
                                <select
                                    value={form.profileId}
                                    onChange={e => setForm({ ...form, profileId: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                >
                                    <option value="">-- Chọn hồ sơ bệnh nhân --</option>
                                    {profiles.map(p => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Department Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <Building className="w-4 h-4 mr-2 text-blue-600" />
                                    Khoa khám
                                </label>
                                <select
                                    value={form.department}
                                    onChange={e => setForm({ ...form, department: e.target.value, doctorId: '', timeSlot: '' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                >
                                    <option value="">-- Chọn khoa khám --</option>
                                    {departments.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Doctor Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <Stethoscope className="w-4 h-4 mr-2 text-blue-600" />
                                    Bác sĩ khám
                                </label>
                                <select
                                    value={form.doctorId}
                                    onChange={e => setForm({ ...form, doctorId: e.target.value, timeSlot: '' })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                    disabled={!form.department}
                                >
                                    <option value="">-- Chọn bác sĩ --</option>
                                    {doctors.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                    Ngày khám
                                </label>
                                <input
                                    type="date"
                                    value={form.date}
                                    onChange={e => setForm({ ...form, date: e.target.value, timeSlot: '' })}
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                />
                            </div>

                            {/* Time Slot Selection */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                                    Khung giờ khám
                                </label>
                                <select
                                    value={form.timeSlot}
                                    onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                                    disabled={!form.doctorId || !form.date}
                                >
                                    <option value="">-- Chọn khung giờ --</option>
                                    {slots.map((s, i) => (
                                        <option key={i} value={s.startTime}>
                                            {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                                            {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </option>
                                    ))}
                                </select>
                                {slots.length === 0 && form.doctorId && form.date && (
                                    <p className="text-sm text-amber-600 mt-2 flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        Không có khung giờ trống trong ngày này
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                onClick={handleSubmit}
                                disabled={!isFormValid || loading}
                                className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Đang xử lý...
                                    </>
                                ) : (
                                    <>
                                        <Calendar className="w-5 h-5" />
                                        Đặt lịch khám
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Help Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Lưu ý:</strong> Vui lòng điền đầy đủ thông tin để đặt lịch khám.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}