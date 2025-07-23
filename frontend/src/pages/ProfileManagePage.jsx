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
        gender: "Male",
        identityNumber: ""
    });
    const { token } = useAuth();
    const [showMedicalDetails, setShowMedicalDetails] = useState({});

    // State cho lọc và sắp xếp
    const [searchTerm, setSearchTerm] = useState("");
    const [genderFilter, setGenderFilter] = useState("All");
    const [sortBy, setSortBy] = useState("name_asc");

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
            setFormData({ name: "", dateOfBirth: "", gender: "Male", identityNumber: "" });
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
            gender: profile.gender,
            identityNumber: profile.identityNumber
        });
        setShowModal(true);
    };

    // Toggle medical details
    const toggleMedicalDetails = (profileId) => {
        setShowMedicalDetails(prev => ({
            ...prev,
            [profileId]: !prev[profileId]
        }));
    };

    // Lọc và sắp xếp profiles
    const filteredAndSortedProfiles = [...profiles]
        // Lọc
        .filter(profile => {
            const matchesSearch = profile.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGender = genderFilter === "All" || profile.gender === genderFilter;
            return matchesSearch && matchesGender;
        })
        // Sắp xếp
        .sort((a, b) => {
            if (sortBy === "name_asc") {
                return a.name.localeCompare(b.name);
            } else if (sortBy === "name_desc") {
                return b.name.localeCompare(a.name);
            } else if (sortBy === "dob_asc") {
                return new Date(a.dateOfBirth) - new Date(b.dateOfBirth);
            } else if (sortBy === "dob_desc") {
                return new Date(b.dateOfBirth) - new Date(a.dateOfBirth);
            }
            return 0;
        });

    return (
        <div className="container py-4">
            <h2 className="mb-4">Quản Lý Hồ Sơ</h2>
            <Button variant="primary" onClick={() => setShowModal(true)}>
                + Thêm hồ sơ mới
            </Button>

            {/* UI lọc và sắp xếp */}
            <Row className="mt-4 mb-3">
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Tìm kiếm theo tên..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                    >
                        <option value="All">Tất cả giới tính</option>
                        <option value="Male">Nam</option>
                        <option value="Female">Nữ</option>
                        <option value="Other">Khác</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name_asc">Tên (A-Z)</option>
                        <option value="name_desc">Tên (Z-A)</option>
                        <option value="dob_asc">Ngày sinh (Cũ nhất)</option>
                        <option value="dob_desc">Ngày sinh (Mới nhất)</option>
                    </Form.Select>
                </Col>
            </Row>

            <div className="mt-4">
                {filteredAndSortedProfiles.length === 0 ? (
                    <p>Không có hồ sơ nào phù hợp.</p>
                ) : (
                    <Row>
                        {filteredAndSortedProfiles.map((profile) => (
                            <Col key={profile._id} md={4} className="mb-3">
                                <div className="border rounded p-3 h-100">
                                    <h5>{profile.name}</h5>
                                    <p>Giới tính: {profile.gender}</p>
                                    <p>Ngày sinh: {new Date(profile.dateOfBirth).toLocaleDateString()}</p>
                                    <p>CMND/CCCD: {profile.identityNumber}</p>
                                    {showMedicalDetails[profile._id] && (
                                        <div id={`medical-details-${profile._id}`}>
                                            <p>Chẩn đoán: {profile.diagnose || "Chưa có"}</p>
                                            <p>Ghi chú: {profile.note || "Chưa có"}</p>
                                            <p>Vấn đề: {profile.issues || "Chưa có"}</p>
                                            <p>Thuốc: {profile.medicine && profile.medicine.length > 0 ? profile.medicine.map(m => m.name || m).join(", ") : "Chưa có"}</p>
                                            <p>Bác sĩ: {profile.doctorId?.name || "Chưa có"}</p>
                                            <p>Dịch vụ: {profile.service && profile.service.length > 0 ? profile.service.map(s => s.name || s).join(", ") : "Chưa có"}</p>
                                            <p>Kết quả xét nghiệm: {profile.labTestId?.result || "Chưa có"}</p>
                                            <p>Ngày xét nghiệm: {profile.labTestId?.dayTest ? new Date(profile.labTestId.dayTest).toLocaleDateString() : "Chưa có"}</p>
                                            <p>Dịch vụ xét nghiệm: {profile.labTestId?.services && profile.labTestId.services.length > 0 ? profile.labTestId.services.map(s => s.name || s).join(", ") : "Chưa có"}</p>
                                        </div>
                                    )}
                                    <div className="d-flex gap-2 mt-2">
                                        <Button
                                            variant="outline-primary"
                                            size="sm"
                                            onClick={() => toggleMedicalDetails(profile._id)}
                                        >
                                            {showMedicalDetails[profile._id] ? "Ẩn Chi Tiết Y Tế" : "Xem Chi Tiết Y Tế"}
                                        </Button>
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

                        <Form.Group className="mb-3">
                            <Form.Label>CMND/CCCD</Form.Label>
                            <Form.Control
                                type="text"
                                name="identityNumber"
                                value={formData.identityNumber}
                                onChange={handleChange}
                                placeholder="Nhập số CMND hoặc CCCD"
                            />
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