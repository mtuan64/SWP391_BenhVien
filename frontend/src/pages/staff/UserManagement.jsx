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
  Pagination,
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const limit = 5;

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
      const params = { search, page, limit };
      if (status !== "all") params.status = status;

      const res = await axios.get("http://localhost:9999/api/users", {
        params,
      });
      setUsers(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setTotalItems(res.data.total || 0);
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

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
                className="shadow-sm"
                aria-label="Search users"
              />
            </InputGroup>
          </Col>

          <Col md={2} sm={12} className="mb-2 mb-md-0">
            <Form.Select
              value={statusFilter}
              onChange={handleStatusChange}
              className="shadow-sm"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Form.Select>
          </Col>

          <Col md={3} sm={12} className="mb-2 mb-md-0">
            <Button
              variant="outline-primary"
              onClick={handleClearFilters}
              className="shadow-sm rounded-pill px-3 w-100"
              aria-label="Clear filters"
            >
              Clear Filters
            </Button>
          </Col>

          <Col md={4} sm={12} className="text-md-end">
            <Button
              variant="success"
              onClick={handleAddNew}
              className="shadow-sm rounded-pill px-4"
              aria-label="Add new user"
            >
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
            <div className="table-responsive shadow-sm rounded">
              <Table striped hover className="table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Profiles</th>
                    <th>Actions</th>
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
                            aria-label="Edit user"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleDeleteClick(user._id)}
                            aria-label="Delete user"
                          >
                            <FaTrash />
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
                Showing {(currentPage - 1) * limit + 1} to{" "}
                {Math.min(currentPage * limit, totalItems)} of {totalItems} users
              </div>
              <Pagination className="mb-0">
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="shadow-sm"
                />
                {[...Array(totalPages).keys()].map((page) => (
                  <Pagination.Item
                    key={page + 1}
                    active={page + 1 === currentPage}
                    onClick={() => handlePageChange(page + 1)}
                    className="shadow-sm"
                    aria-label={`Go to page ${page + 1}`}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="shadow-sm"
                />
              </Pagination>
            </div>
          </>
        )}
      </Container>

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered className="shadow-lg">
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{currentUser ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Email</Form.Label>
              <Form.Control
                name="email"
                value={form.email}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Phone</Form.Label>
              <Form.Control
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter phone"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder={currentUser ? "Leave blank to keep old password" : ""}
                value={form.password}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Status</Form.Label>
              <Form.Select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Select status"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            className="rounded-pill px-3 shadow-sm"
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            className="rounded-pill px-4 shadow-sm"
            aria-label={currentUser ? "Save user" : "Add user"}
          >
            {currentUser ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered className="shadow-lg">
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            variant="secondary"
            onClick={cancelDelete}
            className="rounded-pill px-3 shadow-sm"
            aria-label="Cancel delete"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            className="rounded-pill px-3 shadow-sm"
            aria-label="Confirm delete"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default UserManagement;