import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance"; // import đúng axiosInstance (tự động đính kèm token)
import "../assets/css/ListAppointmentPage.css";

const ListAppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalAppointments, setTotalAppointments] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [appointmentsPerPage] = useState(10); // Mặc định là 10 lịch hẹn mỗi trang

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get(`/api/user/user?page=${currentPage}&limit=${appointmentsPerPage}`);
                setAppointments(res.data.appointments || []);
                setTotalAppointments(res.data.totalAppointments || 0); // Lưu tổng số cuộc hẹn
            } catch (error) {
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [currentPage]);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalAppointments / appointmentsPerPage);

    // Handle chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4" style={{ color: "#3c92e9", fontWeight: 700 }}>
                Lịch hẹn của tôi
            </h2>
            {loading ? (
                <div>Đang tải dữ liệu...</div>
            ) : appointments.length === 0 ? (
                <div className="alert alert-info">Bạn chưa có lịch hẹn nào.</div>
            ) : (
                <div className="table-responsive appointment-table">
                    <table className="table table-bordered table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Bác sĩ</th>
                                <th>Chuyên khoa</th>
                                <th>Hồ sơ bệnh nhân</th>
                                <th>Ngày khám</th>
                                <th>Hình thức</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map(app => (
                                <tr key={app._id}>
                                    <td>{app.doctorId?.name || ""}</td>
                                    <td>{app.doctorId?.department || ""}</td>
                                    <td>{app.profileId?.name || ""}</td>
                                    <td>
                                        {app.appointmentDate
                                            ? new Date(app.appointmentDate).toLocaleString("vi-VN", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric",
                                            })
                                            : ""}
                                    </td>
                                    <td>{app.type === "Online" ? "Online" : "Tại viện"}</td>
                                    <td>
                                        <span
                                            className={
                                                "badge " +
                                                (app.status === "Booked"
                                                    ? "bg-warning"
                                                    : app.status === "Completed"
                                                        ? "bg-success"
                                                        : app.status === "Canceled"
                                                            ? "bg-secondary"
                                                            : "bg-info")
                                            }
                                        >
                                            {app.status === "Booked"
                                                ? "Đã đặt"
                                                : app.status === "Completed"
                                                    ? "Đã khám"
                                                    : app.status === "Canceled"
                                                        ? "Đã hủy"
                                                        : app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination Section */}
            <div className="d-flex justify-content-center py-4">
                <h5 className="text-muted">Tổng số đơn: {totalAppointments}</h5>
            </div>

            <div className="d-flex justify-content-center py-4 align-items-center">
                <button
                    className="btn btn-secondary me-2"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Trước
                </button>

                {/* Chữ trang được căn giữa */}
                <span className="mx-3">{`Trang ${currentPage} / ${totalPages}`}</span>

                <button
                    className="btn btn-secondary ms-2"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Sau
                </button>
            </div>
        </div>
    );
};

export default ListAppointmentPage;