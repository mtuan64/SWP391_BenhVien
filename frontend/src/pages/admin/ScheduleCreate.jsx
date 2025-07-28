import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ScheduleCreate() {
    const [departments, setDepartments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState('');


    useEffect(() => {
        // Load departments
        axios.get('/api/departments')
            .then(res => setDepartments(res.data.departments))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        setDoctors([]);
        if (selectedDepartment) {
            axios.get(`/api/staff/employees?department=${selectedDepartment}`)
                .then(res => setDoctors(res.data))
                .catch(err => console.error(err));
        }
    }, [selectedDepartment]);


    const handleCreateSchedule = async () => {
        if (!selectedDoctor || !selectedDate) {
            setMessage('Vui lòng chọn đủ thông tin!');
            return;
        }

        try {
            setCreating(true);
            const res = await axios.post('/api/doctor/taolich', {
                employeeId: selectedDoctor,
                department: selectedDepartment,
                date: selectedDate,
            });

            setMessage('Tạo lịch thành công ✅');
        } catch (err) {
            setMessage('Lỗi khi tạo lịch ❌');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 shadow-lg rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Tạo lịch khám cho bác sĩ</h2>

            <label className="block mb-2">Chọn chuyên khoa:</label>
            <select
                className="w-full border p-2 rounded mb-4"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
            >
                <option value="">-- Chọn khoa --</option>
                {departments.map(dep => (
                    <option key={dep._id} value={dep._id}>{dep.name}</option>
                ))}
            </select>

            <label className="block mb-2">Chọn bác sĩ:</label>
            <select
                className="w-full border p-2 rounded mb-4"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                disabled={!selectedDepartment}
            >
                <option value="">-- Chọn bác sĩ --</option>
                {doctors.map(doc => (
                    <option key={doc._id} value={doc._id}>{doc.name}</option>
                ))}
            </select>

            <label className="block mb-2">Chọn ngày:</label>
            <input
                type="date"
                className="w-full border p-2 rounded mb-4"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />

            <button
                onClick={handleCreateSchedule}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                disabled={creating}
            >
                {creating ? 'Đang tạo...' : 'Tạo lịch'}
            </button>

            {message && <p className="mt-4 text-center text-green-700">{message}</p>}
        </div>
    );
}
