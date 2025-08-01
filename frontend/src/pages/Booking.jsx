// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// export default function BookingForm() {
//     const [profiles, setProfiles] = useState([]);
//     const [departments, setDepartments] = useState([]);
//     const [doctors, setDoctors] = useState([]);
//     const [slots, setSlots] = useState([]);

//     const [form, setForm] = useState({
//         profileId: '',
//         department: '',
//         doctorId: '',
//         date: '',
//         timeSlot: '',
//     });

//     // Lấy danh sách hồ sơ và khoa
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         axios.get(`/api/doctor/danhsachprofile?userId=${user._id}`).then(res => setProfiles(res.data));
//         axios.get('/api/departments').then(res => setDepartments(res.data.departments));
//     }, []);

//     // Lấy danh sách bác sĩ khi chọn khoa
//     useEffect(() => {
//         if (form.department) {
//             axios.get(`/api/staff/employees?department=${form.department}`).then(res => setDoctors(res.data));
//         }
//     }, [form.department]);

//     // Lấy lịch làm việc khi chọn bác sĩ và ngày
//     useEffect(() => {
//         if (form.doctorId && form.date) {
//             axios
//                 .get(`/api/doctor/lich?employeeId=${form.doctorId}&date=${form.date}`)
//                 .then(res => {
//                     const available = res.data?.timeSlots?.filter(t => t.status === 'Available') || [];
//                     setSlots(available);
//                 });
//         }
//     }, [form.doctorId, form.date]);

//     const handleSubmit = async () => {
//         try {
//             const selectedSlot = slots.find(s => s.startTime === form.timeSlot);
//             if (!selectedSlot) {
//                 alert('Khung giờ không hợp lệ.');
//                 return;
//             }

//             await axios.post('/api/doctor/datlich', {
//                 profileId: form.profileId,
//                 department: form.department,
//                 doctorId: form.doctorId,
//                 date: form.date,
//                 timeSlot: selectedSlot // Gửi toàn bộ object
//             });

//             alert('Đặt lịch thành công!');
//         } catch (err) {
//             alert(err.response?.data?.message || 'Lỗi khi đặt lịch');
//         }
//     };

//     return (
//         <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
//             <h2 className="text-xl font-bold mb-4">Đặt lịch khám bệnh</h2>

//             <label>Hồ sơ:</label>
//             <select value={form.profileId} onChange={e => setForm({ ...form, profileId: e.target.value })}>
//                 <option value="">Chọn hồ sơ</option>
//                 {profiles.map(p => (
//                     <option key={p._id} value={p._id}>{p.name}</option>
//                 ))}
//             </select>

//             <label>Khoa:</label>
//             <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
//                 <option value="">Chọn khoa</option>
//                 {departments.map(d => (
//                     <option key={d._id} value={d._id}>{d.name}</option>
//                 ))}
//             </select>

//             <label>Bác sĩ:</label>
//             <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
//                 <option value="">Chọn bác sĩ</option>
//                 {doctors.map(d => (
//                     <option key={d._id} value={d._id}>{d.name}</option>
//                 ))}
//             </select>

//             <label>Ngày khám:</label>
//             <input
//                 type="date"
//                 value={form.date}
//                 onChange={e => setForm({ ...form, date: e.target.value })}
//             />

//             <label>Khung giờ:</label>
//             <select onChange={e => setForm({ ...form, timeSlot: e.target.value })}>
//                 <option value="">Chọn khung giờ</option>
//                 {slots.map((s, i) => (
//                     <option key={i} value={s.startTime}>
//                         {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
//                         {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                     </option>
//                 ))}
//             </select>

