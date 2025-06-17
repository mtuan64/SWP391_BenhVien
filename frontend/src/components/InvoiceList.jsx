import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/authContext';

const InvoiceList = () => {
    const { user, loading: authLoading } = useAuth();
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            setError(null);

            try {
                // const token = localStorage.getItem('token');
                // if (!token) throw new Error('Không tìm thấy token, vui lòng đăng nhập');

                const response = await axios.get('http://localhost:9999/api/checkup/invoices', {
                    // headers: { Authorization: `Bearer ${token}` },
                    // timeout: 5000,
                });
                setInvoices(response.data?.data || []);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching invoices:', err);
                setError(err.response?.data?.message || 'Lỗi khi tải danh sách hóa đơn');
                setLoading(false);
            }
        };

        if (user?._id && !authLoading) {
            fetchInvoices();
        } else if (!authLoading) {
            setError('Vui lòng đăng nhập để tải dữ liệu');
            setLoading(false);
        }
    }, [user?._id, authLoading]);

    const handlePayInvoice = async (invoiceId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:9999/api/checkup/create-payment-link',
                { invoiceId, method: 'Credit Card' }, // Hoặc 'Mobile App'
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            if (response.data.success) {
                window.location.href = response.data.data.checkoutUrl;
            } else {
                alert(response.data.message);
            }
        } catch (err) {
            console.error('Lỗi khi tạo link thanh toán:', err);
            alert(err.response?.data?.message || 'Lỗi khi tạo link thanh toán');
        }
    };

    if (authLoading || loading) return <div className="text-center">Đang tải...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container my-4">
            <h2 className="text-2xl font-bold mb-4">Danh sách hóa đơn</h2>
            <div className="row">
                {invoices.map((invoice) => (
                    <div key={invoice._id} className="col-12 mb-3">
                        <div className="card p-3">
                            <h5 className="card-title">Hóa đơn {invoice.invoiceNumber}</h5>
                            <p><strong>Khách hàng:</strong> {invoice.userId?.name || 'N/A'}</p>
                            <p><strong>Hồ sơ:</strong> {invoice.profileId?.name || 'N/A'}</p>
                            <p><strong>Tổng tiền:</strong> {invoice.totalAmount.toLocaleString('vi-VN')} VNĐ</p>
                            <p><strong>Trạng thái:</strong> {invoice.status}</p>
                            {invoice.status === 'Pending' && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handlePayInvoice(invoice._id)}
                                >
                                    Thanh toán
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InvoiceList;