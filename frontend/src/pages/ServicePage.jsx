import React, { Fragment, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import '../assets/css/ServicePage.css';

const FancyBox = ({ fancyboxImage, fancyboxTitle, fancyboxDesc, buttonUrl }) => (
  <div className="fancybox">
    <div className="fancybox-content">
      <div className="fancybox-image-container">
        <img 
          src={fancyboxImage} 
          alt={fancyboxTitle} 
          className="fancybox-image"
        />
      </div>
      <h3 className="fancybox-title">{fancyboxTitle}</h3>
      <p className="fancybox-desc">{fancyboxDesc}</p>
      <Link
        to={buttonUrl}
        className="fancybox-button"
      >
        Tìm Hiểu Thêm
      </Link>
    </div>
  </div>
);


const ServicePage = () => {
  const [fancyBoxData, setFancyBoxData] = useState([]);
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:9999/api/user/service`);
        console.log("API Response:", res.data);
        if (Array.isArray(res.data.data)) {
          setFancyBoxData(res.data.data);
        } else if (Array.isArray(res.data.services)) {
          setFancyBoxData(res.data.services);
        } else {
          setFancyBoxData([]);
        }
      } catch (error) {
        setFancyBoxData([]);
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchService();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      {/* Hero Section */}
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/13/bv-1705119640880430272769.jpg"
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
              <h1 className="display-3 fw-bold text-white mb-3">Dịch Vụ Y Tế KiwiCare</h1>
              <p className="text-white fs-5">Chăm sóc sức khỏe toàn diện với các chuyên khoa hàng đầu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="service-section">
        <div className="service-container">
          <div className="service-header">
            <h2 className="service-header-title">Khám Phá Dịch Vụ Của KiwiCare</h2>
            <p className="service-header-desc">Giải pháp y tế toàn diện, cá nhân hóa cho mọi nhu cầu sức khỏe</p>
          </div>
          <div className="service-grid">
            {fancyBoxData.map((item, index) => (
              <div key={item._id || index} className="service-grid-item">
                <FancyBox
                  fancyboxImage={item.fancyboxImage}
                  fancyboxTitle={item.name}
                  fancyboxDesc={item.description}
                  buttonUrl={`/service/${item._id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ServicePage;