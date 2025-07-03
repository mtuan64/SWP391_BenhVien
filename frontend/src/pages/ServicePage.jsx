import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../assets/css/ServicePage.css';
import HeroBanner from "../components/HeroBanner";
import TopBarComponent from '../components/TopBarComponent';

const DEPT_BANNER = "https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/13/bv-1705119640880430272769.jpg";

const ServiceBox = ({ image, title, description, buttonUrl }) => (
  <div className="servicebox">
    <div className="servicebox-content">
      <div className="servicebox-image-container">
        <img
          src={image}
          alt={title}
          className="servicebox-image"
        />
      </div>
      <h3 className="servicebox-title">{title}</h3>
      <p className="servicebox-desc">{description}</p>
      <Link
        to={buttonUrl}
        className="servicebox-button"
      >
        Tìm Hiểu Thêm
      </Link>
    </div>
  </div>
);


const ServicePage = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`/api/user/service`);
        console.log("API Response:", res.data);
        if (Array.isArray(res.data.data)) {
          setServices(res.data.data);
        } else if (Array.isArray(res.data.services)) {
          setServices(res.data.services);
        } else {
          setServices([]);
        }
      } catch (error) {
        setServices([]);
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* Topbar */}
      <TopBarComponent />
      <Fragment>
        {/* Hero Carousel */}
        <HeroBanner
          image={DEPT_BANNER}
          title="Dịch Vụ Y Tế KiwiCare"
          subtitle="Chăm sóc sức khỏe toàn diện với các chuyên khoa hàng đầu"
        />

        <div className="service-section">
          <div className="service-container">
            <div className="service-header">
              <h2 className="service-header-title">Khám Phá Dịch Vụ Của KiwiCare</h2>
              <p className="service-header-desc">Giải pháp y tế toàn diện, cá nhân hóa cho mọi nhu cầu sức khỏe</p>
            </div>
            <div className="service-grid">
              {services.map((item, index) => (
                <div key={item._id || index} className="service-grid-item">
                  <ServiceBox
                    image={item.image}
                    title={item.name}
                    description={item.description}
                    buttonUrl={`/service/${item._id}`}
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

export default ServicePage;