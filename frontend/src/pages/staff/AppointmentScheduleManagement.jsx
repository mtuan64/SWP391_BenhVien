import React, { useEffect, useState } from "react";
import { Table, Button, Container, Spinner, Modal, Form, InputGroup, FormControl, Pagination, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash, FaSearch, FaRedo } from "react-icons/fa";
import axios from "axios";
import "../../assets/css/AppointmentScheduleManagement.css";

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

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    appointmentDate: "",
    department: "",
    doctorId: "",
    timeSlot: "",
    type: "Offline",
    status: "Booked",
    reminderSent: false,
    userId: "",
    profileId: "",
  });
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
    fetchDepartments();
    fetchUsers();
  }, [currentPage, statusFilter, departmentFilter, searchTerm, startDate, endDate]);

  useEffect(() => {
    if (form.userId) {
      fetchProfilesByUser(form.userId);
    } else {
      setProfiles([]);
    }
  }, [form.userId]);

  useEffect(() => {
    if (form.appointmentDate && form.department) {
      fetchAvailableDoctors(form.appointmentDate, form.department);
    } else {
      setAvailableDoctors([]);
      setForm((prev) => ({ ...prev, doctorId: "", timeSlot: "" }));
      setSchedules([]);
    }
  }, [form.appointmentDate, form.department]);

  useEffect(() => {
    if (form.doctorId && form.appointmentDate) {
      fetchSchedules(form.doctorId, form.appointmentDate);
    } else {
      setSchedules([]);
      setForm((prev) => ({ ...prev, timeSlot: "" }));
    }
  }, [form.doctorId, form.appointmentDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const params = { page: currentPage, limit: itemsPerPage, search: searchTerm };
      if (statusFilter !== "all") params.status = statusFilter;
      if (departmentFilter !== "all") params.department = departmentFilter;
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement", { params });
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
const res = await axios.get("http://localhost:9999/api/departments");
setDepartments(res.data.departments || []);
    } catch (error) {
      console.error("Failed to fetch departments: ", error);
      setError("Failed to load departments.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load users.");
    }
  };

