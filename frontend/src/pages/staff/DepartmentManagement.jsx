import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Container,
  Spinner,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { message } from "antd";
import "../../assets/css/Homepage.css";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 5;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user || user.role !== "Staff") {
      message.warning("Bạn không có quyền truy cập");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDepartments(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const fetchDepartments = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const params = { search, page, limit };
      const res = await axios.get("http://localhost:9999/api/departments", {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDepartments(res.data.departments || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setTotalItems(res.data.totalDepartments || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Không thể tải dữ liệu.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setCurrentDepartment(null);
    setForm({ name: "", description: "" });
    setShowModal(true);
  };

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setForm({
      name: department.name || "",
      description: department.description || "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (currentDepartment) {
        await axios.put(
          `http://localhost:9999/api/departments/${currentDepartment._id}`,
          formData,
          config
        );
        message.success("Cập nhật phòng ban thành công!");
      } else {
        await axios.post("http://localhost:9999/api/departments", formData, config);
        message.success("Thêm phòng ban thành công!");
      }

      setShowModal(false);
      setImageFile(null);
      fetchDepartments(searchQuery, currentPage);
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      message.error(error.response?.data?.message || "Thao tác thất bại.");
    }
  };

  const handleDeleteClick = (departmentId) => {
    setDeleteDepartmentId(departmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9999/api/departments/${deleteDepartmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Xóa phòng ban thành công!");
      setShowDeleteModal(false);
      fetchDepartments(searchQuery, currentPage);
    } catch (error) {
      message.error(error.response?.data?.message || "Xóa thất bại.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">Quản lý phòng ban</h2>

        <Row className="align-items-center mb-3">
          <Col md={3} sm={12}>
            <InputGroup style={{ maxWidth: "300px" }}>
              <FormControl
                placeholder="Tìm theo tên hoặc mô tả..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Col>

          <Col md={3} sm={12} className="mb-2 mb-md-0">
            <Button
              variant="outline-primary"
              onClick={handleClearFilters}
              className="rounded-pill px-2"
              size="sm"
            >
              Xóa tìm kiếm
            </Button>
          </Col>

          <Col md={6} sm={12} className="text-md-end">
            <Button variant="success" onClick={handleAddNew} className="rounded-pill px-4">
              Thêm phòng ban
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <h5>{error}</h5>
          </div>
        ) : departments.length === 0 ? (
          <p>Không tìm thấy phòng ban nào.</p>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded">
              <Table striped hover className="table-bordered">
                <thead className="table-primary">
                  <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Mô tả</th>
                    <th>Hình ảnh</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={department._id}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.description || "Không có"}</td>
                      <td>
                        {department.image ? (
                          <img
                            src={department.image}
                            alt="Ảnh phòng ban"
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          "Không có"
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Button variant="primary" size="sm" onClick={() => handleEdit(department)}>
                            <FaEdit /> Sửa
                          </Button>
                          <Button variant="danger" size="sm" onClick={() => handleDeleteClick(department._id)}>
                            <FaTrash /> Xóa
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <div>
                Hiển thị từ {(currentPage - 1) * limit + 1} đến{" "}
                {Math.min(currentPage * limit, totalItems)} / {totalItems}
              </div>
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}
      </Container>

      {/* Modal Thêm / Sửa */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{currentDepartment ? "Cập nhật phòng ban" : "Thêm phòng ban"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên phòng ban</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nhập tên phòng ban"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Nhập mô tả"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh đại diện</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentDepartment ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Xác nhận Xóa */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa phòng ban này?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Hủy
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DepartmentManagement;
