import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Spinner,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Pagination,
  Row,
  Col,
} from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch, FaRedo } from "react-icons/fa";
import FooterComponent from "../../components/FooterComponent";
import axios from "axios";
import "../../assets/css/AppointmentScheduleManagement.css";
import { message } from 'antd';

const AppointmentScheduleManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [doctorSearchTerm, setDoctorSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);


  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
  appointmentDate: "",
  department: "",
  doctorId: "",
  timeSlot: "",
  type: "Offline",
  status: "Booked",
  reminderSent: false,
  identityNumber: "",
});

  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

const handleViewProfile = async (profileId) => {
  try {
    const token = localStorage.getItem("token");
    const id = typeof profileId === "object" ? profileId._id : profileId;
    
    const response = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/profile/detail/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    setSelectedProfile(response.data.data);
    setOpenProfileDialog(true);
  } catch (error) {
    console.error("Error fetching profile detail:", error);
  }
};



  useEffect(() => {
    fetchAppointments();
    fetchDepartments();
    fetchUsers();
  }, [
    currentPage,
    statusFilter,
    departmentFilter,
    searchTerm,
    startDate,
    endDate,
  ]);


  useEffect(() => {
  if (form.appointmentDate && form.department) {
    fetchAvailableDoctors(form.appointmentDate, form.department);
    
    // ❗ Reset doctor + timeSlot mỗi khi ngày hoặc department thay đổi
    setForm((prev) => ({
      ...prev,
      doctorId: "",
      timeSlot: "",
    }));
    setSchedules([]);
  } else {
    setAvailableDoctors([]);
    setForm((prev) => ({
      ...prev,
      doctorId: "",
      timeSlot: "",
    }));
    setSchedules([]);
  }
}, [form.appointmentDate, form.department]);


useEffect(() => {
  if (form.doctorId) {
    fetchSchedules(form.doctorId, form.appointmentDate);
    
    // ✅ reset timeSlot vì lịch đã đổi
    setForm((prev) => ({ ...prev, timeSlot: "" }));
  }
}, [form.doctorId]);

  useEffect(() => {
  if (form.doctorId && form.appointmentDate) {
    fetchSchedules(form.doctorId, form.appointmentDate);
    setForm((prev) => ({
      ...prev,
      timeSlot: "", // ✅ reset lại slot mỗi lần chọn bác sĩ
    }));
  }
}, [form.doctorId, form.appointmentDate]);


  const [resolvedProfile, setResolvedProfile] = useState(null);

  useEffect(() => {
    if (
      form.identityNumber &&
      form.appointmentDate &&
      form.department &&
      form.doctorId
    ) {
      fetchProfilesByIdentity(form.identityNumber);
    }
  }, [form.identityNumber, form.appointmentDate, form.department, form.doctorId]);


const [resolvedProfiles, setResolvedProfiles] = useState([]);
const [selectedProfileId, setSelectedProfileId] = useState("");

