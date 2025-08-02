import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/ServiceDetail.css";
import TopBarComponent from "../components/TopBarComponent";

const DEPT_BANNER = "https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/13/bv-1705119640880430272769.jpg";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm trích xuất và giới hạn nội dung
  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || "";
    return text.substring(0, maxLength - 3) + "...";
  };

  useEffect(() => {
  const fetchData = async () => {
    try {
      const serviceResponse = await axios.get(`http://localhost:9999/api/user/service/${serviceId}`);
      console.log("Service Response:", serviceResponse.data);
      if (serviceResponse.data.service && Array.isArray(serviceResponse.data.service) && serviceResponse.data.service.length > 0) {
        setService(serviceResponse.data.service[0]); // Take the first item from the array
      } else {
        throw new Error("No valid service data found in response");
      }

      const allServicesResponse = await axios.get(`http://localhost:9999/api/user/service`);
      console.log("All Services Response:", allServicesResponse.data);
      const services = allServicesResponse.data.services || allServicesResponse.data.data || allServicesResponse.data || [];
      setAllServices(services);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("Error response data:", error.response?.data);
      setError("Không thể tải thông tin dịch vụ. Vui lòng kiểm tra console.");
      setLoading(false);
    }
  };

  fetchData();
}, [serviceId]);

  if (loading) {
    return <div className="servicedetail-loading">Đang tải...</div>;
  }

  if (error || !service) {
    return (
      <div className="servicedetail-error">
        Lỗi: {error || "Không tìm thấy dịch vụ."}
        <Link to="/service-home" className="btn btn-primary mt-3">Quay lại danh sách dịch vụ</Link>
      </div>
    );
  }

  return (
    <div className="servicedetail-page">
      {/* Topbar */}
      <TopBarComponent />

      <div className="servicedetail-wrapper">
        <div className="servicedetail-main">
          <div className="servicedetail-container">
            <div className="servicedetail-card">
              <div className="servicedetail-header">
                <h1 className="servicedetail-title">{service.name || "Dịch vụ không rõ tên"}</h1>
              </div>
              {service.image && (
                <div className="servicedetail-image">
                  <img
                    src={service.image}
                    alt={service.name || "Service"}
                    className="servicedetail-main-image"
                  />
                </div>
              )}
              <div className="servicedetail-content">
                <p><strong>Mô tả:</strong> {service.description || "Chưa cập nhật mô tả."}</p>
                <p><strong>Giá dịch vụ:</strong> {service.price ? `${service.price.toLocaleString()} VNĐ` : "Chưa cập nhật giá."}</p>
                <Link to="/service-home" className="servicedetail-read-more">Quay lại danh sách dịch vụ</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="servicedetail-sidebar">
          <h3 className="servicedetail-sidebar-title">Danh sách dịch vụ</h3>
          <div className="servicedetail-featured-services">
            {allServices.filter((s) => s._id !== service._id).length === 0 ? (
              <p>Không có dịch vụ nào khác.</p>
            ) : (
              allServices
                .filter((s) => s._id !== service._id)
                .map((otherService, index) => (
                  <div key={index} className="servicedetail-featured-service-card">
                    <Link to={`/service/${otherService._id}`}>
                      <img
                        src={otherService.image || "https://via.placeholder.com/100x100"}
                        alt={otherService.name || "Unknown Service"}
                        className="servicedetail-featured-service-image"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                      />
                    </Link>
                    <div className="servicedetail-featured-service-content">
                      <Link
                        to={`/service/${otherService._id}`}
                        className="servicedetail-featured-service-title-link"
                      >
                        <h4 className="servicedetail-featured-service-title">
                          {(otherService.name || "Dịch vụ không rõ tên").length > 20
                            ? (otherService.name || "Dịch vụ không rõ tên").substring(0, 20) + "..."
                            : otherService.name || "Dịch vụ không rõ tên"}
                        </h4>
                      </Link>
                      <p className="servicedetail-featured-service-excerpt">
                        {truncateText(otherService.description || "Chưa có mô tả", 50)}
                      </p>
                      <Link
                        to={`/service/${otherService._id}`}
                        className="servicedetail-read-more"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;