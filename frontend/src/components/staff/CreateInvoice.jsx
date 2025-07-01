import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateInvoice = () => {
    const [userId, setUserId] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [profileId, setProfileId] = useState("");
    const [services, setServices] = useState([]);
    const [selectedServices, setSelectedServices] = useState([]);

    const [loadingProfiles, setLoadingProfiles] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [message, setMessage] = useState("");

    // Load services on mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("http://localhost:9999/api/staff/services", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setServices(res.data.services || []);
            } catch (error) {
                console.error("Lỗi tải dịch vụ:", error);
            }
        };
        fetchServices();
    }, []);

    // Khi userId thay đổi, gọi API lấy profiles
    useEffect(() => {
        if (!userId.trim()) {
            setProfiles([]);
            setProfileId("");
            return;
        }
        const fetchProfiles = async () => {
            setLoadingProfiles(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `http://localhost:9999/api/staff/profiles/${userId.trim()}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfiles(res.data.data || []);
                setProfileId(""); // reset profile chọn
            } catch (error) {
                console.error("Lỗi tải profiles:", error);
                setProfiles([]);
                setProfileId("");
            } finally {
                setLoadingProfiles(false);
            }
        };
        fetchProfiles();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        if (selectedServices.length === 0) {
            setMessage("Vui lòng chọn ít nhất một dịch vụ");
            return;
        }

        // Nếu userId có nhập thì profileId là bắt buộc
        if (userId.trim() && !profileId) {
            setMessage("Vui lòng chọn profile tương ứng với userId đã nhập");
            return;
        }

        const payload = {
            userId: userId.trim() || undefined,
            profileId: profileId || undefined,
            ArrayServiceId: selectedServices,
        };

        setLoadingSubmit(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                "http://localhost:9999/api/staff/invoices",
                payload,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage(res.data.message || "Tạo hóa đơn thành công!");
            // Reset form
            setUserId("");
            setProfiles([]);
            setProfileId("");
            setSelectedServices([]);
        } catch (error) {
            console.error("Lỗi tạo hóa đơn:", error);
            setMessage(error.response?.data?.message || "Lỗi server");
        } finally {
            setLoadingSubmit(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Tạo hóa đơn mới</h2>
            <form onSubmit={handleSubmit}>

                {/* UserId input */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Nhập User ID (không bắt buộc)</label>
                    <input
                        type="text"
                        placeholder="Nhập userId ở đây"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                {/* Profile select (chỉ hiện khi userId có) */}
                {userId.trim() && (
                    <div className="mb-4">
                        <label className="block font-medium mb-1">
                            {loadingProfiles ? "Đang tải profiles..." : "Chọn Profile"}
                        </label>
                        <select
                            value={profileId}
                            onChange={(e) => setProfileId(e.target.value)}
                            className="w-full border px-3 py-2 rounded"
                            disabled={loadingProfiles || profiles.length === 0}
                            required
                        >
                            <option value="">-- Chọn profile --</option>
                            {profiles.map((profile) => (
                                <option key={profile._id} value={profile._id}>
                                    {profile.name}
                                </option>
                            ))}
                        </select>
                        {!loadingProfiles && profiles.length === 0 && (
                            <p className="text-red-500 mt-1">Không tìm thấy profile nào cho userId này.</p>
                        )}
                    </div>
                )}

                {/* Services checkbox list */}
                <div className="mb-4">
                    <label className="block font-medium mb-1">Chọn dịch vụ</label>
                    <div className="max-h-40 overflow-y-auto border rounded p-2">
                        {services.map((svc) => (
                            <label key={svc._id} className="flex items-center mb-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value={svc._id}
                                    checked={selectedServices.includes(svc._id)}
                                    onChange={(e) => {
                                        const checked = e.target.checked;
                                        if (checked) {
                                            setSelectedServices((prev) => [...prev, svc._id]);
                                        } else {
                                            setSelectedServices((prev) =>
                                                prev.filter((id) => id !== svc._id)
                                            );
                                        }
                                    }}
                                    className="mr-2"
                                />
                                <span>
                                    {svc.name} - {svc.price.toLocaleString("vi-VN")} VNĐ
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loadingSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loadingSubmit ? "Đang tạo..." : "Tạo hóa đơn"}
                </button>
            </form>

            {/* Message */}
            {message && (
                <p className={`mt-4 ${message.toLowerCase().includes("lỗi") ? "text-red-600" : "text-green-600"}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default CreateInvoice;
