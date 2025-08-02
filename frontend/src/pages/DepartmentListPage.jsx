import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/DepartmentPage.css";

const DEPT_BANNER = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=1600&q=80";

const DepartmentBox = ({ name, image, buttonUrl }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="departmentbox"
      style={{
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        transition: "all 0.3s ease",
        maxWidth: "300px",
        width: "100%",
        cursor: "pointer",
        border: "1px solid #e9ecef",
        ...(hovered ? { transform: "translateY(-4px)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)" } : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={buttonUrl} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        <div style={{ width: "100%", height: "200px", overflow: "hidden" }}>
          <img
            src={image || "/api/placeholder/300/200"}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        </div>
      </Link>
      <div style={{ padding: "20px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#2c3e50", margin: 0, textAlign: "center", lineHeight: "1.4" }}>
          {name}
        </h3>
      </div>
    </div>
  );
};

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentsPerPage] = useState(6);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`/api/user/department?page=${currentPage}&limit=${departmentsPerPage}&searchTerm=${searchTerm}`);
        console.log("API Response:", res.data);
        if (Array.isArray(res.data.departments)) {
          setDepartments(res.data.departments);
          setTotalDepartments(res.data.totalDepartments);
        } else {
          setDepartments([]);
          setError("Không có dữ liệu phòng ban");
        }
      } catch (error) {
        setDepartments([]);
        setError("Không thể tải danh sách phòng ban");
        console.error("Error fetching department details:", error);
      }
      setLoading(false);
    };

    fetchDepartments();
  }, [currentPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(totalDepartments / departmentsPerPage);

  const getPaginatedDepartments = () => {
    const startIdx = (currentPage - 1) * departmentsPerPage;
    return departments.slice(startIdx, startIdx + departmentsPerPage);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div style={{ width: "100%", backgroundColor: "#f8f9fa" }}>
      {/* Hero Section */}
      <div className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="4000">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={DEPT_BANNER}
              className="d-block w-100"
              alt="Department Banner"
              style={{ objectFit: "cover", height: "80vh", borderRadius: "8px" }}
            />
            <div
              className="carousel-caption d-flex flex-column justify-content-center align-items-center"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                position: "absolute",
                borderRadius: "8px",
              }}
            >
              <h1 className="display-3 fw-bold text-white mb-3">Chuyên Khoa Bệnh Viện</h1>
              <p className="text-white fs-5">Danh sách các chuyên khoa – phòng ban – đội ngũ chuyên gia hàng đầu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div style={{ padding: "0 20px 40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h3 style={{ fontSize: "28px", fontWeight: "600", color: "#2c3e50", textAlign: "center", marginBottom: "30px", marginTop: "20px" }}>
          Danh Sách Phòng Ban
        </h3>
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <input
            style={{
              width: "100%",
              maxWidth: "500px",
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              fontSize: "1rem",
              transition: "border-color 0.2s ease",
            }}
            className="department-search"
            placeholder="Nhập tên phòng ban cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", justifyItems: "center" }}>
          {loading ? (
            <div style={{ textAlign: "center", width: "100%" }}>Đang tải...</div>
          ) : error ? (
            <div style={{ color: "red", textAlign: "center", width: "100%" }}>{error}</div>
          ) : getPaginatedDepartments().length === 0 ? (
            <div style={{ textAlign: "center", width: "100%" }}>Không có phòng ban nào!</div>
          ) : (
            getPaginatedDepartments().map((item, index) => (
              <DepartmentBox
                key={item._id || index}
                name={item.name}
                image={item.image}
                buttonUrl={`/department/${item._id}`}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages >= 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "32px 0 0 0" }}>
            <div style={{ display: "flex", gap: 8, background: "#fff", borderRadius: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "8px 24px" }}>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: currentPage === 1 ? "#e0e0e0" : "#bdbdbd",
                  fontSize: 20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                title="Trang đầu"
              >
                &#171;
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: currentPage === 1 ? "#e0e0e0" : "#bdbdbd",
                  fontSize: 20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                title="Trang trước"
              >
                &#8249;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((n) => n === 1 || n === totalPages || (n >= currentPage - 1 && n <= currentPage + 1))
                .map((n, idx, arr) => (
                  <React.Fragment key={n}>
                    {idx > 0 && n - arr[idx - 1] > 1 && (
                      <span style={{ width: 32, textAlign: "center", color: "#bdbdbd" }}>...</span>
                    )}
                    <button
                      style={{
                        background: currentPage === n ? "#00bcd4" : "none",
                        color: currentPage === n ? "#fff" : "#bdbdbd",
                        fontWeight: currentPage === n ? "bold" : 600,
                        border: "none",
                        borderRadius: "50%",
                        width: 36,
                        height: 36,
                        fontSize: 20,
                        cursor: currentPage === n ? "default" : "pointer",
                        pointerEvents: currentPage === n ? "none" : "auto",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onClick={() => handlePageChange(n)}
                      disabled={currentPage === n}
                    >
                      {n}
                    </button>
                  </React.Fragment>
                ))}
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: currentPage === totalPages ? "#e0e0e0" : "#bdbdbd",
                  fontSize: 20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                title="Trang sau"
              >
                &#8250;
              </button>
              <button
                style={{
                  background: "none",
                  border: "none",
                  color: currentPage === totalPages ? "#e0e0e0" : "#bdbdbd",
                  fontSize: 20,
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                title="Trang cuối"
              >
                &#187;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentPage;