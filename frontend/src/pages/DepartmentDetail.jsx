import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../assets/css/DepartmentDetail.css";

const DepartmentDetail = () => {
  const { departmentId } = useParams();
  const [department, setDepartment] = useState(null);
  const [allDepartments, setAllDepartments] = useState([]);
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
        // Fetch department by ID
        const departmentResponse = await axios.get(`/api/user/department/${departmentId}`);
        console.log("Department API Response:", departmentResponse.data);
        if (departmentResponse.data.data) {
          setDepartment(departmentResponse.data.data);
        } else if (departmentResponse.data.department) {
          setDepartment(departmentResponse.data.department);
        } else {
          throw new Error("Invalid department response format");
        }

        // Fetch all departments
        const allDepartmentsResponse = await axios.get(`/api/user/department`);
        console.log("All Departments API Response:", allDepartmentsResponse.data);
        const departments = allDepartmentsResponse.data.departments || allDepartmentsResponse.data.data || allDepartmentsResponse.data || [];
        setAllDepartments(departments);
        console.log("allDepartments state:", departments);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Error response:", error.response?.data);
        setError("Không thể tải thông tin phòng ban hoặc danh sách phòng ban. Vui lòng kiểm tra console để biết thêm chi tiết.");
        setLoading(false);
      }
    };

    fetchData();
  }, [departmentId]);

  if (loading) {
    return <div className="departmentdetail-loading">Đang tải...</div>;
  }

  if (error) {
    return (
      <div className="departmentdetail-error">
        Lỗi: {error}
        <Link to="/department-home" className="btn btn-primary mt-3">Quay lại danh sách chuyên khoa</Link>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="departmentdetail-error">
        Không tìm thấy phòng ban hoặc tải dữ liệu thất bại. Vui lòng kiểm tra console.
        <Link to="/department-home" className="btn btn-primary mt-3">Quay lại danh sách chuyên khoa</Link>
      </div>
    );
  }

  return (
    <div className="departmentdetail-page">
      <div className="departmentdetail-wrapper">
        <div className="departmentdetail-main">
          <div className="departmentdetail-container">
            <div className="departmentdetail-card">
              <div className="departmentdetail-header">
                <h1 className="departmentdetail-title">{department.name || "Phòng ban không rõ tên"}</h1>
              </div>
              {department.image && (
                <div className="departmentdetail-image">
                  <img
                    src={department.image}
                    alt={department.name || "Department"}
                    className="departmentdetail-main-image"
                  />
                </div>
              )}
              <div className="departmentdetail-content">
                <p><strong>Mô tả:</strong> {department.description || "Chưa cập nhật mô tả."}</p>
                <Link to="/department-home" className="departmentdetail-read-more">Quay lại danh sách chuyên khoa</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="departmentdetail-sidebar">
          <h3 className="departmentdetail-sidebar-title">Danh sách chuyên khoa</h3>
          <div className="departmentdetail-featured-departments">
            {allDepartments.filter((d) => d._id !== department._id).length === 0 ? (
              <p>Không có phòng ban nào khác.</p>
            ) : (
              allDepartments
                .filter((d) => d._id !== department._id)
                .map((otherDepartment, index) => (
                  <div key={index} className="departmentdetail-featured-department-card">
                    <Link to={`/department/${otherDepartment._id}`}>
                      <img
                        src={otherDepartment.image || "https://via.placeholder.com/100x100"}
                        alt={otherDepartment.name || "Unknown Department"}
                        className="departmentdetail-featured-department-image"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100x100")}
                      />
                    </Link>
                    <div className="departmentdetail-featured-department-content">
                      <Link
                        to={`/department/${otherDepartment._id}`}
                        className="departmentdetail-featured-department-title-link"
                      >
                        <h4 className="departmentdetail-featured-department-title">
                          {(otherDepartment.name || "Phòng ban không rõ tên").length > 20
                            ? (otherDepartment.name || "Phòng ban không rõ tên").substring(0, 20) + "..."
                            : otherDepartment.name || "Phòng ban không rõ tên"}
                        </h4>
                      </Link>
                      <p className="departmentdetail-featured-department-excerpt">
                        {truncateText(otherDepartment.description || "Chưa có mô tả", 50)}
                      </p>
                      <Link
                        to={`/department/${otherDepartment._id}`}
                        className="departmentdetail-read-more"
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

export default DepartmentDetail;