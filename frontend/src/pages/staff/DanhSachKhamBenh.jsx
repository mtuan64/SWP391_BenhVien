import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default DoctorQueue = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    const today = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
    const userx = JSON.parse(localStorage.getItem('user'));
    const doctorId = userx._id;
    useEffect(() => {
        const fetchQueue = async () => {
            try {
                const res = await axios.get(`/api/doctor/today-queue?doctorId=${doctorId}&date=${today}`);
                setTickets(res.data);
            } catch (err) {
                alert('Lỗi khi lấy hàng chờ: ' + (err.response?.data?.message || err.message));
            } finally {
                setLoading(false);
            }
        };

        fetchQueue();
    }, [doctorId]);

    if (loading) return <p>Đang tải danh sách bệnh nhân...</p>;

    return (
        <div className="p-4 max-w-3xl mx-auto bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Hàng chờ khám hôm nay</h2>

            {tickets.length === 0 ? (
                <p>Không có bệnh nhân nào trong hàng chờ.</p>
            ) : (
                <ul className="space-y-3">
                    {tickets.map((ticket, index) => (
                        <li key={ticket._id} className="border p-3 rounded shadow-sm flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-lg">{ticket.profileId.name}</p>
                                <p className="text-sm text-gray-600">CCCD: {ticket.profileId.identityNumber}</p>
                                <p className="text-sm text-gray-600">
                                    Giờ hẹn:{" "}
                                    {new Date(ticket.timeSlot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {" - "}
                                    {new Date(ticket.timeSlot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <span className={`px-3 py-1 rounded text-sm font-medium ${ticket.status === 'waiting' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {ticket.status === 'waiting' ? 'Chờ khám' : 'Đã khám'}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
