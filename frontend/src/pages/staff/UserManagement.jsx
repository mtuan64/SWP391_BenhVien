import React, { useEffect, useState } from "react";
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
} from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FooterComponent from "../../components/FooterComponent";
import axios from "axios";
import "../../assets/css/Homepage.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // <-- Thêm trạng thái filter
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // 5 người 1 trang

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    status: "active",
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers(searchQuery, statusFilter, currentPage);
  }, [searchQuery, statusFilter, currentPage]);

  const fetchUsers = async (search = "", status = "all", page = 1) => {
    setLoading(true);
    try {
      // Nếu filter là all thì không gửi param status
      const params = { search, page, limit };
      if (status !== "all") params.status = status;

      const res = await axios.get("http://localhost:9999/api/users", {
        params,
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setCurrentUser(null);
    setForm({
      name: "",
      email: "",
      phone: "",
      password: "",
      status: "active",
    });
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      password: "",
      status: user.status || "active",
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
      if (currentUser) {
        const payload = { ...form };
        if (!payload.password) delete payload.password;

        await axios.put(`http://localhost:9999/api/users/${currentUser._id}`, payload);
      } else {
        await axios.post("http://localhost:9999/api/users", form);
      }
      setShowModal(false);
      fetchUsers(searchQuery, statusFilter, currentPage);
    } catch (error) {
      alert("Operation failed: " + error.message);
    }
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9999/api/users/${deleteUserId}`);
      setShowDeleteModal(false);
      fetchUsers(searchQuery, statusFilter, currentPage);
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">User Management</h2>

        <Row className="align-items-center mb-3">
          <Col md={3} sm={12} className="mb-2 mb-md-0">
            <InputGroup style={{ maxWidth: "300px" }}>
              <FormControl
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-secondary" onClick={() => fetchUsers(searchQuery, statusFilter, 1)}>
                Search
              </Button>
            </InputGroup>
          </Col>

          <Col md={2} sm={12} className="mb-2 mb-md-0">
            <Form.Select value={statusFilter} onChange={handleStatusChange}>
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Col>

          <Col md={6} sm={12} className="text-md-end">
            <Button variant="success" onClick={handleAddNew}>
              Add User
            </Button>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <h5>{error}</h5>
          </div>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <>
            <Table striped bordered hover responsive className="shadow">
  <thead className="table-dark">
    <tr>
      <th>No</th>
      <th>Email</th>
      <th>Password</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Status</th>
      <th>Profiles</th>
      <th>Actions</th>  {/* Bỏ Created và Updated nên bỏ 2 cột này */}
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user._id}>
        <td>{(currentPage - 1) * limit + index + 1}</td>
        <td>{user.email}</td>
        <td>{"••••••••"}</td>
        <td>{user.name}</td>
        <td>{user.phone || "N/A"}</td>
        <td>{user.status}</td>
        <td>
          {user.profiles && user.profiles.length > 0
            ? user.profiles.map((pId) => <div key={pId}>{pId}</div>)
            : "No profiles"}
        </td>
        <td>
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="primary"
              size="sm"
              className="rounded-circle"
              onClick={() => handleEdit(user)}
            >
              <FaEdit />
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="rounded-circle"
              onClick={() => handleDeleteClick(user._id)}
            >
              <FaTrash />
            </Button>
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


            {/* Pagination */}
            <div className="d-flex justify-content-center align-items-center gap-3 my-3">
              <Button variant="outline-primary" onClick={goToPrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="outline-primary" onClick={goToNextPage} disabled={currentPage === totalPages}>
                Next
              </Button>
            </div>
          </>
        )}
      </Container>

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" value={form.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control name="phone" value={form.phone} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder={currentUser ? "Leave blank to keep old password" : ""}
                value={form.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentUser ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default UserManagement;