//             <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
//                 Đặt lịch
//             </button>
//         </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import { Calendar, User, Stethoscope, Clock, Building2, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function BookingForm() {
    const [profiles, setProfiles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);

    const [form, setForm] = useState({
        profileId: '',
        department: '',
        doctorId: '',
        date: '',
        timeSlot: '',
    });

    // Lấy danh sách hồ sơ và khoa
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`/api/doctor/danhsachprofile?userId=${user._id}`).then(res => setProfiles(res.data));
        axios.get('/api/departments').then(res => setDepartments(res.data.departments));
    }, []);

    // Lấy danh sách bác sĩ khi chọn khoa
    useEffect(() => {
        if (form.department) {
            axios.get(`/api/staff/employees?department=${form.department}`).then(res => setDoctors(res.data));
        }
    }, [form.department]);

    // Lấy lịch làm việc khi chọn bác sĩ và ngày
    useEffect(() => {
        if (form.doctorId && form.date) {
            axios
                .get(`/api/doctor/lich?employeeId=${form.doctorId}&date=${form.date}`)
                .then(res => {
                    const available = res.data?.timeSlots?.filter(t => t.status === 'Available') || [];
                    setSlots(available);
                });
        }
    }, [form.doctorId, form.date]);

    const handleSubmit = async () => {
        try {
            const selectedSlot = slots.find(s => s.startTime === form.timeSlot);
            if (!selectedSlot) {
                alert('Khung giờ không hợp lệ.');
                return;
            }

            await axios.post('/api/doctor/datlich', {
                profileId: form.profileId,
                department: form.department,
                doctorId: form.doctorId,
                date: form.date,
                timeSlot: selectedSlot // Gửi toàn bộ object
            });

            alert('Đặt lịch thành công!');
        } catch (err) {
            alert(err.response?.data?.message || 'Lỗi khi đặt lịch');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mb-4 shadow-lg">
                        <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Đặt lịch khám bệnh</h1>
                    <p className="text-gray-600">Vui lòng điền đầy đủ thông tin để đặt lịch hẹn</p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8 space-y-8">

                        {/* Profile Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <User className="w-4 h-4 mr-2 text-blue-600" />
                                Hồ sơ bệnh nhân
                            </label>
                            <div className="relative">
                                <select
                                    value={form.profileId}
                                    onChange={e => setForm({ ...form, profileId: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                >
                                    <option value="">Chọn hồ sơ bệnh nhân</option>
                                    {profiles.map(p => (
                                        <option key={p._id} value={p._id}>{p.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Department Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Building2 className="w-4 h-4 mr-2 text-teal-600" />
                                Khoa khám
                            </label>
                            <div className="relative">
                                <select
                                    value={form.department}
                                    onChange={e => setForm({ ...form, department: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                >
                                    <option value="">Chọn khoa khám</option>
                                    {departments.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Doctor Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Stethoscope className="w-4 h-4 mr-2 text-green-600" />
                                Bác sĩ
                            </label>
                            <div className="relative">
                                <select
                                    value={form.doctorId}
                                    onChange={e => setForm({ ...form, doctorId: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                    disabled={!form.department}
                                >
                                    <option value="">Chọn bác sĩ</option>
                                    {doctors.map(d => (
                                        <option key={d._id} value={d._id}>{d.name}</option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                                Ngày khám
                            </label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={e => setForm({ ...form, date: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 hover:bg-gray-100"
                            />
                        </div>

                        {/* Time Slot Selection */}
                        <div className="space-y-3">
                            <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                                <Clock className="w-4 h-4 mr-2 text-orange-600" />
                                Khung giờ
                            </label>
                            <div className="relative">
                                <select
                                    onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                    disabled={!form.doctorId || !form.date}
                                >
                                    <option value="">Chọn khung giờ</option>
                                    {slots.map((s, i) => (
                                        <option key={i} value={s.startTime}>
                                            {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                                            {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {slots.length === 0 && form.doctorId && form.date && (
                                <p className="text-sm text-gray-500 italic">Không có khung giờ trống cho ngày này</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                                onClick={handleSubmit}
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span>Đặt lịch khám</span>
                            </button>
                        </div>

                        {/* Info Note */}
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900 mb-1">Lưu ý quan trọng</h4>
                                    <p className="text-sm text-blue-800">
                                        Vui lòng đến trước giờ hẹn 15 phút và mang theo các giấy tờ cần thiết.
                                        Liên hệ hotline nếu cần thay đổi lịch hẹn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}