const fetchProfilesByIdentity = async (identityNumber) => {
  if (!identityNumber || identityNumber.trim() === "") return;

  try {
    const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/profileByIdentity`, {
      params: { identityNumber }
    });

    if (Array.isArray(res.data)) {
      if (res.data.length === 0) {
        // Chỉ hiển thị thông báo khi tìm xong mà không có profile
        message.error("No profiles found with this identity number.");
        setResolvedProfiles([]);
        setSelectedProfileId("");
      } else {
        setResolvedProfiles(res.data);
        setSelectedProfileId(res.data[0]._id); // hoặc để người dùng chọn nếu có nhiều
      }
    } else {
      console.error("Unexpected response format:", res.data);
      message.error("Unexpected response from server.");
    }
  } catch (err) {
    console.error("Error fetching profiles by identity:", err);
    setResolvedProfiles([]);
    setSelectedProfileId("");
  }
};



useEffect(() => {
  if (selectedProfileId) {
    setForm((prev) => ({ ...prev, profileId: selectedProfileId }));
  }
}, [selectedProfileId]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm,
      };
      if (statusFilter !== "all") params.status = statusFilter;
      if (departmentFilter !== "all") params.department = departmentFilter;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await axios.get(
        "http://localhost:9999/api/appointmentScheduleManagement",
        { params }
      );
      const { appointments, pagination } = res.data;
      setAppointments(appointments || []);
      setFilteredAppointments(appointments || []);
      setTotalPages(pagination.totalPages || 1);
      setTotalItems(pagination.total || 0);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to load appointments. Please try again.");
      setLoading(false);
    }
  };

const fetchDepartments = async () => {
  try {
    const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/departments");
    setDepartments(Array.isArray(res.data) ? res.data : []);
  } catch (error) {
    console.error("Failed to fetch departments: ", error);
    setError("Failed to load departments.");
  }
};


  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9999/api/appointmentScheduleManagement/users"
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users.");
    }
  };

    const fetchAvailableDoctors = async (date, departmentId) => {
    try {
      setIsFormLoading(true);

      const formattedDate = new Date(date).toISOString().split("T")[0];

      const res = await axios.get(
        "http://localhost:9999/api/appointmentScheduleManagement/doctors",
        {
          params: { department: departmentId, date: formattedDate },
        }
      );

      setAvailableDoctors(res.data || []);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
      setAvailableDoctors([]);
      setError("Failed to fetch available doctors.");
    } finally {
      setIsFormLoading(false);
    }
  };


  const fetchSchedules = async (doctorId, date) => {
  try {
    const res = await axios.get(
      `http://localhost:9999/api/appointmentScheduleManagement/schedules/${doctorId}`,
      {
        params: { date: new Date(date).toISOString().split("T")[0] }, // ⚠️ dùng yyyy-mm-dd
      }
    );

    //console.log("📥 Raw fetched schedules:", res.data);

const matchingSchedule = res.data.find(
  (s) =>
    new Date(s.date).toISOString().slice(0, 10) ===
    new Date(date).toISOString().slice(0, 10)
);

if (matchingSchedule) {
  //console.log("✅ Found matching schedule:", matchingSchedule);
  //console.log("⏱ Extracted timeSlots:", matchingSchedule.timeSlots);
  setSchedules(matchingSchedule.timeSlots || []);
} else {
  console.warn("⚠️ No matching schedule found for selected date:", date);
  setSchedules([]);
}

  } catch (error) {
    console.error("❌ Failed to fetch schedules:", error);
    setSchedules([]);
  }
};





  const fetchProfilesByUser = async (userId) => {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        console.error("Invalid userId format:", userId);
        return;
      }
      const res = await axios.get(
        `http://localhost:9999/api/appointmentScheduleManagement/profiles/${userId}`
      );
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch profiles:", err);
      setProfiles([]);
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
const formatYYYYMMDD = (dateStr) => {
  const d = new Date(dateStr);
  const offset = d.getTimezoneOffset();
  const localDate = new Date(d.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 10); // yyyy-MM-dd
};


const validateForm = () => {
  const errors = {};
  if (!form.appointmentDate)
    errors.appointmentDate = "Please select an appointment date.";
  if (!form.department) errors.department = "Please select a department.";
  if (availableDoctors.length > 0 && !form.doctorId)
    errors.doctorId = "Please select a doctor.";
  if (form.doctorId && schedules.length > 0 && !form.timeSlot)
    errors.timeSlot = "Please select a time slot.";
  if (!form.identityNumber)
    errors.identityNumber = "Please enter identity number.";
  
  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};


  function handleAddNew() {
  setCurrentAppointment(null);
  setForm({
    appointmentDate: "",
    department: "",
    doctorId: "",
    timeSlot: "",
    type: "Offline",
    status: "Booked",
    reminderSent: false,
    identityNumber: "",
  });
  setAvailableDoctors([]);
  setSchedules([]);
  setFormErrors({});
  setDoctorSearchTerm("");
  setUserSearchTerm("");
  setShowModal(true);
}


