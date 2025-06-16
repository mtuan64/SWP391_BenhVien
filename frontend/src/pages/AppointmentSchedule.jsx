import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import "../assets/css/Homepage.css";

const Schedule = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal & Form state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    appointmentDate: "",
    doctorId: "",
    department: "",
    type: "Offline",
    status: "Booked",
    reminderSent: false,
  });
  const [currentAppointment, setCurrentAppointment] = useState(null);

  // States cho modal xóa
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

  // Ví dụ danh sách bác sĩ & phòng ban tĩnh
  const doctors = [
    { id: "doc1", name: "Dr. Smith" },
    { id: "doc2", name: "Dr. Jane" },
  ];
  const departments = ["Cardiology", "Neurology", "Oncology"];

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/appointmentSchedule");
      setAppointments(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments.");
      setLoading(false);
    }
  };

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  function handleAddNew() {
    setCurrentAppointment(null);
    setForm({
      appointmentDate: "",
      doctorId: "",
      department: "",
      type: "Offline",
      status: "Booked",
      reminderSent: false,
    });
    setShowModal(true);
  }

  function handleEdit(appointment) {
    setCurrentAppointment(appointment);
    setForm({
      appointmentDate: appointment.appointmentDate ? appointment.appointmentDate.slice(0, 16) : "",
      doctorId: appointment.doctorId || "",
      department: appointment.department || "",
      type: appointment.type || "Offline",
      status: appointment.status || "Booked",
      reminderSent: appointment.reminderSent || false,
      userId: appointment.userId || "",
      profileId: appointment.profileId || "",
    });
    setShowModal(true);
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit() {
    try {
      if (currentAppointment) {
        await axios.put(
          `http://localhost:9999/api/appointmentSchedule/${currentAppointment._id}`,
          {
            ...form,
            appointmentDate: new Date(form.appointmentDate).toISOString(),
          }
        );
      } else {
        await axios.post("http://localhost:9999/api/appointmentSchedule", {
          ...form,
          appointmentDate: new Date(form.appointmentDate).toISOString(),
        });
      }
      setShowModal(false);
      fetchAppointments();
    } catch (error) {
      alert("Operation failed: " + error.message);
    }
  }

  function handleDeleteClick(appointmentId) {
    setDeleteAppointmentId(appointmentId);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:9999/api/appointmentSchedule/${deleteAppointmentId}`);
      setShowDeleteModal(false);
      setDeleteAppointmentId(null);
      fetchAppointments();
    } catch (error) {
      alert("Delete failed: " + error.message);
    }
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setDeleteAppointmentId(null);
  }

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4">Appointment Schedules</h2>

        <Button variant="success" className="mb-3" onClick={handleAddNew}>
          Add Appointment
        </Button>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" />
          </div>
        ) : error ? (
          <div className="text-center py-5 text-danger">
            <h5>{error}</h5>
          </div>
        ) : appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <Table striped bordered hover responsive className="shadow">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Appointment Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Type</th>
                <th>User</th>
                <th>Profile ID</th>
                <th>Status</th>
                <th>Reminder</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{formatDateTime(appointment.appointmentDate)}</td>
                  <td>{appointment.doctorName || "N/A"}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.type}</td>
                  <td>{appointment.userName || "N/A"}</td>
                  <td>{appointment.profileId}</td>
                  <td>{appointment.status}</td>
                  <td>{appointment.reminderSent ? "Yes" : "No"}</td>
                  <td>{formatDateTime(appointment.createdAt)}</td>
                  <td>{formatDateTime(appointment.updatedAt)}</td>
                  <td>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="rounded-circle"
                        onClick={() => handleEdit(appointment)}
                        title="Edit Appointment"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="rounded-circle"
                        onClick={() => handleDeleteClick(appointment._id)}
                        title="Delete Appointment"
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="modal-update-appointment">
        <Modal.Header closeButton>
          <Modal.Title>{currentAppointment ? "Update Appointment" : "Add New Appointment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="appointmentDate">
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control type="datetime-local" name="appointmentDate" value={form.appointmentDate} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="doctorId">
              <Form.Label>Doctor ID</Form.Label>
              <Form.Control type="text" name="doctorId" value={form.doctorId} onChange={handleChange} placeholder="Enter Doctor ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" name="department" value={form.department} onChange={handleChange} placeholder="Enter Department" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="userId">
              <Form.Label>User ID</Form.Label>
              <Form.Control type="text" name="userId" value={form.userId || ""} onChange={handleChange} placeholder="Enter User ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="profileId">
              <Form.Label>Profile ID</Form.Label>
              <Form.Control type="text" name="profileId" value={form.profileId || ""} onChange={handleChange} placeholder="Enter Profile ID" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="Booked">Booked</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reminderSent">
              <Form.Check type="checkbox" label="Reminder Sent" name="reminderSent" checked={form.reminderSent} onChange={handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {currentAppointment ? "Save" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this appointment?</Modal.Body>
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

export default Schedule;
