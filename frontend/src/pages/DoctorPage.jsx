import React, { useState } from "react";
import { Container, Row, Col, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../assets/css/DoctorPage.css";

// Hardcoded doctor data
const doctors = [
  {
    _id: "1",
    userId: { fullname: "Nguyễn Văn An" },
    ProfileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
    Specialty: "Nội Tổng Quát",
  },
  {
    _id: "2",
    userId: { fullname: "Trần Thị Bình" },
    ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    Specialty: "Nhi Khoa",
  },
  {
    _id: "3",
    userId: { fullname: "Lê Minh Châu" },
    ProfileImage: "https://images.unsplash.com/photo-1598257006626-48b0c252070d",
    Specialty: "Phụ Sản",
  },
  {
    _id: "4",
    userId: { fullname: "Phạm Quốc Đạt" },
    ProfileImage: "https://images.unsplash.com/photo-1622253692010-333f2b7c2f96",
    Specialty: "Ngoại Khoa",
  },
  {
    _id: "5",
    userId: { fullname: "Hoàng Thị Mai" },
    ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
    Specialty: "Chẩn Đoán Hình Ảnh",
  },
];

const DoctorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  // Extract unique specialties from hardcoded data
  const specialties = [...new Set(doctors.map(doctor => doctor.Specialty).filter(Boolean))];

  // Filter doctors based on search term and selected specialty
  const filteredDoctors = doctors.filter(doctor => {
    const fullName = doctor.userId ? doctor.userId.fullname.toLowerCase() : "";
    return (
      fullName.includes(searchTerm.toLowerCase()) &&
      (selectedSpecialty === "" || doctor.Specialty === selectedSpecialty)
    );
  });

  return (
    <>
      {/* Topbar */}
      <div className="bg-light py-2 px-5 d-none d-lg-block">
        <Row className="align-items-center justify-content-between">
          <Col md={6} className="text-start">
            <small>
              <i className="far fa-clock text-primary me-2"></i>
              Opening Hours: Mon - Sat : 7.00 am - 8.00 pm, Sunday 9.00 am - 5.00 pm
            </small>
          </Col>
          <Col md={6} className="text-end">
            <small className="me-4">
              <i className="fa fa-envelope-open text-primary me-2"></i>
              contact@kiwicare.com
            </small>
            <small>
              <i className="fa fa-phone-alt text-primary me-2"></i>
              +987 654 3210
            </small>
          </Col>
        </Row>
      </div>

      

      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://images.unsplash.com/photo-1579684453423-f84349ef60b0"
              className="d-block w-100"
              alt="KiwiCare Doctors Banner"
              style={{ objectFit: 'cover', height: '80vh' }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: 'absolute'
              }}
            >
              <div className="text-center text-white">
                <h1 className="display-3 fw-bold">Đội Ngũ Bác Sĩ KiwiCare</h1>
                <p className="lead mt-3">Những chuyên gia tận tâm vì sức khỏe của bạn</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container-fluid py-4">
        <Container>
          <Row className="g-3 align-items-center">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Tìm kiếm theo tên bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={6}>
              <Form.Select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                <option value="">Tất Cả Chuyên Khoa</option>
                {specialties.map((specialty, index) => (
                  <option key={index} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <div className="container-fluid py-5">
        <Container>
          <Row className="g-5">
            <Col lg={4} className="wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-light rounded h-100 p-5">
                <h5 className="text-primary text-uppercase position-relative d-inline-block">
                  Bác Sĩ KiwiCare
                  <span
                    className="position-absolute top-0 start-0 translate-middle-y bg-primary w-100"
                    style={{ height: "2px" }}
                  ></span>
                </h5>
                <h1 className="display-6 mb-4">Gặp Gỡ Đội Ngũ Bác Sĩ Chuyên Nghiệp</h1>
                <Link to="/appointment" className="btn py-3 px-4 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#005B99', color: 'white', borderRadius: '10px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <i className="bi bi-calendar3 me-2"></i>
                  ĐẶT LỊCH KHÁM NGAY!
                </Link>
              </div>
            </Col>

            {filteredDoctors.map((doctor, index) => (
              <Col
                lg={4}
                key={doctor._id}
                className="wow fadeInUp"
                data-wow-delay={`${(index % 3) * 0.3}s`}
              >
                <div className="team-item">
                  <div className="position-relative rounded-top">
                    <img
                      className="img-fluid rounded-top w-100"
                      src={doctor.ProfileImage}
                      alt={doctor.userId ? doctor.userId.fullname : 'Doctor'}
                    />
                  </div>
                  <div className="team-text position-relative bg-light text-center rounded-bottom p-4 pt-5">
                    <h4 className="mb-2">
                      {doctor.userId ? `Bác sĩ ${doctor.userId.fullname}` : 'Bác sĩ không rõ tên'}
                    </h4>
                    <p className="mb-2">
                      <strong>Chuyên ngành:</strong> {doctor.Specialty || 'Không rõ'}
                    </p>
                    <Link to={`/doctor/${doctor._id}`} className="btn btn-primary mt-2">
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      
    </>
  );
};

export default DoctorPage;