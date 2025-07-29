// import React, { useState } from 'react';
// import axios from 'axios';

// const StaffCreateProfile = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         dateOfBirth: '',
//         gender: 'Male',
//         identityNumber: '',
//     });

//     const [message, setMessage] = useState('');

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const token = localStorage.getItem('token');
//         const userx = JSON.parse(localStorage.getItem('user'));
//         try {
//             const response = axios.post(`/api/doctor/taoprofile`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setMessage('Tạo hồ sơ thành công!');
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//             setMessage('Tạo hồ sơ thất bại.');
//         }
//     };

//     return (
//         <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded">
//             <h2 className="text-xl font-bold mb-4">Tạo Hồ Sơ</h2>
//             {message && <div className="mb-4 text-blue-600">{message}</div>}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block">Họ tên:</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block">Ngày sinh:</label>
//                     <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded"
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label className="block">Giới tính:</label>
//                     <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded"
//                     >
//                         <option value="Male">Nam</option>
//                         <option value="Female">Nữ</option>
//                         <option value="Other">Khác</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block">Số CMND/CCCD:</label>
//                     <input
//                         type="text"
//                         name="identityNumber"
//                         value={formData.identityNumber}
//                         onChange={handleChange}
//                         className="w-full border px-3 py-2 rounded"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//                 >
//                     Tạo Hồ Sơ
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default StaffCreateProfile;
import React, { useState } from 'react';
import { User, Calendar, Users, CreditCard, UserPlus, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const StaffCreateProfile = () => {
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
            const response = axios.post(`/api/doctor/taoprofile`, formData, {
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
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-lg mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full mb-4 shadow-lg">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo hồ sơ bệnh nhân</h1>
                    <p className="text-gray-600">Vui lòng điền đầy đủ thông tin cá nhân</p>
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

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <User className="w-4 h-4 mr-2 text-emerald-600" />
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 hover:bg-gray-100"
                                    placeholder="Nhập họ và tên đầy đủ"
                                    required
                                />
                            </div>

                            {/* Date of Birth Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-100"
                                    required
                                />
                            </div>

                            {/* Gender Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <Users className="w-4 h-4 mr-2 text-purple-600" />
                                    Giới tính
                                </label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 appearance-none cursor-pointer hover:bg-gray-100"
                                    >
                                        <option value="Male">Nam</option>
                                        <option value="Female">Nữ</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Identity Number Field */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700">
                                    <CreditCard className="w-4 h-4 mr-2 text-orange-600" />
                                    Số CMND/CCCD
                                </label>
                                <input
                                    type="text"
                                    name="identityNumber"
                                    value={formData.identityNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 hover:bg-gray-100"
                                    placeholder="Nhập số CMND hoặc CCCD"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
                                >
                                    <UserPlus className="w-5 h-5" />
                                    <span>Tạo hồ sơ bệnh nhân</span>
                                </button>
                            </div>
                        </form>

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
                                        Vui lòng kiểm tra kỹ thông tin trước khi tạo hồ sơ.
                                        Số CMND/CCCD phải chính xác và đúng với giấy tờ tùy thân.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaffCreateProfile;