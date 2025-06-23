import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import axios from 'axios';
import "flatpickr/dist/themes/material_green.css";
import "../assets/css/AppointmentPage.css";

// Hardcoded doctor data
const doctorData = [
  {
    id: "1",
    name: "Nguyễn Văn An",
    specialty: "Nội Tổng Quát",
    experienceYears: 10,
    profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
  },
  {
    id: "2",
    name: "Trần Thị Bình",
    specialty: "Nhi Khoa",
    experienceYears: 8,
    profileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
  {
    id: "3",
    name: "Lê Minh Châu",
    specialty: "Phụ Sản",
    experienceYears: 12,
    profileImage: "https://images.unsplash.com/photo-1598257006626-48b0c252070d",
  },
  {
    id: "4",
    name: "Phạm Quốc Đạt",
    specialty: "Ngoại Khoa",
    experienceYears: 15,
    profileImage: "https://images.unsplash.com/photo-1622253692010-333f2b7c2f96",
  },
];

const AppointmentPage = () => {
  const [step, setStep] = useState("doctor");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const serviceData = [
    { id: "service1", title: "Khám Nội Tổng Quát", price: "500.000 VNĐ" },
    { id: "service2", title: "Khám Nhi Khoa", price: "300.000 VNĐ" },
    { id: "service3", title: "Khám Phụ Sản", price: "400.000 VNĐ" },
    { id: "service4", title: "Chẩn Đoán Hình Ảnh", price: "700.000 VNĐ" },
  ];

  const timeSlots = [
    "08:00 Sáng", "09:00 Sáng", "10:00 Sáng", "11:00 Sáng", "12:00 Trưa",
    "01:00 Chiều", "02:00 Chiều", "03:00 Chiều", "04:00 Chiều"
  ];

  const paymentData = [
    { id: "pay1", name: "Thanh Toán Sau" },
    { id: "pay2", name: "Thanh Toán Trực Tuyến" },
    { id: "pay3", name: "Thẻ Tín Dụng" },
  ];

  const steps = [
    { id: "doctor", title: "Chọn Bác Sĩ", desc: "Lựa chọn bác sĩ" },
    { id: "service", title: "Chọn Dịch Vụ", desc: "Lựa chọn dịch vụ" },
    { id: "datetime", title: "Ngày và Giờ", desc: "Chọn thời gian" },
    { id: "payment", title: "Thanh Toán", desc: "Chọn phương thức thanh toán" },
    { id: "confirm", title: "Xác Nhận", desc: "Đặt lịch hoàn tất" },
  ];

  const renderStepContent = () => {
    switch (step) {
      case "doctor":
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Bác Sĩ</h3>
            <Row>
              {doctorData.length === 0 ? (
                <Col className="text-center">Không có bác sĩ nào hoạt động</Col>
              ) : (
                doctorData.map((doctor) => (
                  <Col key={doctor.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
                    <label
                      className={`doctor-card ${selectedDoctor === doctor.id ? 'selected' : ''}`}
                      onClick={() => setSelectedDoctor(doctor.id)}
                    >
                      <input type="radio" name="doctor" className="d-none" />
                      <div className="doctor-image-container">
                        {doctor.profileImage ? (
                          <img
                            src={doctor.profileImage}
                            alt={doctor.name}
                            className="doctor-image"
                          />
                        ) : (
                          <div
                            className="doctor-image"
                            style={{
                              backgroundColor: '#e0e0e0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '1.5rem',
                              color: '#6c757d'
                            }}
                          >
                            {doctor.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <h5 className="doctor-name">{doctor.name}</h5>
                      <p className="doctor-specialty">{doctor.specialty}</p>
                      <p className="doctor-experience">{doctor.experienceYears} năm kinh nghiệm</p>
                    </label>
                  </Col>
                ))
              )}
            </Row>
            <div className="text-end mt-4">
              <button
                className="btn btn-primary"
                onClick={() => setStep("service")}
                disabled={!selectedDoctor}
              >
                Tiếp Theo
              </button>
            </div>
          </div>
        );
      case "service":
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Dịch Vụ</h3>
            <Row>
              {serviceData.map((service) => (
                <Col key={service.id} md={6} className="mb-4">
                  <label
                    className={`border p-4 rounded text-center cursor-pointer hover:bg-light ${selectedDepartment === service.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedDepartment(service.id)}
                  >
                    <input type="radio" name="service" className="d-none" />
                    <h5 className="fw-semibold">{service.title}</h5>
                    <p className="text-muted small">{service.price}</p>
                  </label>
                </Col>
              ))}
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
                onClick={() => setStep("datetime")}
                disabled={!selectedDepartment}
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
                <div className="d-flex flex-wrap gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      className={`btn btn-outline-primary btn-sm ${selectedTime === time ? 'btn-primary text-white' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep("service")}
              >
                Quay Lại
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("payment")}
                disabled={!selectedDate || !selectedTime}
              >
                Tiếp Theo
              </button>
            </div>
          </div>
        );
      case "payment":
        return (
          <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="text-primary fw-bold mb-4">Chọn Phương Thức Thanh Toán</h3>
            <Row>
              <Col md={6}>
                <h5 className="text-muted mb-3">Chọn Thanh Toán</h5>
                {paymentData.map((payment) => (
                  <div
                    key={payment.id}
                    className={`border p-3 mb-2 rounded cursor-pointer hover:bg-light ${selectedPayment === payment.id ? 'border-primary' : ''}`}
                    onClick={() => setSelectedPayment(payment.id)}
                  >
                    <input type="radio" name="payment" className="me-2" />
                    {payment.name}
                  </div>
                ))}
              </Col>
              <Col md={6}>
                <h5 className="text-muted mb-3">Tóm Tắt Lịch Hẹn</h5>
                <div className="border p-3 rounded">
                  <p className="small">Bác Sĩ: {doctorData.find(d => d.id === selectedDoctor)?.name || "N/A"}</p>
                  <p className="small">Ngày: {selectedDate ? selectedDate.toLocaleDateString('vi-VN') : "N/A"}</p>
                  <p className="small">Giờ: {selectedTime}</p>
                  <div className="mt-3 p-3 bg-light rounded">
                    <h6 className="small fw-bold">Dịch Vụ</h6>
                    <div className="d-flex justify-content-between small">
                      <span>{serviceData.find(s => s.id === selectedDepartment)?.title}</span>
                      <span>{serviceData.find(s => s.id === selectedDepartment)?.price}</span>
                    </div>
                  </div>
                  <div className="mt-3 d-flex justify-content-between small">
                    <strong>Tổng Chi Phí</strong>
                    <strong className="text-primary">{serviceData.find(s => s.id === selectedDepartment)?.price}</strong>
                  </div>
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setStep("datetime")}
              >
                Quay Lại
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setStep("confirm")}
                disabled={!selectedPayment}
              >
                Xác Nhận
              </button>
            </div>
        </div>
      );
      case "confirm":
        return (
          <div className="p-4 bg-white rounded shadow-sm text-center">
            <svg className="checkmark-animated mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
            <h3 className="text-primary fw-bold mb-3">Đặt Lịch Hẹn Thành Công!</h3>
            <p className="text-muted small">Vui lòng kiểm tra email để xác nhận.</p>
            <div className="mt-4 d-flex justify-content-center gap-3">
              <button
                className="btn btn-primary"
                onClick={() => setStep("doctor")}
              >
                Đặt Thêm Lịch Hẹn
              </button>
              <button className="btn btn-outline-secondary">
                In Chi Tiết
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
              Giờ Mở Cửa: Thứ 2 - Thứ 7: 7:00 Sáng - 8:00 Tối, Chủ Nhật: 9:00 Sáng - 5:00 Chiều
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

      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d"
              className="d-block w-100"
              alt="KiwiCare Banner"
              style={{ objectFit: 'cover', height: '80vh', borderRadius: '8px' }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute',
                borderRadius: '8px'
              }}
            >
              <h1 className="display-3 fw-bold text-white mb-3">Đặt Lịch Hẹn Tại KiwiCare</h1>
              <p className="text-white fs-5">Dễ dàng đặt lịch với các bác sĩ chuyên khoa hàng đầu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <section className="mb-5">
          <Row className="align-items-start">
            <Col lg={3} className="mb-4 mb-lg-0">
              <div className="bg-primary text-white p-4 rounded shadow-sm sticky-top" style={{ top: '20px' }}>
                <ul className="list-unstyled">
                  {steps.map((s, index) => (
                    <li
                      key={s.id}
                      className={`d-flex align-items-center mb-3 ${step === s.id ? 'fw-bold' : ''}`}
                    >
                      <span
                        className={`d-inline-block rounded-circle text-center me-2 ${steps.findIndex(st => st.id === step) >= index ? 'bg-white text-primary' : 'bg-light text-white'}`}
                        style={{ width: '24px', height: '24px', lineHeight: '24px' }}
                      >
                        {steps.findIndex(st => st.id === step) >= index ? '✓' : '•'}
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
            <Col lg={9}>
              {renderStepContent()}
            </Col>
          </Row>
        </section>
      </div>
    </>
  );
};

export default AppointmentPage;