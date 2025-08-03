import React, { useState } from 'react';
import axios from 'axios';
import { User, Calendar, Users, CreditCard, Plus, CheckCircle, AlertCircle } from 'lucide-react';

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: 'Male',
        identityNumber: '',
    });

    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({ dateOfBirth: '', identityNumber: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation cho ngày sinh
        if (name === 'dateOfBirth') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate > today) {
                setErrors((prev) => ({
                    ...prev,
                    dateOfBirth: 'Ngày sinh không được trong tương lai.',
                }));
                return; // Không cập nhật nếu ngày không hợp lệ
            } else {
                setErrors((prev) => ({ ...prev, dateOfBirth: '' }));
            }
        }

        // Validation cho số CMND/CCCD
        if (name === 'identityNumber') {
            const regex = /^[0-9]{0,12}$/;
            if (!regex.test(value)) {
                setErrors((prev) => ({
                    ...prev,
                    identityNumber: 'Số CMND/CCCD chỉ chứa 12 ký tự số, không chứa chữ, khoảng trắng hoặc ký tự đặc biệt.',
                }));
                return; // Không cập nhật nếu giá trị không hợp lệ
            } else if (value.length > 12) {
                setErrors((prev) => ({
                    ...prev,
                    identityNumber: 'Số CMND/CCCD không được vượt quá 12 ký tự.',
                }));
                return;
            } else if (value.length > 0 && value.length < 12) {
                setErrors((prev) => ({
                    ...prev,
                    identityNumber: 'Số CMND/CCCD phải có đúng 12 ký tự số.',
                }));
            } else {
                setErrors((prev) => ({ ...prev, identityNumber: '' }));
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra lỗi trước khi gửi
        if (errors.dateOfBirth || errors.identityNumber || !formData.identityNumber || formData.identityNumber.length !== 12) {
            setMessage('Vui lòng kiểm tra và sửa các lỗi trong biểu mẫu.');
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem('token');
        const userx = JSON.parse(localStorage.getItem('user'));
        try {
            const response = await axios.post(`/api/doctor/taoprofile?userId=${userx?._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Tạo hồ sơ thành công!');
            console.log(response.data);
            // Reset form after successful submission
            setFormData({
                name: '',
                dateOfBirth: '',
                gender: 'Male',
                identityNumber: '',
            });
            setErrors({ dateOfBirth: '', identityNumber: '' });
        } catch (error) {
            console.error(error);
            setMessage('Tạo hồ sơ thất bại.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                        <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo Hồ Sơ Mới</h1>
                    <p className="text-gray-600">Điền thông tin để tạo hồ sơ bệnh nhân</p>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        {/* Message Display */}
                        {message && (
                            <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                                message.includes('thành công') 
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <User className="w-4 h-4 text-blue-600" />
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    required
                                />
                            </div>

                            {/* Date of Birth Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    max={new Date().toISOString().split('T')[0]} // Ngăn chọn ngày trong tương lai
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                                        errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    required
                                />
                                {errors.dateOfBirth && (
                                    <p className="text-sm text-red-500 italic">{errors.dateOfBirth}</p>
                                )}
                            </div>

                            {/* Gender Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <Users className="w-4 h-4 text-blue-600" />
                                    Giới tính
                                </label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                                >
                                    <option value="Male">Nam</option>
                                    <option value="Female">Nữ</option>
                                    <option value="Other">Khác</option>
                                </select>
                            </div>

                            {/* Identity Number Field */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                                    <CreditCard className="w-4 h-4 text-blue-600" />
                                    Số CMND/CCCD
                                </label>
                                <input
                                    type="text"
                                    name="identityNumber"
                                    value={formData.identityNumber}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white ${
                                        errors.identityNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                                    }`}
                                    placeholder="Nhập số CMND hoặc CCCD"
                                    required
                                />
                                {errors.identityNumber && (
                                    <p className="text-sm text-red-500 italic">{errors.identityNumber}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading || errors.dateOfBirth || errors.identityNumber}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Đang tạo hồ sơ...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-5 h-5" />
                                        Tạo Hồ Sơ
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                        <p className="text-sm text-gray-500 text-center">
                            Vui lòng kiểm tra kỹ thông tin trước khi tạo hồ sơ
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;