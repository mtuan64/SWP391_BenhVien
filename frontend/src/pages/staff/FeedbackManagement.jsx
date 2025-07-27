import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { Table, Spinner, Alert, Form, Button } from "react-bootstrap"; // Thêm Button cho nút Tìm/Reset

const FeedbackManagePage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State cho giá trị input tìm kiếm
  const [searchTriggered, setSearchTriggered] = useState(false); // State mới: Kiểm tra đã bấm tìm chưa (false: hiển thị hết)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/staff/feedback", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFeedbacks(res.data);
      } catch (err) {
        setError("Không thể tải feedback.");
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacks();
  }, [token]);

  // Filter feedbacks theo tên bác sĩ (chỉ khi searchTriggered = true)
  const filteredFeedbacks = searchTriggered
    ? feedbacks.filter(fb => fb.appointmentId?.doctorId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
    : feedbacks; // Nếu chưa bấm tìm, hiển thị hết

  // Hàm bấm nút Tìm (mới): Kích hoạt filter nếu searchTerm không rỗng
  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert("Vui lòng nhập tên bác sĩ để tìm!");
      return;
    }
    setSearchTriggered(true); // Kích hoạt filter
  };

  // Hàm bấm nút Reset (mới): Clear và hiển thị hết
  const handleReset = () => {
    setSearchTerm('');
    setSearchTriggered(false); // Tắt filter, hiển thị hết
  };

  if (loading) return <Spinner animation="border" variant="primary" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-primary fw-bold mb-4">Quản Lý Phản Hồi Khách Hàng</h3>

      {/* Input tìm theo tên bác sĩ + nút Tìm và Reset (mới) */}
      <Form.Group className="mb-4 d-flex align-items-end">
        <div style={{ flex: 1 }}>
          <Form.Label>Tìm theo tên bác sĩ:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tên bác sĩ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Chỉ update state, không filter ngay
          />
        </div>
        <Button variant="primary" className="ms-2" onClick={handleSearch}>Tìm</Button> {/* Nút Tìm mới */}
        <Button variant="secondary" className="ms-2" onClick={handleReset}>Reset</Button> {/* Nút Reset mới */}
      </Form.Group>

      {filteredFeedbacks.length === 0 ? (
        <p>Bác sĩ này không có feedback nào.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Bệnh nhân</th>
              <th>Nội dung</th>
              <th>Đánh giá</th>
              <th>Ngày gửi</th>
              <th>Lịch hẹn</th>
              <th>Bác sĩ</th> 
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((fb) => (
              <tr key={fb._id}>
                <td>{fb.userId?.name || "Ẩn Danh"}</td>
                <td>{fb.content}</td>
                <td>{fb.rating} sao</td>
                <td>{new Date(fb.createdAt).toLocaleString()}</td>
                <td>{fb.appointmentId ? new Date(fb.appointmentId.appointmentDate).toLocaleDateString() : "-"}</td>
                <td>{fb.appointmentId?.doctorId?.name || "-"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FeedbackManagePage;