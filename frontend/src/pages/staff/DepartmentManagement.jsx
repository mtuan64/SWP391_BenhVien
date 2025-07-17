import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);

  useEffect(() => {
    fetchDepartments(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  const fetchDepartments = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const params = { search, page, limit };
      const res = await axios.get("http://localhost:9999/api/departments", { params });
      setDepartments(res.data.departments || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setTotalItems(res.data.totalDepartments || 0);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load departments.");
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
      if (currentDepartment) {
        await axios.put(
          `http://localhost:9999/api/departments/${currentDepartment._id}`,
          form
        );
      } else {
        await axios.post("http://localhost:9999/api/departments", form);
      }
      setShowModal(false);
      fetchDepartments(searchQuery, currentPage);
    } catch (error) {
      setError(error.response?.data?.message || "Operation failed.");
    }
  };

  const handleDeleteClick = (departmentId) => {
    setDeleteDepartmentId(departmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9999/api/departments/${deleteDepartmentId}`);
      setShowDeleteModal(false);
      fetchDepartments(searchQuery, currentPage);
    } catch (error) {
      setError(error.response?.data?.message || "Delete failed.");
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
        <h2 className="mb-4">Department Management</h2>

        <Row className="align-items-center mb-3">
          <Col md={3} sm={12}>
            <InputGroup style={{ maxWidth: "300px" }}>
              <FormControl
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="shadow-sm"
              />
            </InputGroup>
          </Col>

          <Col md={3} sm={12} className="mb-2 mb-md-0">
            <Button
              variant="outline-primary"
              onClick={handleClearFilters}
              className="shadow-sm rounded-pill px-3 w-100"
            >
              Clear Filters
            </Button>
          </Col>

          <Col md={6} sm={12} className="text-md-end">
            <Button
              variant="success"
              onClick={handleAddNew}
              className="shadow-sm rounded-pill px-4"
            >
              Add Department
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
          <p>No departments found.</p>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded">
              <Table striped hover className="table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((department, index) => (
                    <tr key={department._id}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{department.name}</td>
                      <td>{department.description || "N/A"}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleEdit(department)}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleDeleteClick(department._id)}
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
                {Math.min(currentPage * limit, totalItems)} of {totalItems} departments
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

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>{currentDepartment ? "Edit Department" : "Add Department"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                value={form.name}
                onChange={handleChange}
                aria-label="Department name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
                aria-label="Department description"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentDepartment ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this department?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
};

export default DepartmentManagement;