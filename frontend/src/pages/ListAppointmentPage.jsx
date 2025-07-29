import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Table, Button, Spinner, Alert, Form } from "react-bootstrap";

const ListAppointmentPage = () => {
  const { token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(10);

  const [filterStatus, setFilterStatus] = useState("");
  const [filterDoctor, setFilterDoctor] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const userId = JSON.parse(localStorage.getItem("user"))._id;

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: appointmentsPerPage,
        userId,
        ...(filterStatus && { status: filterStatus }),
        ...(filterDoctor && { doctorId: filterDoctor }),
        ...(filterDepartment && { departmentId: filterDepartment }),
        ...(filterDate && { date: filterDate }),
      };

      const res = await axios.get(`/api/user/user`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(res.data.appointments || []);
      setTotalAppointments(res.data.totalAppointments || 0);
    } catch (err) {
      console.error("Lỗi lấy dữ liệu lịch hẹn:", err);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  // Lấy danh sách chuyên khoa khi trang được load
  useEffect(() => {
    axios
      .get("/api/departments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDepartments(res.data.departments || []))
      .catch((err) => console.error("Lỗi lấy chuyên khoa:", err));
  }, []);

  // Khi chọn chuyên khoa thì load bác sĩ theo khoa
  useEffect(() => {
    if (filterDepartment) {
      axios
        .get(`/api/staff/employees?department=${filterDepartment}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setDoctors(res.data || []))
        .catch((err) => console.error("Lỗi lấy bác sĩ theo khoa:", err));
    } else {
      setDoctors([]);
    }
  }, [filterDepartment]);

  useEffect(() => {
    fetchAppointments();
  }, [currentPage, filterStatus, filterDoctor, filterDepartment, filterDate]);

  const formatTime = (dateStr) =>
    new Date(dateStr).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const totalPages = Math.ceil(totalAppointments / appointmentsPerPage);

  return (
    <div className="container py-4">
      <h2 className="text-primary fw-bold mb-3">Lịch hẹn của bạn</h2>

      <Form className="row g-3 mb-4">
        <Form.Group className="col-md-3">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Tất cả</option>
            <option value="Booked">Đã đặt</option>
            <option value="Completed">Đã khám</option>
            <option value="Canceled">Đã hủy</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Label>Chuyên khoa</Form.Label>
          <Form.Select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
          >
            <option value="">Tất cả</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Label>Bác sĩ</Form.Label>
          <Form.Select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
          >
            <option value="">Tất cả</option>
            {doctors.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="col-md-3">
          <Form.Label>Ngày</Form.Label>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Form.Group>
      </Form>

      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : appointments.length === 0 ? (
        <Alert variant="info">Không có lịch hẹn phù hợp.</Alert>
      ) : (
        <Table bordered hover responsive className="align-middle">
          <thead>
            <tr>
              <th>Bác sĩ</th>
              <th>Khoa</th>
              <th>Hồ sơ</th>
              <th>Ngày</th>
              <th>Giờ</th>
              <th>Loại</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td>{app.doctorId?.name || "Không rõ"}</td>
                <td>{app.department?.name || app.doctorId?.department || ""}</td>
                <td>{app.profileId?.name || "Không rõ"}</td>
                <td>
                  {new Date(app.appointmentDate).toLocaleDateString("vi-VN")}
                </td>
                <td>
                  {app.timeSlot?.startTime
                    ? `${formatTime(app.timeSlot.startTime)} - ${formatTime(app.timeSlot.endTime)}`
                    : "Không rõ"}
                </td>
                <td>{app.type === "Online" ? "Online" : "Tại viện"}</td>
                <td>
                  <span
                    className={`badge bg-${
                      app.status === "Booked"
                        ? "warning"
                        : app.status === "Completed"
                        ? "success"
                        : "secondary"
                    }`}
                  >
                    {app.status === "Booked"
                      ? "Đã đặt"
                      : app.status === "Completed"
                      ? "Đã khám"
                      : "Đã hủy"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="d-flex justify-content-between mt-3">
        <span className="text-muted">Tổng số: {totalAppointments}</span>
        <div>
          <Button
            variant="secondary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Trước
          </Button>{" "}
          <span>{`Trang ${currentPage} / ${totalPages}`}</span>{" "}
          <Button
            variant="secondary"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListAppointmentPage;
