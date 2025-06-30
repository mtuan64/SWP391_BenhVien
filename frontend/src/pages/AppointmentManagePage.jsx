import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import { Table, Button, Spinner, Alert, Form } from "react-bootstrap";

const AppointmentManagePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("booked"); // "all" | "booked"

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/user/user");
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments", err);
      setError("Không thể tải danh sách lịch hẹn.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Bạn có chắc muốn hủy lịch hẹn này?")) return;
    try {
      await api.put(`/user/cancel/${id}`);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "Canceled" } : a))
      );
    } catch (err) {
      console.error("Cancel failed", err);
      alert("Hủy lịch hẹn thất bại. Vui lòng thử lại.");
    }
  };

  const filteredAppointments =
    filterStatus === "booked"
      ? appointments.filter((a) => a.status === "Booked")
      : appointments;

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary fw-bold">Lịch hẹn của bạn</h3>
        <Form.Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ width: "200px" }}
        >
          <option value="all">Tất cả lịch hẹn</option>
          <option value="booked">Chỉ lịch đang đặt</option>
        </Form.Select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p>Không có lịch hẹn nào phù hợp.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bác sĩ</th>
              <th>Khoa</th>
              <th>Ngày</th>
              <th>Loại</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.doctorId?.name || "(Không rõ)"}</td>
                <td>{appt.department}</td>
                <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                <td>{appt.type}</td>
                <td>{appt.status}</td>
                <td>
                  {appt.status === "Booked" ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(appt._id)}
                    >
                      Hủy
                    </Button>
                  ) : (
                    <span>-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AppointmentManagePage;
