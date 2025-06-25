import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import FooterComponent from "../components/FooterComponent";
import axios from "axios";
import "../assets/css/Homepage.css";

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        console.log(`Fetching doctor with ID: ${doctorId}`);
        const res = await axios.get(`http://localhost:9999/api/user/doctr/${doctorId}`);
        console.log("API Response:", res.data);
        if (res.data.doctor) {
          setDoctor(res.data.doctor);
        } else if (res.data) {
          setDoctor(res.data);
        } else {
          throw new Error("Invalid response format");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setError("Failed to load doctor details. Please check the console for more details.");
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

//   const doctors = [
//   {
//     _id: "1",
//     userId: { fullname: "Nguyễn Văn An" },
//     ProfileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
//     Specialty: "Nội Tổng Quát",
//   },
//   {
//     _id: "2",
//     userId: { fullname: "Trần Thị Bình" },
//     ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
//     Specialty: "Nhi Khoa",
//   },
//   {
//     _id: "3",
//     userId: { fullname: "Lê Minh Châu" },
//     ProfileImage: "https://images.unsplash.com/photo-1598257006626-48b0c252070d",
//     Specialty: "Phụ Sản",
//   },
//   {
//     _id: "4",
//     userId: { fullname: "Phạm Quốc Đạt" },
//     ProfileImage: "https://images.unsplash.com/photo-1622253692010-333f2b7c2f96",
//     Specialty: "Ngoại Khoa",
//   },
//   {
//     _id: "5",
//     userId: { fullname: "Hoàng Thị Mai" },
//     ProfileImage: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
//     Specialty: "Chẩn Đoán Hình Ảnh",
//   },
// ];

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         console.log(`Fetching doctor with ID: ${doctorId}`);
//         const doctor1 = doctors.find(dt => dt._id == doctorId);
//         setDoctor(doctor1);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching doctor details:", error);
//         setError("Failed to load doctor details. Please check the console for more details.");
//         setLoading(false);
//       }
//     };

//     fetchDoctor();
//     console.log(JSON.stringify(doctor));
//   }, [doctorId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h3>{error}</h3>
        <Link to="/doctor" className="btn btn-primary mt-3">Back to Team</Link>
      </div>
    );
  }

  return (
    <>
      {/* Topbar */}
      <div className="bg-light py-2 px-5 d-none d-lg-block">
        <Row className="align-items-center justify-content-between">
          <Col md={6} className="text-start">
            <small>
              <i className="far fa-clock text-primary me-2"></i>
              Opening Hours: Mon - Tues : 6.00 am - 10.00 pm, Sunday Closed
            </small>
          </Col>
          <Col md={6} className="text-end">
            <small className="me-4">
              <i className="fa fa-envelope-open text-primary me-2"></i>
              info@example.com
            </small>
            <small>
              <i className="fa fa-phone-alt text-primary me-2"></i>
              +012 345 6789
            </small>
          </Col>
        </Row>
      </div>



      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://toplist.vn/images/800px/nha-khoa-lac-viet-intech-926275.jpg"
              className="d-block w-100"
              alt="Dentist Banner"
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
                <h1 className="display-3 fw-bold">Our Dentists</h1>
                <p className="lead mt-3">Trusted professionals for your perfect smile</p>
                <a href="#services" className="btn btn-outline-light btn-lg mt-4">Explore Services</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctor Details Section */}
      <div className="container-fluid py-5">
        <Container>
          <Row className="g-5">
            <Col lg={6} className="wow fadeInUp" data-wow-delay="0.1s">
              <div className="bg-light rounded p-5 h-100 d-flex align-items-center justify-content-center">
                <img
                  className="img-fluid rounded"
                  src={doctor.avatar}
                  alt={doctor.degree}
                  style={{ maxHeight: "100%", width: "100%", objectFit: "cover" }}
                />
              </div>
            </Col>
            <Col lg={6} className="wow fadeInUp" data-wow-delay="0.3s">
              <div className="bg-light rounded p-5 h-100">
                <h2 className="mb-4">Doctor Details</h2>
                <p><strong>Name:</strong> {doctor.name}</p>
                <p><strong>Specialty:</strong> {doctor.specialization}</p>
                <p><strong>Degree:</strong> {doctor.degree}</p>
                <p><strong>Experience Years:</strong> {doctor.expYear}</p>
                <p><strong>Description:</strong> {doctor.description}</p>
                <p><strong>Status:</strong> {doctor.status}</p>
                <Link to="/doctr" className="btn btn-secondary mt-3">Back to Team</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <FooterComponent />
    </>
  );
};

export default DoctorDetail;