import React, { useState } from 'react';
import axios from 'axios';

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        identityNumber: '',
    });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userx = JSON.parse(localStorage.getItem('user'));
        try {
            const response = axios.post(`/api/doctor/taoprofile?userId=${userx?._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Tạo hồ sơ thành công!');
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setMessage('Tạo hồ sơ thất bại.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Tạo Hồ Sơ</h2>
            {message && <div className="mb-4 text-blue-600">{message}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Họ tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Ngày sinh:</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block">Giới tính:</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block">Số CMND/CCCD:</label>
                    <input
                        type="text"
                        name="identityNumber"
                        value={formData.identityNumber}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Tạo Hồ Sơ
                </button>
            </form>
        </div>
    );
};

export default CreateProfile;
