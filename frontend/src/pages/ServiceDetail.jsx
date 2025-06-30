import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../assets/css/ServiceDetail.css";
import HeroBanner from "../components/HeroBanner";

const DEPT_BANNER = "https://xdcs.cdnchinhphu.vn/446259493575335936/2024/1/13/bv-1705119640880430272769.jpg";

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await axios.get(`http://localhost:9999/api/user/service/${serviceId}`);
                console.log("API Response:", res.data);
                if (Array.isArray(res.data.service)) {
                    setService(res.data.service[0]);
                } else if (res.data.data) {
                    setService(res.data.data);
                } else if (res.data.service) {
                    setService(res.data.service);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching service details:", error);
                setError("Failed to load service details. Please check the console for more details.");
                setLoading(false);
            }
        };

        fetchService();
    }, [serviceId]);

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
                <Link to="/service" className="btn btn-primary mt-3">Back to Service Home</Link>
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
            <HeroBanner
                image={DEPT_BANNER}
                title="Dịch Vụ Y Tế KiwiCare"
                subtitle="Chăm sóc sức khỏe toàn diện với các chuyên khoa hàng đầu"
            />

            <div className="service-detail-container">
                <h1 className="service-detail-title">{service.name}</h1>
                <div className="service-detail-desc">
                    <b>Mô tả dịch vụ:</b>
                    <div>{service.description || "Chưa cập nhật mô tả."}</div>
                </div>
                <div className="service-detail-price">
                    <b>Giá dịch vụ:</b>
                    <span>{service.price?.toLocaleString()} VNĐ</span>
                </div>
                <Link className="btn btn-secondary mt-4" to="/service">Quay lại danh sách dịch vụ</Link>
            </div>
        </>

    );
};

export default ServiceDetail;