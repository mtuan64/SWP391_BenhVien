import React, { useState } from 'react';
import axios from 'axios';

const ClaimProfile = () => {
    const [identityNumber, setIdentityNumber] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleClaim = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        if (!userId) {
            setError('Không tìm thấy userId. Vui lòng đăng nhập lại.');
            return;
        }

        try {
            const response = await axios.post('/api/user/claim', {
                identityNumber,
                userId,
            });

            if (response.data.success) {
                setMessage(`✅ Đã nhận hồ sơ: ${response.data.profile.name}`);
            } else {
                setError('❌ Không thể nhận hồ sơ.');
            }
        } catch (err) {
            const msg = err.response?.data?.message;
            if (msg === 'already linked') {
                setError('⚠️ Hồ sơ này đã được liên kết với tài khoản khác.');
            } else if (msg === 'not found') {
                setError('⚠️ Không tìm thấy hồ sơ với CCCD đã nhập.');
            } else {
                setError('❌ Đã xảy ra lỗi khi nhận hồ sơ.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Nhận hồ sơ bằng CCCD</h2>
            <form onSubmit={handleClaim}>
                <input
                    type="text"
                    value={identityNumber}
                    onChange={(e) => setIdentityNumber(e.target.value)}
                    placeholder="Nhập số CCCD"
                    className="w-full p-2 border rounded mb-3"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Nhận hồ sơ
                </button>
            </form>
            {message && <div className="mt-3 text-green-600">{message}</div>}
            {error && <div className="mt-3 text-red-600">{error}</div>}
        </div>
    );
};

export default ClaimProfile;
