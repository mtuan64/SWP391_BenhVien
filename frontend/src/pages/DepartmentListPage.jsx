import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/ServicePage.css"; // Tận dụng lại style

const DepartmentBox = ({ name, description, buttonUrl }) => (
  <div className="fancybox">
    <div className="fancybox-content">
      <div className="fancybox-image-container">
        <img 
          src="https://vinmec-prod.s3.amazonaws.com/images/20210505_161643_674313_Khoa-noi-tong-quat.max-1800x1800.jpg"
          alt={name}
          className="fancybox-image"
        />
      </div>
      <h3 className="fancybox-title">{name}</h3>
      <p className="fancybox-desc">{description}</p>
      <Link to={buttonUrl} className="fancybox-button">Xem chi tiết</Link>
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
    <Fragment>
      <div className="service-section">
        <div className="service-container">
          <div className="service-header">
            <h2 className="service-header-title">Chuyên Khoa Bệnh Viện</h2>
            <p className="service-header-desc">
              Danh sách các chuyên khoa, phòng ban hàng đầu tại bệnh viện
            </p>
          </div>
          <div className="service-grid">
            {departments.map((item, index) => (
              <div key={item._id || index} className="service-grid-item">
                <DepartmentBox
                  name={item.name}
                  description={item.description}
                  buttonUrl={`/department/${item._id}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentPage;
