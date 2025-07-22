import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  InfoCircleOutlined,
  BookOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <footer className="bg-dark text-light pt-5">
      <Container>
        <Row className="pt-4">
          <Col lg={3} md={6} className="mb-4" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <h5 className="text-white mb-4">Giới Thiệu Về Kiwicare</h5>
            <p className="text-light">
              Kiwicare là phòng khám đa khoa hàng đầu, cung cấp dịch vụ y tế toàn diện với công nghệ hiện đại và đội ngũ bác sĩ chuyên môn cao. Chúng tôi cam kết mang đến sự chăm sóc sức khỏe tận tâm và chất lượng cho mọi bệnh nhân.
            </p>
          </Col>
          <Col lg={3} md={6} className="mb-4" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <h5 className="text-white mb-4">Liên Kết Phổ Biến</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light d-flex align-items-center">
                  <HomeOutlined className="me-2" />
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light d-flex align-items-center">
                  <InfoCircleOutlined className="me-2" />
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-light d-flex align-items-center">
                  <BookOutlined className="me-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-light d-flex align-items-center">
                  <MedicineBoxOutlined className="me-2" />
                  Dịch Vụ
                </Link>
              </li>
              <li>
                <Link to="/doctors" className="text-light d-flex align-items-center">
                  <TeamOutlined className="me-2" />
                  Bác Sĩ
                </Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <h5 className="text-white mb-4">Dịch Vụ Của Chúng Tôi</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/services" className="text-light">Khám Sức Khỏe Tổng Quát</Link>
              </li>
              <li>
                <Link to="/services" className="text-light">Nội Khoa</Link>
              </li>
              <li>
                <Link to="/services" className="text-light">Ngoại Khoa</Link>
              </li>
              <li>
                <Link to="/services" className="text-light">Sản Phụ Khoa</Link>
              </li>
              <li>
                <Link to="/services" className="text-light">Nhi Khoa</Link>
              </li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4" style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <h5 className="text-white mb-4">Liên Hệ Với Chúng Tôi</h5>
            <p className="text-light">
              <EnvironmentOutlined className="text-primary me-2" />
              Cầu Giấy, Hà Nội, Việt Nam
            </p>
            <p className="text-light">
              <MailOutlined className="text-primary me-2" />
              contact@kiwicare.com
            </p>
            <p className="text-light">
              <PhoneOutlined className="text-primary me-2" />
              +098 765 4321
            </p>
            <h6 className="text-white mt-4">Theo Dõi Chúng Tôi</h6>
            <div className="d-flex">
              <a
                className="btn btn-primary btn-lg-square rounded me-2"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterOutlined />
              </a>
              <a
                className="btn btn-primary btn-lg-square rounded me-2"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined />
              </a>
              <a
                className="btn btn-primary btn-lg-square rounded me-2"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined />
              </a>
              <a
                className="btn btn-primary btn-lg-square rounded"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined />
              </a>
            </div>
          </Col>
        </Row>
        <div className="text-center py-3 border-top border-light mt-4">
          <p className="mb-0">
            © <span className="text-white">Kiwicare</span>. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default FooterComponent;