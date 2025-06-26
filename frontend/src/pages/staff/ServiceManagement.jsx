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
import FooterComponent from "../../components/FooterComponent";
import "../../assets/css/Homepage.css";

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
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
    price: "",
    doctors: [],
  });
  const [currentService, setCurrentService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    fetchServices(searchQuery, currentPage);
    fetchDoctors();
  }, [searchQuery, currentPage]);

  const fetchServices = async (search = "", page = 1) => {
    setLoading(true);
    try {
      const params = { search, page, limit };
      const res = await axios.get("http://localhost:9999/api/services", {
        params,
      });
      setServices(res.data.services || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setTotalItems(res.data.totalServices || 0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load services.");
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/services/doctors");
      setDoctors(res.data.doctors || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to load doctors.");
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
    setCurrentService(null);
    setForm({
      name: "",
      description: "",
      price: "",
      doctors: [],
    });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setForm({
      name: service.name || "",
      description: service.description || "",
      price: service.price || "",
      doctors: service.doctors?.map((doc) => doc._id) || [],
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "doctors") {
      const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
      setForm((prev) => ({
        ...prev,
        doctors: selectedOptions,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) || "" : value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      if (currentService) {
        const payload = { ...form };
        await axios.put(`http://localhost:9999/api/services/${currentService._id}`, payload);
      } else {
        await axios.post("http://localhost:9999/api/services", form);
      }
      setShowModal(false);
      fetchServices(searchQuery, currentPage);
    } catch (error) {
      setError(error.response?.data?.message || "Operation failed.");
    }
  };

  const handleDeleteClick = (serviceId) => {
    setDeleteServiceId(serviceId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9999/api/services/${deleteServiceId}`);
      setShowDeleteModal(false);
      fetchServices(searchQuery, currentPage);
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
        <h2 className="mb-4">Service Management</h2>

        <Row className="align-items-center mb-3">
          <Col md={3} sm={12} className="mb-2 mb-md-0">
            <InputGroup style={{ maxWidth: "300px" }}>
              <FormControl
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="shadow-sm"
                aria-label="Search services"
              />
            </InputGroup>
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

          <Col md={6} sm={12} className="text-md-end">
            <Button
              variant="success"
              onClick={handleAddNew}
              className="shadow-sm rounded-pill px-4"
              aria-label="Add new service"
            >
              Add Service
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
        ) : services.length === 0 ? (
          <p>No services found.</p>
        ) : (
          <>
            <div className="table-responsive shadow-sm rounded">
              <Table striped hover className="table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Doctors</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={service._id}>
                      <td>{(currentPage - 1) * limit + index + 1}</td>
                      <td>{service.name}</td>
                      <td>{service.description || "N/A"}</td>
                      <td>${service.price}</td>
                      <td>
                        {service.doctors && service.doctors.length > 0
                          ? service.doctors.map((doc) => doc.name).join(", ")
                          : "No doctors"}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Button
                            variant="primary"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleEdit(service)}
                            aria-label="Edit service"
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="rounded-circle"
                            onClick={() => handleDeleteClick(service._id)}
                            aria-label="Delete service"
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
                {Math.min(currentPage * limit, totalItems)} of {totalItems} services
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
          <Modal.Title>{currentService ? "Edit Service" : "Add Service"}</Modal.Title>
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
              <Form.Label className="fw-medium">Description</Form.Label>
              <Form.Control
                name="description"
                value={form.description}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Price</Form.Label>
              <Form.Control
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium">Doctors</Form.Label>
              <Form.Select
                name="doctors"
                multiple
                value={form.doctors}
                onChange={handleChange}
                className="shadow-sm"
                aria-label="Select doctors"
              >
                {doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Text className="text-muted">
                Hold Ctrl (Windows) or Cmd (Mac) to select multiple doctors.
              </Form.Text>
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
            aria-label={currentService ? "Save service" : "Add service"}
          >
            {currentService ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Delete Confirmation */}
      <Modal show={showDeleteModal} onHide={cancelDelete} centered className="shadow-lg">
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">Are you sure you want to delete this service?</Modal.Body>
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

export default ServiceManagement;