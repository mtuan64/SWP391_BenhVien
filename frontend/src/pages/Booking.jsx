import React, { useState, useEffect } from 'react';
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
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Đặt lịch khám bệnh</h2>

            <label>Hồ sơ:</label>
            <select value={form.profileId} onChange={e => setForm({ ...form, profileId: e.target.value })}>
                <option value="">Chọn hồ sơ</option>
                {profiles.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

            <label>Khoa:</label>
            <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })}>
                <option value="">Chọn khoa</option>
                {departments.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            <label>Bác sĩ:</label>
            <select value={form.doctorId} onChange={e => setForm({ ...form, doctorId: e.target.value })}>
                <option value="">Chọn bác sĩ</option>
                {doctors.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            <label>Ngày khám:</label>
            <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
            />

            <label>Khung giờ:</label>
            <select onChange={e => setForm({ ...form, timeSlot: e.target.value })}>
                <option value="">Chọn khung giờ</option>
                {slots.map((s, i) => (
                    <option key={i} value={s.startTime}>
                        {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                        {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </option>
                ))}
            </select>

            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleSubmit}>
                Đặt lịch
            </button>
        </div>
    );
}
