import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import "../assets/css/AppointmentPage.css";
import axios from "axios";
import { useAuth } from "../context/authContext";

const AppointmentPage = () => {
  const { token } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileName, setProfileName] = useState("");
  const [profileGender, setProfileGender] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileIdentityNumber, setProfileIdentityNumber] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [step, setStep] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const steps = [
    { id: "profile", title: "Chọn hồ sơ", desc: "" },
    { id: "department", title: "Chọn khoa", desc: "" },
    { id: "doctor", title: "Chọn bác sĩ", desc: "" },
    { id: "datetime", title: "Chọn ngày giờ", desc: "" },
    { id: "confirm", title: "Xác nhận", desc: "" },
  ];

  // useEffect(() => {
  //   const fetchProfiles = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:9999/api/profile/user", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setProfiles(res.data);
  //     } catch (err) {
  //       console.error("Error fetching profiles:", err);
  //     }
  //   };
  //   fetchProfiles();
  // }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/doctor/doctor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get("http://localhost:9999/api/departments", {
          params: {
            page: 1,
            limit: 50, // lấy đủ hết các khoa 
            search: "",
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const departments = res.data.departments.map(dep => ({
          id: dep._id,
          name: dep.name,
          description: dep.description,
        }));

        setDepartmentData(departments);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleCreateProfile = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:9999/api/profile/create", {
        name: profileName,
        gender: profileGender,
        identityNumber: profileIdentityNumber,
        dateOfBirth: profileDateOfBirth,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Profile created:", res.data);
      // setSelectedProfile(res._id);
      // const updated = await axios.get("http://localhost:9999/api/profile/user", {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      // setProfiles(updated.data);

      setSuccess(true);
      setStep("department");
    } catch (err) {
      console.error("Error creating profile:", err);
      setError("Tạo hồ sơ thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAppointment = async () => {
    setLoading(true);
    setError(null);
    try {
      const appointmentDate = buildAppointmentDate(selectedDate, selectedTime);
      const res = await axios.post("http://localhost:9999/api/user/create", {
        profileId: selectedProfile,
        doctorId: selectedDoctor,
        department: selectedDepartment,
        appointmentDate,
        type: "Offline",
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Appointment created:", res.data);
      setSuccess(true);
      setStep("confirm");
    } catch (err) {
      console.error("Error creating appointment:", err);
      setError("Đặt lịch thất bại.");
    } finally {
      setLoading(false);
    }
  };

  // Thêm useEffect để fetch time slots khi có doctor và date
  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
      if (!selectedDoctor || !selectedDate || !token) return;  // Thêm check token để tránh call nếu unauth.

      try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD

        const res = await axios.get(`http://localhost:9999/api/appointmentScheduleManagement/schedules/${selectedDoctor}`, {  // Sửa path: Dùng template để inject doctorId vào path.
          params: {  // Chỉ giữ date, vì doctorId giờ là path param.
            date: formattedDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Giả sử res.data là array schedules (từ getDoctorSchedules) – filter available slots
        const availableSlots = res.data.flatMap(schedule =>
          schedule.timeSlots
            .filter(slot => slot.status === 'Available')
            .map(slot => ({ startTime: slot.startTime, endTime: slot.endTime }))
        );
        setAvailableTimeSlots(availableSlots);  // Set state với slots filtered.

      } catch (err) {
        console.error("Error fetching time slots:", err);
        if (err.response?.status === 401) {
          // Handle unauthorized (token invalid) – ví dụ redirect login.
          // setError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại.");
        } else if (err.response?.status === 404) {
          // setError("Không có lịch cho bác sĩ này.");
        }
        setAvailableTimeSlots([]); // Reset nếu lỗi
      }
    };
    fetchAvailableTimeSlots();
  }, [selectedDoctor, selectedDate, token]);

  // Hàm format time từ Date thành "HH:MM Sáng/Chiều"
  const formatTimeSlot = (startTime) => {
    const date = new Date(startTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours < 12 ? 'Sáng' : 'Chiều';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0'); // 12-hour format
    return `${formattedHours}:${minutes} ${period}`;
  };

  // Cập nhật buildAppointmentDate để dùng startTime từ slot
  const buildAppointmentDate = (selectedDate, selectedTime) => {
    if (!selectedDate || !selectedTime) return null;

    // selectedTime giờ là startTime Date object từ DB
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
    return appointmentDate;
  };

  const renderStepContent = () => {
    switch (step) {
      case "profile":
        if (profiles.length === 0) {
          return (
            <div className="p-4 bg-white rounded shadow-sm">
              <h3 className="text-primary fw-bold mb-4">Tạo Hồ Sơ Mới</h3>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && (
                <div className="alert alert-success">Tạo hồ sơ thành công!</div>
              )}

              <div className="mb-3">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Nhập Họ và Tên"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Giới tính</label>
                <select
                  className="form-select"
                  value={profileGender}
                  onChange={(e) => setProfileGender(e.target.value)}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">CMND/CCCD</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileIdentityNumber}
                  onChange={(e) => setProfileIdentityNumber(e.target.value)}
                  maxLength={12}
                  placeholder="Nhập số CMND hoặc CCCD"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Ngày sinh</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="form-control"
                  value={profileDateOfBirth}
                  onChange={(e) => setProfileDateOfBirth(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="text-end mt-4">
                <button
                  className="btn btn-primary"
                  onClick={handleCreateProfile}
                  disabled={
                    loading ||
                    !profileName ||
                    !profileGender ||
                    !profileIdentityNumber ||
                    !profileDateOfBirth
                  }
                >
                  {loading ? "Đang tạo..." : "Tạo hồ sơ"}
                </button>
              </div>
            </div>
          );
        }
      // return (
      //   <div className="p-4 bg-white rounded shadow-sm">
      //     <h3 className="text-primary fw-bold mb-4">Chọn Hồ Sơ</h3>
      //     <Row>
      //       {profiles.map((profile) => (
      //         <Col key={profile._id} md={6} className="mb-4">
      //           <label
      //             className={`border p-4 rounded text-center cursor-pointer hover:bg-light ${selectedProfile === profile._id ? "border-primary" : ""
      //               }`}
      //             onClick={() => setSelectedProfile(profile._id)}
      //           >
      //             <input type="radio" name="profile" className="d-none" />
      //             <h5 className="fw-semibold">{profile.name}</h5>
      //             <p className="text-muted small">
      //               {profile.gender} -{" "}
      //               {new Date(profile.dateOfBirth).toLocaleDateString()}
      //             </p>
      //           </label>
      //         </Col>
      //       ))}
      //     </Row>
      //     <div className="text-end mt-4">
      //       <button
      //         className="btn btn-primary"
      //         onClick={() => setStep("department")}
      //         disabled={!selectedProfile}
      //       >
      //         Tiếp Theo
      //       </button>
      //     </div>
      //   </div>
      // );

      case "department":
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Chuyên Khoa</h3>
            <Row>
              {departmentData.map((dep) => (
                <Col key={dep.id} md={6} className="mb-4">
                  <label
                    className={`border p-4 rounded text-center cursor-pointer hover:bg-light ${selectedDepartment === dep.id ? "border-primary" : ""
                      }`}
                    onClick={() => setSelectedDepartment(dep.id)}
                  >
                    <input type="radio" name="department" className="d-none" />
                    <h5 className="fw-semibold">{dep.name}</h5>
                    {dep.description && (
                      <p className="text-muted small mb-0">{dep.description}</p>
                    )}
                  </label>
                </Col>
              ))}
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep("profile")}
              >
                Quay Lại
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("doctor")}
                disabled={!selectedDepartment}
              >
                Tiếp Theo
              </button>
            </div>
          </div>
        );

      case "doctor":
        const filteredDoctors = doctors.filter(
          (d) => d.department?.includes(selectedDepartment) ?? false
        );
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Bác Sĩ</h3>
            <Row>
              {filteredDoctors.length === 0 ? (
                <Col className="text-center">
                  Không có bác sĩ trong chuyên khoa này
                </Col>
              ) : (
                filteredDoctors.map((doctor) => (
                  <Col
                    key={doctor._id}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    className="mb-4"
                  >
                    <label
                      className={`doctor-card ${selectedDoctor === doctor._id ? "selected" : ""
                        }`}
                      onClick={() => setSelectedDoctor(doctor._id)}
                    >
                      <input type="radio" name="doctor" className="d-none" />
                      <div className="doctor-image-container">
                        {doctor.avatar ? (
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="doctor-image"
                          />
                        ) : (
                          <div className="doctor-image bg-light d-flex align-items-center justify-content-center">
                            {doctor.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h5 className="doctor-name">{doctor.name}</h5>
                      <p className="doctor-experience">
                        {doctor.expYear} năm kinh nghiệm
                      </p>
                    </label>
                  </Col>
                ))
              )}
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep("department")}
              >
                Quay Lại
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("datetime")}
                disabled={!selectedDoctor}
              >
                Tiếp Theo
              </button>
            </div>
          </div>
        );

      case "datetime":
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Ngày và Giờ</h3>
            <Row>
              <Col md={6} className="mb-4">
                <Flatpickr
                  options={{ inline: true, minDate: "today" }}
                  onChange={(date) => setSelectedDate(date[0])}
                  className="w-100"
                />
              </Col>
              <Col md={6}>
                {availableTimeSlots.length === 0 ? (
                  <p className="text-muted">Không có slot available cho ngày này.</p>
                ) : (
                  <div className="d-flex flex-wrap gap-2">
                    {availableTimeSlots.map((slot, index) => {
                      const formatted = formatTimeSlot(slot.startTime);
                      return (
                        <button
                          key={index}
                          className={`btn btn-outline-primary btn-sm ${selectedTime?.toISOString() === slot.startTime.toISOString() ? "btn-primary text-white" : ""}`}
                          onClick={() => setSelectedTime(slot.startTime)} // Lưu Date object
                        >
                          {formatted}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep("doctor")}
              >
                Quay Lại
              </button>
              <button
                className="btn btn-primary"
                onClick={handleCreateAppointment}
                disabled={loading || !selectedTime}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Đang đặt lịch...
                  </>
                ) : (
                  "Đặt Lịch"
                )}
              </button>
            </div>
          </div>
        );

      case "confirm":
        return (
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <svg
              className="checkmark-animated mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <h3 className="text-primary fw-bold mb-3">
              Đặt Lịch Hẹn Thành Công!
            </h3>
            <p className="text-muted small">Cảm ơn bạn đã sử dụng dịch vụ.</p>
            <div className="mt-4 d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary"
                onClick={() => setStep("profile")}
              >
                Đặt Thêm Lịch
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={() => navigate("/appointmentmanage")}
              >
                Quản lý Lịch
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="bg-light py-3 px-5 d-none d-lg-block border-bottom shadow-sm">
        <Row className="align-items-center justify-content-between">
          <Col md={6} className="text-start">
            <small className="text-muted">
              <i className="far fa-clock text-primary me-2"></i>
              Giờ Mở Cửa: Thứ 2 - Thứ 7: 7:00 Sáng - 8:00 Tối, Chủ Nhật: 9:00
              Sáng - 5:00 Chiều
            </small>
          </Col>
          <Col md={6} className="text-end">
            <small className="text-muted me-4">
              <i className="fa fa-envelope-open text-primary me-2"></i>
              contact@kiwicare.com
            </small>
            <small className="text-muted">
              <i className="fa fa-phone-alt text-primary me-2"></i>
              +987 654 3210
            </small>
          </Col>
        </Row>
      </div>

      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
              className="d-block w-100"
              alt="KiwiCare Banner"
              style={{
                objectFit: "cover",
                height: "80vh",
                borderRadius: "8px",
              }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
                borderRadius: "8px",
              }}
            >
              <h1 className="display-3 fw-bold text-white mb-3">
                Đặt Lịch Hẹn Tại KiwiCare
              </h1>
              <p className="text-white fs-5">
                Dễ dàng đặt lịch với các bác sĩ chuyên khoa hàng đầu
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <section className="mb-5">
          <Row className="align-items-start">
            <Col lg={3} className="mb-4 mb-lg-0">
              <div
                className="bg-primary text-white p-4 rounded shadow-sm sticky-top"
                style={{ top: "20px" }}
              >
                <ul className="list-unstyled">
                  {steps.map((s, index) => (
                    <li
                      key={s.id}
                      className={`d-flex align-items-center mb-3 ${step === s.id ? "fw-bold" : ""
                        }`}
                    >
                      <span
                        className={`d-inline-block rounded-circle text-center me-2 ${steps.findIndex((st) => st.id === step) >= index
                          ? "bg-white text-primary"
                          : "bg-light text-white"
                          }`}
                        style={{
                          width: "24px",
                          height: "24px",
                          lineHeight: "24px",
                        }}
                      >
                        {steps.findIndex((st) => st.id === step) >= index
                          ? "✓"
                          : "•"}
                      </span>
                      <div>
                        <div className="small fw-semibold">{s.title}</div>
                        <div className="small text-light">{s.desc}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
            <Col lg={9}>{renderStepContent()}</Col>
          </Row>
        </section>
      </div>
    </>
  );
};
export default AppointmentPage;