function handleEdit(appointment) {
  setCurrentAppointment(appointment);
  setForm({
    appointmentDate: appointment.appointmentDate
      ? appointment.appointmentDate.slice(0, 10)
      : "",
    department: appointment.department || "",
    doctorId: appointment.doctorId || "",
    timeSlot: appointment.appointmentDate || "",
    type: appointment.type || "Offline",
    status: appointment.status || "Booked",
    reminderSent: appointment.reminderSent || false,
    identityNumber: "",
  });
  setFormErrors({});
  setDoctorSearchTerm("");
  setUserSearchTerm("");
  setShowModal(true);
}


  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }

function handleResetForm() {
  setForm({
    appointmentDate: "",
    department: "",
    doctorId: "",
    timeSlot: "",
    type: "Offline",
    status: "Booked",
    reminderSent: false,
    identityNumber: "",
  });
  setAvailableDoctors([]);
  setSchedules([]);
  setFormErrors({});
  setDoctorSearchTerm("");
  setUserSearchTerm("");
}


  function handleClearFilters() {
    setSearchTerm("");
    setStatusFilter("all");
    setDepartmentFilter("all");
    setStartDate("");
    setEndDate("");
    setCurrentPage(1);
  }

async function handleSubmit() {
  if (!validateForm()) return;

  //console.log("🧪 Time slot selected:", form.timeSlot);
  //console.log("🧪 Form date selected:", form.appointmentDate);
  //console.log("🧪 Schedule date available:", schedules);

  const selectedProfile = resolvedProfiles.find((p) => p._id === form.profileId);
  if (!selectedProfile) {
    message.error("Profile not resolved. Please check the identity number.");
    return;
  }

  try {
    setIsFormLoading(true);

    if (!form.timeSlot) {
      message.error("Time slot is missing.");
      return;
    }

    const selectedSlot = schedules.find(slot => slot.startTime === form.timeSlot);
    if (!selectedSlot) {
      message.error("Selected time slot not found in current schedule.");
      return;
    }

    // ✅ Ghép ngày hẹn với giờ từ timeSlot
    const appointmentDate = new Date(form.appointmentDate);
    const slotTime = new Date(selectedSlot.startTime);

    const combinedDate = new Date(appointmentDate);
    combinedDate.setHours(slotTime.getHours());
    combinedDate.setMinutes(slotTime.getMinutes());
    combinedDate.setSeconds(0);
    combinedDate.setMilliseconds(0);

const finalDate = combinedDate.toISOString(); 


    // ✅ Log thông tin trước khi submit
    //console.log("✅ Combined final appointmentDate =", finalDate);
    //console.log("form.department =", form.department);
    //console.log("form.doctorId =", form.doctorId);
    //console.log("form.profileId =", form.profileId);

    const payload = {
      appointmentDate: finalDate,
      department: form.department,
      doctorId: form.doctorId,
      type: form.type,
      status: form.status,
      reminderSent: form.reminderSent,
      profileId: selectedProfile._id,
      userId: selectedProfile.userId,
    };

    //console.log("📦 Payload to be submitted:", payload);

    if (currentAppointment) {
      await axios.put(
        `http://localhost:9999/api/appointmentScheduleManagement/${currentAppointment._id}`,
        payload
      );
      message.success("Appointment updated successfully!");
    } else {
      await axios.post(
        "http://localhost:9999/api/appointmentScheduleManagement",
        payload
      );
      message.success("Appointment created successfully!");
    }

    setShowModal(false);
    fetchAppointments();
  } catch (error) {
    console.error("❌ Error submitting appointment:", error);
    message.error("Error: " + (error.response?.data?.message || error.message));
  } finally {
    setIsFormLoading(false);
  }
}






  function handleDeleteClick(appointmentId) {
    setDeleteAppointmentId(appointmentId);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    try {
      await axios.delete(
        `http://localhost:9999/api/appointmentScheduleManagement/${deleteAppointmentId}`
      );
      setShowDeleteModal(false);
      setDeleteAppointmentId(null);
      fetchAppointments();
      message.success("Appointment deleted successfully!");
    } catch (error) {
      message.error(
        "Delete failed: " + (error.response?.data?.message || error.message)
      );
    }
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setDeleteAppointmentId(null);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredDoctors = availableDoctors.filter((doc) =>
    doc.name.toLowerCase().includes(doctorSearchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      (user.phone &&
        user.phone.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
      (user.user_code &&
        user.user_code.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4 text-primary fw-bold">
          Appointment Schedule Management
        </h2>

        <Row className="mb-4 align-items-end filter-card">
          <Col md={3} sm={12} className="mb-3">
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search by doctor, user, or status..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Search appointments"
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="Booked">Booked</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="Canceled">Canceled</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <Form.Group>
  <Form.Label>Department</Form.Label>
  <Form.Select
    value={departmentFilter}
    onChange={(e) => {
      setDepartmentFilter(e.target.value);
      setCurrentPage(1);
    }}
    aria-label="Filter by department"
  >
    <option value="all">Tất cả các khoa</option>
    {Array.isArray(departments) &&
      departments.map((dept) => (
        <option key={dept._id} value={dept._id}>
          {dept.name}
        </option>
      ))}
  </Form.Select>
</Form.Group>

          </Col>
          <Col md={2} sm={6} className="mb-3">
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by start date"
              />
            </Form.Group>
          </Col>
          <Col md={2} sm={6} className="mb-3">
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setCurrentPage(1);
                }}
                aria-label="Filter by end date"
              />
            </Form.Group>
          </Col>
          <Col md={1} sm={12} className="mb-3 text-md-end">
            <Button
              variant="outline-primary"
              onClick={handleClearFilters}
              className="w-100"
              aria-label="Clear filters"
            >
              Clear
            </Button>
          </Col>
        </Row>

        <div className="d-flex gap-2 mb-4">
  <Button
    variant="success"
    onClick={handleAddNew}
    aria-label="Add new appointment"
  >
    Add Appointment
  </Button>

  <Button
    variant="info"
    onClick={() => window.location.href = "http://localhost:5173/staff/medicalrecord"}
    aria-label="Add patient record"
  >
    Add Patient Record
  </Button>
</div>


        {loading ? (
          <div className="loading-container">
            <Spinner animation="border" variant="primary" role="status" />
            <p className="text-muted mt-2">Loading appointments...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <h5>{error}</h5>
            <Button
              variant="primary"
              onClick={() => fetchAppointments()}
              aria-label="Retry loading appointments"
            >
              Retry
            </Button>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <p className="text-muted text-center">No appointments found.</p>
        ) : (
          <>
            <div className="table-responsive">
  <Table striped hover>
    <thead className="table-dark">
      <tr>
        <th>No</th>
        <th>Appointment Date</th>
        <th>Doctor</th>
        <th>Department</th>
        <th>Type</th>
        <th>User</th>
        <th>Phone</th>
        <th>Patient Record</th>
        <th>Status</th>
        <th>Reminder</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredAppointments.map((appointment, index) => (
        <tr key={appointment._id}>
          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
          <td>{formatDateTime(appointment.appointmentDate)}</td>
          <td>{appointment.doctorName || "N/A"}</td>
          <td>
            {
              departments.find((d) => d._id.toString() === appointment.department?.toString())?.name ||
              "Unknown"
            }
          </td>
          <td>{appointment.type}</td>
          <td>{appointment.userName || "N/A"}</td>
          <td>{appointment.userPhone || "N/A"}</td>
          <td>
  {appointment.profileName ? (
    <Button
      variant="link"
      className="p-0 text-primary"
      style={{ textDecoration: "underline", cursor: "pointer" }}
      onClick={() => handleViewProfile(appointment.profileId?._id || appointment.profileId)}
    >
      {appointment.profileName}
    </Button>
  ) : (
    "N/A"
  )}
</td>

          <td>
  <span className={`badge-status status-${appointment.status.replace(" ", "-")}`}>
    {appointment.status}
  </span>
</td>

          <td>{appointment.reminderSent ? "Yes" : "No"}</td>
          <td>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleEdit(appointment)}
                title="Edit Appointment"
                aria-label="Edit appointment"
              >
                <FaEdit />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteClick(appointment._id)}
                title="Delete Appointment"
                aria-label="Delete appointment"
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
              <div className="text-muted">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
                {totalItems} appointments
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
                    aria-label={`Go to page ${page + 1}`}
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton className="bg-primary text-white">
    <Modal.Title>{currentAppointment ? "Edit Appointment" : "Add New Appointment"}</Modal.Title>
  </Modal.Header>
  <Modal.Body className="p-4 appointment-modal-body">
    <Form>
      {/* Appointment Info */}
      <h5 className="section-title">🗓 Appointment Info</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="appointmentDate">
            <Form.Label>
              Appointment Date <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="date"
              name="appointmentDate"
              value={form.appointmentDate}
              onChange={(e) => {
                const value = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  appointmentDate: value,
                  doctorId: "",
                  timeSlot: "",
                }));
                setAvailableDoctors([]);
                setSchedules([]);
              }}
            />
            {formErrors.appointmentDate && (
              <Form.Text className="text-danger">{formErrors.appointmentDate}</Form.Text>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="department">
            <Form.Label>
              Department <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              name="department"
              value={form.department}
              onChange={handleChange}
              disabled={!form.appointmentDate}
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </Form.Select>
            {formErrors.department && (
              <Form.Text className="text-danger">{formErrors.department}</Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <>
  <h6 className="text-muted mt-3">Available Doctors</h6>
  <Row>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="doctorId">
        <Form.Label>Doctor <span className="text-danger">*</span></Form.Label>
        <Form.Select
          name="doctorId"
          value={form.doctorId}
          onChange={handleChange}
        >
          <option value="">Select doctor</option>
          {availableDoctors.map((doc) => (
            <option key={doc._id} value={doc._id}>{doc.name}</option>
          ))}
        </Form.Select>
        {formErrors.doctorId && (
          <Form.Text className="text-danger">{formErrors.doctorId}</Form.Text>
        )}
        {availableDoctors.length === 0 && (
          <Form.Text className="text-muted">No doctors available</Form.Text>
        )}
      </Form.Group>
    </Col>
    <Col md={6}>
      <Form.Group className="mb-3" controlId="timeSlot">
        <Form.Label>Time Slot <span className="text-danger">*</span></Form.Label>
        <Form.Select
          name="timeSlot"
          value={form.timeSlot}
          onChange={handleChange}
        >
          <option value="">Select time slot</option>
          {schedules
            .filter(slot => slot.status === "Available")
            .map((slot, i) => (
              <option key={i} value={slot.startTime}>
                {new Date(slot.startTime).toLocaleTimeString("en-GB")} - {new Date(slot.endTime).toLocaleTimeString("en-GB")}
              </option>
            ))}
        </Form.Select>
        {formErrors.timeSlot && (
          <Form.Text className="text-danger">{formErrors.timeSlot}</Form.Text>
        )}
      </Form.Group>
    </Col>
  </Row>
</>


      <hr />

      {/* Patient Info */}
      <h5 className="section-title">🧍 Patient Info</h5>
      <Form.Group className="mb-3" controlId="identityNumber">
        <Form.Label>Identity Number <span className="text-danger">*</span></Form.Label>
        <InputGroup>
          <Form.Control
            type="text"
            name="identityNumber"
            placeholder="Enter identity number"
            value={form.identityNumber}
            onChange={(e) => {
              handleChange(e);
              setResolvedProfiles([]);
              setSelectedProfileId("");
            }}
          />
          <Button variant="outline-primary" onClick={() => fetchProfilesByIdentity(form.identityNumber)}>
            Search
          </Button>
        </InputGroup>
        <Form.Text className="text-muted">
          Search to select patient profile linked with identity number.
        </Form.Text>
        {formErrors.identityNumber && (
          <Form.Text className="text-danger">{formErrors.identityNumber}</Form.Text>
        )}
      </Form.Group>

      <Form.Group controlId="selectedProfile" className="mb-3">
  <Form.Label>Select Profile</Form.Label>
  <Form.Select
    value={selectedProfileId}
    onChange={(e) => setSelectedProfileId(e.target.value)}
    disabled={resolvedProfiles.length === 0}
  >
    <option value="">
      {resolvedProfiles.length === 0 ? "No profiles found" : "Select a profile"}
    </option>
    {resolvedProfiles.map((profile) => (
      <option key={profile._id} value={profile._id}>
        {profile.name} - {new Date(profile.dateOfBirth).toLocaleDateString()} ({profile.gender})
      </option>
    ))}
  </Form.Select>
  <Form.Text className="text-muted">
    Patient profile associated with identity number.
  </Form.Text>
</Form.Group>



      <hr />

      {/* Other Info */}
      <h5 className="section-title">📋 Additional Info</h5>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Select name="type" value={form.type} onChange={handleChange}>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={form.status} onChange={handleChange}>
              <option value="Booked">Booked</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Completed">Completed</option>
              <option value="Canceled">Canceled</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Form.Check
        className="mb-3"
        type="checkbox"
        label="Reminder Sent"
        name="reminderSent"
        checked={form.reminderSent}
        onChange={handleChange}
      />
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleResetForm}>
      <i className="bi bi-arrow-clockwise me-1" /> Reset
    </Button>
    <Button variant="danger" onClick={() => setShowModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSubmit} disabled={isFormLoading || !form.timeSlot}>
      {isFormLoading ? <Spinner size="sm" animation="border" className="me-2" /> : null}
      {currentAppointment ? "Save" : "Add"}
    </Button>
  </Modal.Footer>
</Modal>


      <Modal show={showDeleteModal} onHide={cancelDelete} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          Are you sure you want to delete this appointment?
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            variant="secondary"
            onClick={cancelDelete}
            aria-label="Cancel delete"
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDelete}
            aria-label="Confirm delete"
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
  show={openProfileDialog}
  onHide={() => setOpenProfileDialog(false)}
  centered
>
  <Modal.Header closeButton className="bg-info text-white">
    <Modal.Title>Patient Record Detail</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  {selectedProfile ? (
    <>
      <p><strong>Profile Name:</strong> {selectedProfile.name}</p>
      <p><strong>Identity Number:</strong> {selectedProfile.identityNumber}</p>
      <p><strong>Date of Birth:</strong> {new Date(selectedProfile.dateOfBirth).toLocaleDateString()}</p>
      <p><strong>Gender:</strong> {selectedProfile.gender}</p>
      <p><strong>Diagnosis:</strong> {selectedProfile.diagnose || "N/A"}</p>
      <p><strong>Note:</strong> {selectedProfile.note || "None"}</p>
      <p><strong>Issues:</strong> {selectedProfile.issues || "None"}</p>
      <p><strong>Doctor:</strong> {selectedProfile.doctorId?.name || "N/A"}</p>

      <p><strong>Medicine:</strong></p>
      <ul>
        {Array.isArray(selectedProfile.medicine) && selectedProfile.medicine.length > 0 ? (
          selectedProfile.medicine.map((m, i) => (
            <li key={i}>{m.name || m}</li> // nếu medicine là object thì lấy m.name, nếu là ObjectId thì hiện m
          ))
        ) : (
          <li>No medicine recorded</li>
        )}
      </ul>

      <p><strong>Service:</strong></p>
      <ul>
        {Array.isArray(selectedProfile.service) && selectedProfile.service.length > 0 ? (
          selectedProfile.service.map((s, i) => (
            <li key={i}>{s.name || s}</li>
          ))
        ) : (
          <li>No service recorded</li>
        )}
      </ul>
    </>
  ) : (
    <p className="text-muted">No profile data loaded.</p>
  )}
</Modal.Body>


  <Modal.Footer>
    <Button variant="secondary" onClick={() => setOpenProfileDialog(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </>
  );
};

export default AppointmentScheduleManagement;