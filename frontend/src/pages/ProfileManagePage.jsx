import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/authContext";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const ProfileManagerPage = () => {
    const [profiles, setProfiles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingProfile, setEditingProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        dateOfBirth: "",
        gender: "Male"
    });
    const {token } = useAuth();
    
    // Load profiles
    const fetchProfiles = async () => {
        try {
            const res = await axios.get("http://localhost:9999/api/profile/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfiles(res.data);
        } catch (err) {
            console.error("Failed to fetch profiles", err);
        }
    };

    useEffect(() => {
        fetchProfiles();
    }, []);

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Add or update
    const handleSubmit = async () => {
        try {
            if (editingProfile) {
                await axios.put(`http://localhost:9999/api/profile/update/${editingProfile._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post("http://localhost:9999/api/profile/create", formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            setShowModal(false);
            setEditingProfile(null);
            setFormData({ name: "", dateOfBirth: "", gender: "Male" });
            fetchProfiles();
        } catch (err) {
            console.error("Error submitting form", err);
            console.log(err.response?.data);
            alert("Lỗi khi lưu hồ sơ.");
        }
    };

    // Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xoá?")) return;
        try {
            await axios.delete(`http://localhost:9999/api/profile/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchProfiles();
        } catch (err) {
            console.error("Error deleting profile", err);
        }
    };

    // Open modal for editing
    const openEditModal = (profile) => {
        setEditingProfile(profile);
        setFormData({
            name: profile.name,
            dateOfBirth: profile.dateOfBirth.split("T")[0],
            gender: profile.gender
        });
        setShowModal(true);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Quản Lý Hồ Sơ</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                + Thêm hồ sơ mới
            </Button>

            <div className="mt-4">
                {profiles.length === 0 ? (
                    <p>Không có hồ sơ nào.</p>
                ) : (
                    <Row>
                        {profiles.map((profile) => (
                            <Col key={profile._id} md={4} className="mb-3">
                                <div className="border rounded p-3 h-100">
                                    <h5>{profile.name}</h5>
                                    <p>Giới tính: {profile.gender}</p>
                                    <p>Ngày sinh: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                                    <div className="d-flex gap-2">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => openEditModal(profile)}
                                        >
                                            Sửa
                                        </Button>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDelete(profile._id)}
                                        >
                                            Xoá
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingProfile ? "Cập nhật hồ sơ" : "Thêm hồ sơ mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Ngày sinh</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                max={new Date().toISOString().split("T")[0]}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Giới tính</Form.Label>
                            <Form.Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="Other">Khác</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Huỷ
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        {editingProfile ? "Lưu thay đổi" : "Tạo mới"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProfileManagerPage;
