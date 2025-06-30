import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import "../assets/css/DepartmentDetail.css";
import HeroBanner from "../components/HeroBanner";

const DEPT_BANNER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=1600&q=80";

const DepartmentDetail = () => {
    const { departmentId } = useParams();
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartment = async () => {
            try {
                const res = await axios.get(`http://localhost:9999/api/user/department/${departmentId}`);
                console.log("API Response:", res.data);
                if (Array.isArray(res.data.department)) {
                    setDepartment(res.data.department[0]);
                } else if (res.data.data) {
                    setDepartment(res.data.data);
                } else if (res.data.department) {
                    setDepartment(res.data.department);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching department details:", error);
                setError("Failed to load department details. Please check the console for more details.");
                setLoading(false);
            }
        };
        fetchDepartment();
    }, [departmentId]);

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
                <Link to="/department" className="btn btn-primary mt-3">Back to Department Home</Link>
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
                title="Chuyên Khoa Bệnh Viện"
                subtitle="Danh sách các chuyên khoa – phòng ban – đội ngũ chuyên gia hàng đầu"
            />
            {/* Department Detail Section */}
            <div className="department-detail-container">
                <h1 className="department-detail-title">{department.name}</h1>
                <div className="department-detail-desc">
                    <b>Mô tả chuyên khoa:</b>
                    <div>{department.description || "Chưa cập nhật mô tả."}</div>
                </div>
                <Link className="btn btn-secondary mt-4" to="/department">
                    Quay lại danh sách chuyên khoa
                </Link>
            </div>
        </>

    );
};

export default DepartmentDetail;
