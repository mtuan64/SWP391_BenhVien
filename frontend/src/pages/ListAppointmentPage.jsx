import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance"; // import đúng axiosInstance (tự động đính kèm token)
import "../assets/css/ListAppointmentPage.css";

const ListAppointmentPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await axios.get("/api/user/user"); // Đúng route backend bạn đã setup!
                setAppointments(res.data || []);
            } catch {
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, []);

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
        </div>
    );
};

export default ListAppointmentPage;
