import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../assets/css/MedicineDetail.css";
import HeroBanner from "../components/HeroBanner";
import TopBarComponent from "../components/TopBarComponent";

const MEDICINE_BANNER = "https://img.freepik.com/premium-photo/pills-medical-equiupments-green-banner-background_8087-321.jpg";

const MedicineDetail = () => {
    const { medicineId } = useParams();
    const [medicine, setMedicine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicine = async () => {
            try {
                const res = await axios.get(`/api/user/medicines/${medicineId}`);
                console.log("API Response:", res.data);
                if (res.data.data) {
                    setMedicine(res.data.data);
                } else if (res.data) {
                    setMedicine(res.data);
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching medicine details:", error);
                setError("Failed to load medicine details. Please check the console for more details.");
                setLoading(false);
            }
        };

        fetchMedicine();
    }, [medicineId]);

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
                <Link to="/medicines-home" className="btn btn-primary mt-3">Back to Medicine Home</Link>
            </div>
        );
    }

    return (
        <>
            {/* Topbar */}
            <TopBarComponent />

            {/* Hero Carousel */}
            <HeroBanner
                image={MEDICINE_BANNER}
                title="Danh Mục Thuốc"
                subtitle="Tra cứu thông tin, tác dụng, chỉ định và giá thuốc tại KiwiCare"
            />

            <div className="medicine-detail-container">
                <h1 className="medicine-detail-title">{medicine.name}</h1>
                <div className="medicine-detail-block">
                    <div><b>Dạng bào chế:</b> {medicine.type || "-"}</div>
                    <div><b>Nhóm thuốc:</b> {medicine.group || "-"}</div>
                    <div><b>Hoạt chất:</b> {medicine.ingredient || "-"}</div>
                    <div><b>Chỉ định:</b> {medicine.indication || "-"}</div>
                    <div><b>Chống chỉ định:</b> {medicine.contraindication || "-"}</div>
                    <div><b>Liều dùng:</b> {medicine.dosage || "-"}</div>
                    <div><b>Tác dụng phụ:</b> {medicine.sideEffects || "-"}</div>
                    <div><b>Thận trọng:</b> {medicine.precaution || "-"}</div>
                    <div><b>Tương tác thuốc:</b> {medicine.interaction || "-"}</div>
                    <div><b>Bảo quản:</b> {medicine.storage || "-"}</div>
                    <Link to="/medicines-home" className="btn btn-secondary mt-3">Back to Medicine Home</Link>
                </div>
            </div>
        </>

    );
};

export default MedicineDetail;
