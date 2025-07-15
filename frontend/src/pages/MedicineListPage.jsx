import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/MedicineListPage.css";
import HeaderComponent from "../components/HeaderComponent";
import HeroBanner from "../components/HeroBanner";
import TopBarComponent from "../components/TopBarComponent";

const MEDICINE_BANNER = "https://img.freepik.com/premium-photo/pills-medical-equiupments-green-banner-background_8087-321.jpg";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const MedicineListPage = () => {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState("");
    const [activeLetter, setActiveLetter] = useState("");
    const [totalMedicines, setTotalMedicines] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [medicinesPerPage] = useState(10); // Mặc định 10 thuốc mỗi trang

    useEffect(() => {
        axios.get(`/api/user/medicines?page=${currentPage}&limit=${medicinesPerPage}`)
            .then(res => {
                setMedicines(res.data.data || []);
                setTotalMedicines(res.data.totalMedicines || 0);
            })
            .catch(err => console.error(err));
    }, [currentPage]);

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

    // Tính toán tổng số trang
    const totalPages = Math.ceil(totalMedicines / medicinesPerPage);

    // Handle chuyển trang
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <>
            {/* Topbar */}
            <TopBarComponent />

            {/* Header */}
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

                {/* Pagination Section */}
                <div className="d-flex justify-content-center py-4">
                    <h5 className="text-muted">Tổng số thuốc: {totalMedicines}</h5>
                </div>
                <div className="d-flex justify-content-center py-4 align-items-center">
                    <button
                        className="btn btn-secondary me-2"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Trước
                    </button>

                    {/* Chữ trang được căn giữa */}
                    <span className="mx-3">{`Trang ${currentPage} / ${totalPages}`}</span>

                    <button
                        className="btn btn-secondary ms-2"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Sau
                    </button>
                </div>
            </div>
        </>
    );
};

export default MedicineListPage;
