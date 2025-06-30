import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../assets/css/DepartmentPage.css";
import HeroBanner from "../components/HeroBanner";

const DEPT_BANNER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=1600&q=80";

const DepartmentBox = ({ name, description, image, buttonUrl }) => (
  <div className="departmentbox">
    <div className="departmentbox-content">
      <div className="departmentbox-image-container">
        <img
          src={image}
          alt={name}
          className="departmentbox-image"
        />
      </div>
      <h3 className="departmentbox-title">{name}</h3>
      <p className="departmentbox-desc">{description}</p>
      <Link to={buttonUrl} className="departmentbox-button">Xem chi tiết</Link>
    </div>
  </div>
);

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/user/department`);
        console.log("API Response:", res.data);
        if (Array.isArray(res.data.data)) {
          setDepartments(res.data.data);
        } else if (Array.isArray(res.data.departments)) {
          setDepartments(res.data.departments);
        } else {
          setDepartments([]);
        }
      } catch (error) {
        setDepartments([]);
        console.error("Error fetching doctor details:", error);
      }
    };
    fetchDepartments();
    window.scrollTo(0, 0);
  }, []);

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
      <Fragment>
        <HeroBanner
          image={DEPT_BANNER}
          title="Chuyên Khoa Bệnh Viện"
          subtitle="Danh sách các chuyên khoa – phòng ban – đội ngũ chuyên gia hàng đầu"
        />
        <div className="department-section">
          <div className="department-container">
            <div className="department-header">
              <h2 className="department-header-title">Chuyên Khoa Bệnh Viện</h2>
              <p className="department-header-desc">
                Danh sách các chuyên khoa, phòng ban hàng đầu tại bệnh viện
              </p>
            </div>
            <div className="department-grid">
              {departments.map((item, index) => (
                <div key={item._id || index} className="department-grid-item">
                  <DepartmentBox
                    name={item.name}
                    description={item.description}
                    image={item.image}
                    buttonUrl={`/department/${item._id}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default DepartmentPage;
