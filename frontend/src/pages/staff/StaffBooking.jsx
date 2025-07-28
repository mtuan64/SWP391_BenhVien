import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookingFormStaff() {
    const [profiles, setProfiles] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);
    const [cccd, setCccd] = useState('');

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
        try {
            const res = await axios.get(`/api/doctor/danhsachprofile/tatca?cccd=${cccd}`);
            setProfiles(res.data);
            if (res.data.length === 0) {
                alert("khong tim thay profile");
            } else {
                alert("Tim thay profile");
            }
        } catch (err) {
            alert('Không tìm thấy hồ sơ.');
        }
    };

    const handleSubmit = async () => {
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
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Đặt lịch khám bệnh</h2>

            {/* Nhập CCCD */}
            <label>CCCD:</label>
            <input
                type="text"
                value={cccd}
                onChange={e => setCccd(e.target.value)}
                className="w-full border p-2 mb-2"
                placeholder="Nhập CCCD"
            />
            <div className="flex gap-2 mb-4">
                <button
                    onClick={handleFetchProfiles}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Tìm hồ sơ
                </button>
                <button
                    onClick={() => window.location.href = '/staff/tao-ho-so'}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Tạo hồ sơ mới
                </button>
            </div>

            {/* Hồ sơ */}
            <label>Hồ sơ:</label>
            <select
                value={form.profileId}
                onChange={e => setForm({ ...form, profileId: e.target.value })}
                className="w-full border p-2 mb-4"
            >
                <option value="">Chọn hồ sơ</option>
                {profiles.map(p => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                ))}
            </select>

            {/* Khoa */}
            <label>Khoa:</label>
            <select
                value={form.department}
                onChange={e => setForm({ ...form, department: e.target.value })}
                className="w-full border p-2 mb-4"
            >
                <option value="">Chọn khoa</option>
                {departments.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            {/* Bác sĩ */}
            <label>Bác sĩ:</label>
            <select
                value={form.doctorId}
                onChange={e => setForm({ ...form, doctorId: e.target.value })}
                className="w-full border p-2 mb-4"
            >
                <option value="">Chọn bác sĩ</option>
                {doctors.map(d => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                ))}
            </select>

            {/* Ngày */}
            <label>Ngày khám:</label>
            <input
                type="date"
                value={form.date}
                onChange={e => setForm({ ...form, date: e.target.value })}
                className="w-full border p-2 mb-4"
            />

            {/* Khung giờ */}
            <label>Khung giờ:</label>
            <select
                value={form.timeSlot}
                onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                className="w-full border p-2 mb-4"
            >
                <option value="">Chọn khung giờ</option>
                {slots.map((s, i) => (
                    <option key={i} value={s.startTime}>
                        {new Date(s.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{" "}
                        {new Date(s.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </option>
                ))}
            </select>

            <button
                className="mt-4 p-2 w-full bg-blue-600 text-white rounded"
                onClick={handleSubmit}
            >
                Đặt lịch
            </button>
        </div>
    );
}