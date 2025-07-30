// import React, { useState } from 'react';
// import axios from 'axios';

// const CreateProfile = () => {
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
//             const response = axios.post(`/api/doctor/taoprofile?userId=${userx?._id}`, formData, {
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

// export default CreateProfile;
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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    required
                                />
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
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                    placeholder="Nhập số CMND hoặc CCCD"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
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