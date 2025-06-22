import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form, InputGroup, FormControl } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FooterComponent from "../../components/FooterComponent";
import axios from "axios";
import "../../assets/css/Homepage.css";

const AppointmentScheduleManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const [doctors, setDoctors] = useState([]);
  
  // Modal & form
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    appointmentDate: "",
    doctorId: "",
    department: "",
    type: "Offline",
    status: "Booked",
    reminderSent: false,
    userId: "",
    profileId: "",
  });
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredAppointments(appointments);
    } else {
      const lowerSearch = searchTerm.toLowerCase();
      const filtered = appointments.filter((a) => {
        return (
          (a.doctorName && a.doctorName.toLowerCase().includes(lowerSearch)) ||
          (a.userName && a.userName.toLowerCase().includes(lowerSearch)) ||
          (a.department && a.department.toLowerCase().includes(lowerSearch)) ||
          (a.status && a.status.toLowerCase().includes(lowerSearch))
        );
      });
      setFilteredAppointments(filtered);
    }
  }, [searchTerm, appointments]);

  const fetchSchedules = async (doctorId) => {
    try {
      const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/schedules/${doctorId}`);
      console.log("Fetched schedules:", res.data); // 👈 kiểm tra có dữ liệu
      setSchedules(res.data || []);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
      setSchedules([]);
    }
  };


  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement")
      setAppointments(res.data.data || res.data);
      setFilteredAppointments(res.data.data || res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments.");
      setLoading(false);
    }
  };

const fetchDoctors = async () => {
  try {
    const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/doctors");
    setDoctors(res.data); // lưu vào state doctors
  } catch (error) {
    console.error("Failed to fetch doctors: ", error);
  }
};

  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
const [profiles, setProfiles] = useState([]);
const [departments, setDepartments] = useState([]);
const [users, setUsers] = useState([]);

useEffect(() => {
  fetchAppointments();
  fetchDoctors();
  fetchDepartments();
  fetchUsers();
}, []);

useEffect(() => {
  if (form.userId) {
    fetchProfilesByUser(form.userId);
  } else {
    setProfiles([]);
  }
}, [form.userId]);


const fetchProfilesByUser = async (userId) => {
  try {
    console.log("🔍 userId gửi lên:", userId);

    if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
      console.error("❌ Invalid userId format:", userId);
      return;
    }

    const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/profiles/${userId}`);
    setProfiles(res.data);
  } catch (err) {
    console.error("Failed to fetch profiles:", err);
    setProfiles([]);
  }
};


