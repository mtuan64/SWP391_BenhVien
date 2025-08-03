import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Building2, Stethoscope, Calendar, Plus, CheckCircle, AlertCircle, Clock } from 'lucide-react';

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
            .catch(err => {
                console.error(err);
                setMessage('Lỗi khi tải danh sách khoa ❌');
            });
    }, []);

    useEffect(() => {
        setDoctors([]);
        setSelectedDoctor(''); // Reset bác sĩ khi thay đổi khoa
        if (selectedDepartment) {
            axios.get(`/api/staff/employees?department=${selectedDepartment}`)
                .then(res => setDoctors(res.data))
                .catch(err => {
                    console.error(err);
                    setMessage('Lỗi khi tải danh sách bác sĩ ❌');
                });
        }
    }, [selectedDepartment]);

    const handleCreateSchedule = async () => {
        // Kiểm tra thông tin bắt buộc
        if (!selectedDoctor || !selectedDate) {
            setMessage('Vui lòng chọn đủ thông tin!');
            return;
        }

        // Kiểm tra ngày không được trong quá khứ
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Bỏ giờ để so sánh chính xác
        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);

        if (selected < today) {
            setMessage('Ngày chọn không được trong quá khứ!');
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
            // Reset form sau khi tạo thành công
            setSelectedDepartment('');
            setSelectedDoctor('');
            setSelectedDate('');
        } catch (err) {
            setMessage('Lỗi khi tạo lịch ❌');
            console.error(err);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 py-12 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-full mb-4 shadow-lg">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo lịch khám cho bác sĩ</h1>
                    <p className="text-gray-600">Thiết lập lịch làm việc cho đội ngũ y tế</p>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Message Display */}
                        {message && (
                            <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${message.includes('thành công')
                                ? 'bg-green-50 border border-green-200 text-green-800'
                                : 'bg-red-50 border border-red-200 text-red-800'
                                }`}>
                                {message.includes('thành công') ? (
                                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                )}
                                <span className="font-medium">{message}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            {/* Department Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                                    Chọn chuyên khoa
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                    >
                                        <option value="">-- Chọn khoa --</option>
                                        {departments.map(dep => (
                                            <option key={dep._id} value={dep._id}>{dep.name}</option>
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
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Stethoscope className="w-4 h-4 mr-2 text-emerald-600" />
                                    Chọn bác sĩ
                                </label>
                                <div className="relative">
                                    <select
                                        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none transition-all duration-200 appearance-none cursor-pointer ${!selectedDepartment
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-gray-50 hover:bg-gray-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                                            }`}
                                        value={selectedDoctor}
                                        onChange={(e) => setSelectedDoctor(e.target.value)}
                                        disabled={!selectedDepartment}
                                    >
                                        <option value="">-- Chọn bác sĩ --</option>
                                        {doctors.map(doc => (
                                            <option key={doc._id} value={doc._id}>{doc.name}</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                                {!selectedDepartment && (
                                    <p className="text-xs text-gray-500 flex items-center">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Vui lòng chọn chuyên khoa trước
                                    </p>
                                )}
                            </div>

                            {/* Date Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Clock className="w-4 h-4 mr-2 text-purple-600" />
                                    Chọn ngày
                                </label>
                                <input
                                    type="date"
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 hover:bg-gray-100 ${selectedDate && new Date(selectedDate) < new Date().setHours(0, 0, 0, 0) ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                                        }`}
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    min={new Date().toISOString().split('T')[0]} // Ngăn chọn ngày quá khứ
                                />
                                {selectedDate && new Date(selectedDate) < new Date().setHours(0, 0, 0, 0) && (
                                    <p className="text-xs text-red-500 flex items-center">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Ngày chọn không được trong quá khứ
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    onClick={handleCreateSchedule}
                                    className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 ${creating
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 hover:shadow-xl transform hover:-translate-y-0.5'
                                        } text-white`}
                                    disabled={creating}
                                >
                                    {creating ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>Đang tạo...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5" />
                                            <span>Tạo lịch</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Info Note */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium text-blue-900 mb-1">Lưu ý quan trọng</h4>
                                    <p className="text-sm text-blue-800">
                                        Lịch khám sẽ được tạo tự động với các khung giờ mặc định.
                                        Bác sĩ có thể điều chỉnh lịch làm việc sau khi tạo.
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