import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FooterComponent from "../../components/FooterComponent";
import axios from "axios";
import "../../assets/css/Homepage.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/users");
      setUsers(res.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
      setLoading(false);
    }
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
      password: user.password || "",
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
      fetchUsers();
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
      fetchUsers();
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">User Management</h2>

        <Button variant="success" className="mb-3" onClick={handleAddNew}>
          Add User
        </Button>

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
      <th>Created</th>
      <th>Updated</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user, index) => (
      <tr key={user._id}>
        <td>{index + 1}</td>
        <td>{user.email}</td>
        <td>{user.password}</td>
        <td>{user.name}</td>
        <td>{user.phone || "N/A"}</td>
        <td>{user.status}</td>
        <td>
          {user.profiles && user.profiles.length > 0
            ? user.profiles.map((pId) => <div key={pId}>{pId}</div>)
            : "No profiles"}
        </td>
        <td>{new Date(user.createdAt).toLocaleString()}</td>
        <td>{new Date(user.updatedAt).toLocaleString()}</td>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
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
          <Button variant="secondary" onClick={cancelDelete}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <FooterComponent />
    </>
  );
};

export default UserManagement;