const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/users");
    setUsers(res.data);
  } catch (err) {
    console.error("Failed to fetch users:", err);
  }
};
const fetchDepartments = async () => {
  try {
    const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/departments");
    setDepartments(res.data);
  } catch (error) {
    console.error("Failed to fetch departments: ", error);
  }
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
      userId: "",
      profileId: "",
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

  if (name === "doctorId") {
    const selectedDoctor = doctors.find(doc => doc._id === value);
    setForm(prev => ({
      ...prev,
      doctorId: value,
      department: selectedDoctor?.department || ""
    }));

    // 👉 Gọi sau khi setForm, nhưng vì setForm không chờ được, bạn vẫn có thể gọi trực tiếp:
    fetchSchedules(value);
  } 
  else if (name === "userId") {
    setForm(prev => ({ ...prev, userId: value }));
    fetchProfilesByUser(value); // ✅ Gọi luôn khi chọn user
  } 
  else {
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
}



async function handleSubmit() {
  try {
    let payload = {
      ...form,
      appointmentDate: new Date(form.appointmentDate).toISOString(),
    };

    // 👉 Nếu user chọn No Profile (rỗng)
    if (!form.profileId || form.profileId === "") {
      console.warn("⚠️ Không có profile, sẽ tạo mới");

      const selectedUser = users.find(u => u._id === form.userId);

      const newProfile = await axios.post("http://localhost:9999/api/appointmentScheduleManagement/profiles", {
        userId: form.userId,
        name: selectedUser?.name,
        gender: "Other",
        dateOfBirth: "2000-01-01",
        diagnose: "",
        note: "",
        issues: "",
        doctorId: form.doctorId || null,
        medicine: null,
      });

      console.log("✅ Profile mới tạo:", newProfile.data);
      payload.profileId = newProfile.data._id;
    }

    // 🔐 Kiểm tra profileId đã chắc chắn có chưa
    if (!payload.profileId) {
      alert("Không thể tạo cuộc hẹn vì không có profileId.");
      return;
    }

    // ✅ Tạo hoặc cập nhật Appointment
    if (currentAppointment) {
      await axios.put(`http://localhost:9999/api/AppointmentScheduleManagement/${currentAppointment._id}`, payload);
    } else {
      await axios.post("http://localhost:9999/api/AppointmentScheduleManagement", payload);
    }

    setShowModal(false);
    fetchAppointments();
  } catch (error) {
    console.error("❌ Lỗi gửi dữ liệu: ", error);
    alert("Lỗi tạo/cập nhật lịch hẹn: " + (error?.response?.data?.message || error.message));
  }
}







  function handleDeleteClick(appointmentId) {
    setDeleteAppointmentId(appointmentId);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await axios.delete(`http://localhost:9999/api/AppointmentScheduleManagement/${deleteAppointmentId}`);
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
        <h2 className="mb-4">Appointment Schedule Management</h2>

        <InputGroup className="mb-3" style={{ maxWidth: "400px" }}>
          <FormControl
            placeholder="Search doctor, user, department, status..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
            Search
          </Button>
        </InputGroup>

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
        ) : filteredAppointments.length === 0 ? (
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
                <th>Medical Profile</th>
                <th>Status</th>
                <th>Reminder</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment, index) => (
                <tr key={appointment._id}>
                  <td>{index + 1}</td>
                  <td>{formatDateTime(appointment.appointmentDate)}</td>
                  <td>{appointment.doctorName || "N/A"}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.type}</td>
                  <td>{appointment.userName || "N/A"}</td>
                  <td>{!appointment.profileId || appointment.profileId === "null" ? "N/A" : appointment.profileId}</td>
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

      {/* Modal Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="modal-update-appointment">
        <Modal.Header closeButton>
          <Modal.Title>{currentAppointment ? "Update Appointment" : "Add New Appointment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>




            <Form.Group className="mb-3" controlId="doctorId">
              <Form.Label>Doctor</Form.Label>
              <Form.Select name="doctorId" value={form.doctorId} onChange={handleChange} required>
                <option value="">Select doctor</option>
                {doctors.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
<Form.Group className="mb-3" controlId="appointmentDate">
  <Form.Label>Appointment Date</Form.Label>
  {schedules.length === 0 ? (
    <div className="text-muted">No available schedule</div>
  ) : (
    <Form.Select
      value={form.appointmentDate}
      onChange={(e) =>
        setForm(prev => ({ ...prev, appointmentDate: e.target.value }))
      }
    >
      <option value="">Select a time slot</option>
      {schedules.map((s) =>
        s.timeSlots
          .filter((slot) => slot.status === "Available")
          .map((slot, i) => (
            <option key={i} value={slot.startTime}>
              {new Date(s.date).toLocaleDateString("en-GB")} |{" "}
              {new Date(slot.startTime).toLocaleTimeString("en-GB")} -{" "}
              {new Date(slot.endTime).toLocaleTimeString("en-GB")}
            </option>
          ))
      )}
    </Form.Select>
  )}
</Form.Group>
<Form.Group className="mb-3" controlId="department">
  <Form.Label>Department</Form.Label>
  <Form.Control
    type="text"
    name="department"
    value={form.department}
    onChange={handleChange}
    placeholder="Enter Department"
    readOnly
  />
</Form.Group>


            <Form.Group className="mb-3" controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Select name="type" value={form.type} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </Form.Select>
            </Form.Group>

<Form.Group className="mb-3" controlId="userId">
  <Form.Label>User</Form.Label>
  <Form.Select name="userId" value={form.userId} onChange={handleChange} required>
    <option value="">Select user</option>
    {users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.name}
      </option>
    ))}
  </Form.Select>
</Form.Group>


<Form.Group className="mb-3" controlId="profileId">
  <Form.Label>Medical Profile</Form.Label>
  <Form.Select name="profileId" value={form.profileId} onChange={handleChange}>
    <option value="">-- No profile --</option>
    {profiles.map((profile) => (
      <option key={profile._id} value={profile._id}>
        {profile.fullName || profile._id}
      </option>
    ))}
  </Form.Select>
</Form.Group>




            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select name="status" value={form.status} onChange={handleChange}>
                <option value="Booked">Booked</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
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

      {/* Modal Delete */}
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

export default AppointmentScheduleManagement;