const fetchAvailableDoctors = async (date, departmentId) => {
  try {
    setIsFormLoading(true);

    const selectedDept = departments.find((d) => d._id === departmentId);
    if (!selectedDept) {
      console.warn("Department not found for ID:", departmentId);
      setAvailableDoctors([]);
      return;
    }

    const departmentName = selectedDept.name;
    const formattedDate = new Date(date).toISOString().split("T")[0];

    const res = await axios.get("http://localhost:9999/api/appointmentScheduleManagement/doctors", {
      params: { department: departmentName, date: formattedDate }
    });

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
      setIsFormLoading(true);
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/schedules/${doctorId}`, {
        params: { date: formattedDate }
      });
      setSchedules(res.data || []);
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
      setSchedules([]);
      setError("Failed to fetch schedules.");
    } finally {
      setIsFormLoading(false);
    }
  };

  const fetchProfilesByUser = async (userId) => {
    try {
      if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
        console.error("Invalid userId format:", userId);
        return;
      }
      const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/profiles/${userId}`);
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

  const validateForm = () => {
    const errors = {};
    if (!form.appointmentDate) errors.appointmentDate = "Please select an appointment date.";
    if (!form.department) errors.department = "Please select a department.";
    if (availableDoctors.length > 0 && !form.doctorId) errors.doctorId = "Please select a doctor.";
    if (form.doctorId && schedules.length > 0 && !form.timeSlot) errors.timeSlot = "Please select a time slot.";
    if (!form.userId) errors.userId = "Please select a user.";
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
      userId: "",
      profileId: "",
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
      appointmentDate: appointment.appointmentDate ? appointment.appointmentDate.slice(0, 10) : "",
      department: appointment.department || "",
      doctorId: appointment.doctorId || "",
      timeSlot: appointment.appointmentDate || "",
      type: appointment.type || "Offline",
      status: appointment.status || "Booked",
      reminderSent: appointment.reminderSent || false,
      userId: appointment.userId || "",
      profileId: appointment.profileId || "",
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
      userId: "",
      profileId: "",
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
    if (!validateForm()) {
      return;
    }
    try {
      setIsFormLoading(true);
      let payload = {
        ...form,
        appointmentDate: new Date(form.timeSlot).toISOString(),
      };
      if (!form.profileId || form.profileId === "") {
        console.warn("No profile selected, creating new");
        const selectedUser = users.find((u) => u._id === form.userId);
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
        payload.profileId = newProfile.data._id;
      }
      if (!payload.profileId) {
        alert("Cannot create appointment without a profileId.");
        return;
      }
      if (currentAppointment) {
        await axios.put(`http://localhost:9999/api/appointmentScheduleManagement/${currentAppointment._id}`, payload);
        alert("Appointment updated successfully!");
      } else {
        await axios.post("http://localhost:9999/api/appointmentScheduleManagement", payload);
        alert("Appointment created successfully!");
      }
      setShowModal(false);
      fetchAppointments();
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error creating/updating appointment: " + (error?.response?.data?.message || error.message));
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
      await axios.delete(`http://localhost:9999/api/appointmentScheduleManagement/${deleteAppointmentId}`);
      setShowDeleteModal(false);
      setDeleteAppointmentId(null);
      fetchAppointments();
      alert("Appointment deleted successfully!");
    } catch (error) {
      alert("Delete failed: " + (error.response?.data?.message || error.message));
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

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    (user.phone && user.phone.toLowerCase().includes(userSearchTerm.toLowerCase())) ||
    (user.user_code && user.user_code.toLowerCase().includes(userSearchTerm.toLowerCase()))
  );

  return (
    <>
      <Container className="py-5">
        <h2 className="mb-4 text-primary fw-bold">Appointment Schedule Management</h2>

        <Row className="mb-4 align-items-end filter-card">
          <Col md={3} sm={12} className="mb-3">
            <Form.Group>
              <Form.Label>Search</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  placeholder="Search by doctor, user, user code, department, or status..."
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
  <option value="all">All Departments</option>
  {Array.isArray(departments) &&
    departments.map((dept) => (
      <option key={dept._id} value={dept.name}>
        {String(dept.name)}
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

        <Button
          variant="success"
          className="mb-4"
          onClick={handleAddNew}
          aria-label="Add new appointment"
        >
          Add Appointment
        </Button>

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
                    <th className="user-code">User Code</th>
                    <th>Phone</th>
                    <th>Patient Profile</th>
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
                        {departments.find((d) => d._id === appointment.department)?.name || appointment.department}
                      </td>
                      <td>{appointment.type}</td>
                      <td>{appointment.userName || "N/A"}</td>
                      <td className="user-code">{appointment.userCode || "N/A"}</td>
                      <td>{appointment.userPhone || "N/A"}</td>
                      <td>{!appointment.profileId || appointment.profileId === "null" ? "N/A" : appointment.profileId}</td>
                      <td>{appointment.status}</td>
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
                {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} appointments
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
          <Modal.Title>{currentAppointment ? "Update Appointment" : "Add New Appointment"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <div className="mb-4">
              <h5 className="fw-bold text-primary mb-3">Appointment Details</h5>
              <Form.Group className="mb-3" controlId="appointmentDate">
                <Form.Label className="fw-medium">
                  Appointment Date <span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="appointmentDate"
                  value={form.appointmentDate ? form.appointmentDate.split("T")[0] : ""}
                  onChange={handleChange}
                  required
                  className={formErrors.appointmentDate ? "border-danger" : ""}
                  aria-label="Select appointment date"
                />
                {formErrors.appointmentDate && (
                  <div className="text-danger small mt-1">{formErrors.appointmentDate}</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="department">
                <Form.Label className="fw-medium">
                  Department <span className="text-danger">*</span>
                </Form.Label>
<Form.Select
  name="department"
  value={form.department}
  onChange={handleChange}
  required
  disabled={!form.appointmentDate}
  className={formErrors.department ? "border-danger" : ""}
  aria-label="Select department"
>
  <option value="">Select department</option>
  {Array.isArray(departments) &&
    departments.map((dept) => (
      <option key={dept._id} value={dept._id}>
        {dept.name}
      </option>
    ))}
</Form.Select>

                {formErrors.department && (
                  <div className="text-danger small mt-1">{formErrors.department}</div>
                )}
              </Form.Group>

              {isFormLoading && (
                <div className="text-center mb-3">
                  <Spinner animation="border" size="sm" variant="primary" />
                  <span className="ms-2 text-muted">Loading...</span>
                </div>
              )}

              {availableDoctors.length > 0 ? (
                <>
                  <Form.Group className="mb-3" controlId="doctorSearch">
                    <Form.Label className="fw-medium">Search Doctor</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <FormControl
                        placeholder="Search by doctor name..."
                        value={doctorSearchTerm}
                        onChange={(e) => setDoctorSearchTerm(e.target.value)}
                        aria-label="Search doctors"
                      />
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="doctorId">
                    <Form.Label className="fw-medium">
                      Doctor <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="doctorId"
                      value={form.doctorId}
                      onChange={handleChange}
                      required
                      className={formErrors.doctorId ? "border-danger" : ""}
                      aria-label="Select doctor"
                    >
                      <option value="">Select doctor</option>
                      {filteredDoctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          {doc.name}
                        </option>
                      ))}
                    </Form.Select>
                    {formErrors.doctorId && (
                      <div className="text-danger small mt-1">{formErrors.doctorId}</div>
                    )}
                    {doctorSearchTerm && filteredDoctors.length === 0 && (
                      <div className="text-muted small mt-1">No doctors found matching your search.</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="timeSlot">
                    <Form.Label className="fw-medium">
                      Time Slot <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      name="timeSlot"
                      value={form.timeSlot}
                      onChange={handleChange}
                      required
                      disabled={!form.doctorId || schedules.length === 0}
                      className={formErrors.timeSlot ? "border-danger" : ""}
                      aria-label="Select time slot"
                    >
                      <option value="">Select a time slot</option>
                      {schedules.map((s) =>
                        s.timeSlots
                          .filter((slot) => slot.status === "Available")
                          .map((slot, i) => (
                            <option key={i} value={slot.startTime}>
                              {new Date(slot.startTime).toLocaleTimeString("en-GB")} -{" "}
                              {new Date(slot.endTime).toLocaleTimeString("en-GB")}
                            </option>
                          ))
                      )}
                    </Form.Select>
                    {formErrors.timeSlot && (
                      <div className="text-danger small mt-1">{formErrors.timeSlot}</div>
                    )}
                    {form.doctorId && schedules.length === 0 && (
                      <div className="text-muted small mt-1">
                        No available time slots for this doctor.
                      </div>
                    )}
                  </Form.Group>
                </>
              ) : form.appointmentDate && form.department ? (
                <div className="text-danger small mb-3">
                  No doctors available for this department on the selected date.
                </div>
              ) : null}
            </div>

            <hr />

            <div className="mb-4">
              <h5 className="fw-bold text-primary mb-3">User Details</h5>
              <Form.Group className="mb-3" controlId="userSearch">
                <Form.Label className="fw-medium">Search User</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl
                    placeholder="Search by user name, phone, or user code..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    aria-label="Search users"
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="userId">
                <Form.Label className="fw-medium">
                  User <span className="text-danger">*</span>
                </Form.Label>
                <Form.Select
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  required
                  className={formErrors.userId ? "border-danger" : ""}
                  aria-label="Select user"
                >
                  <option value="">Select user</option>
                  {filteredUsers.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name} ({user.phone || "N/A"}) - {user.user_code || "N/A"}
                    </option>
                  ))}
                </Form.Select>
                {formErrors.userId && (
                  <div className="text-danger small mt-1">{formErrors.userId}</div>
                )}
                {userSearchTerm && filteredUsers.length === 0 && (
                  <div className="text-muted small mt-1">No users found matching your search.</div>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="profileId">
                <Form.Label className="fw-medium">Patient Profile</Form.Label>
                <Form.Select
                  name="profileId"
                  value={form.profileId}
                  onChange={handleChange}
                  aria-label="Select patient profile"
                >
                  <option value="">-- No profile (create new) --</option>
                  {profiles.map((profile) => (
                    <option key={profile._id} value={profile._id}>
                      {profile.fullName || profile._id}
                    </option>
                  ))}
                </Form.Select>
                <div className="text-muted small mt-1">
                  Leave blank to create a new profile for the user.
                </div>
              </Form.Group>
            </div>

            <hr />

            <div>
              <h5 className="fw-bold text-primary mb-3">Additional Details</h5>
              <Form.Group className="mb-3" controlId="type">
                <Form.Label className="fw-medium">Type</Form.Label>
                <Form.Select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  aria-label="Select appointment type"
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="status">
                <Form.Label className="fw-medium">Status</Form.Label>
                <Form.Select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  aria-label="Select appointment status"
                >
                  <option value="Booked">Booked</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="reminderSent">
                <Form.Check
                  type="checkbox"
                  label="Reminder Sent"
                  name="reminderSent"
                  checked={form.reminderSent}
                  onChange={handleChange}
                  aria-label="Toggle reminder sent"
                />
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer className="border-top-0">
          <Button
            variant="secondary"
            onClick={handleResetForm}
            aria-label="Reset form"
          >
            <FaRedo className="me-1" /> Reset
          </Button>
          <Button
            variant="danger"
            onClick={() => setShowModal(false)}
            aria-label="Cancel"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={isFormLoading || !form.timeSlot}
            aria-label={currentAppointment ? "Save appointment" : "Add appointment"}
          >
            {isFormLoading ? <Spinner animation="border" size="sm" className="me-2" /> : null}
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

    </>
  );
};

export default AppointmentScheduleManagement;