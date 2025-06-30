import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/MedicineListPage.css";
import HeaderComponent from "../components/HeaderComponent";
import HeroBanner from "../components/HeroBanner";

const MEDICINE_BANNER = "https://images.unsplash.com/photo-1511174511562-5f97f4f4eab6?auto=format&fit=facearea&w=1600&q=80";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MedicineListPage = () => {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [activeLetter, setActiveLetter] = useState("");

    useEffect(() => {
        axios.get("/api/user/medicines")
            .then(res => setMedicines(res.data.data || []))
            .catch(err => console.error(err));
    }, []);

    // Tìm kiếm tên thuốc
    const filtered = medicines
        .filter(med => !search || med.name.toLowerCase().includes(search.toLowerCase()))
        .filter(med => !activeLetter || med.name[0].toUpperCase() === activeLetter);

    // Sắp xếp theo alphabet
    filtered.sort((a, b) => a.name.localeCompare(b.name));

    // Tạo danh sách các chữ cái có thuốc
    const availableLetters = [...new Set(medicines.map(med => med.name[0].toUpperCase()))];


    // Loại bỏ những thuốc không có _id để tránh lỗi khi click link
    const safeFiltered = filtered.filter(med => med._id && med.name);

    // Chia thuốc thành 2 cột (hoặc bạn có thể chia thành nhiều cột hơn nếu muốn)
    const middle = Math.ceil(safeFiltered.length / 2);
    const column1 = safeFiltered.slice(0, middle);
    const column2 = safeFiltered.slice(middle);

    return (
        <>
            {/* Topbar */}
            <div className="bg-light py-2 px-5 d-none d-lg-block">
                <Row className="align-items-center justify-content-between">
                    <Col md={6} className="text-start">
                        <small>
                            <i className="far fa-clock text-primary me-2"></i>
                            Opening Hours: Mon - Sat : 7.00 am - 8.00 pm, Sunday 9.00 am - 5.00 pm
                        </small>
                    </Col>
                    <Col md={6} className="text-end">
                        <small className="me-4">
                            <i className="fa fa-envelope-open text-primary me-2"></i>
                            contact@kiwicare.com
                        </small>
                        <small>
                            <i className="fa fa-phone-alt text-primary me-2"></i>
                            +987 654 3210
                        </small>
                    </Col>
                </Row>
            </div>

            <HeaderComponent />
            {/* Hero Carousel */}
            <HeroBanner
                image={MEDICINE_BANNER}
                title="Danh Mục Thuốc"
                subtitle="Tra cứu thông tin, tác dụng, chỉ định và giá thuốc tại KiwiCare"
            />
            <div className="medicine-container">
                <div className="medicine-search-bar">
                    <h2 className="medicine-title">Tra cứu tên thuốc</h2>
                    <div className="search-row">
                        <input
                            className="medicine-search"
                            placeholder="Nhập tên thuốc cần tìm..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                <h3 className="medicine-title-list">Danh sách thuốc</h3>
                <div className="az-filter">
                    {ALPHABET.map(letter => (
                        <button
                            key={letter}
                            className={`az-letter${activeLetter === letter ? " active" : ""}${availableLetters.includes(letter) ? "" : " disabled"}`}
                            onClick={() => availableLetters.includes(letter) ? setActiveLetter(activeLetter === letter ? "" : letter) : null}
                            disabled={!availableLetters.includes(letter)}
                        >
                            {letter}
                        </button>
                    ))}
                    <button className="az-letter" onClick={() => setActiveLetter("")}>Ẩn</button>
                </div>
                <div className="medicine-list-row">
                    <div className="medicine-list-col">
                        {column1.map(med => (
                            <div className="medicine-row" key={med._id}>
                                <Link className="medicine-link" to={`/medicines/${med._id}`}>{med.name}</Link>
                            </div>
                        ))}
                    </div>
                    <div className="medicine-list-col">
                        {column2.map(med => (
                            <div className="medicine-row" key={med._id}>
                                <Link className="medicine-link" to={`/medicines/${med._id}`}>{med.name}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default MedicineListPage;
