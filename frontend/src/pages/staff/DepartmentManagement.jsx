import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa";

const DepartmentManagement = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [paginationLimit, setPaginationLimit] = useState(5);
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user || user.role !== "Staff") {
      message.warning("Bạn không có quyền truy cập");
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    fetchDepartments();
  }, [searchQuery, currentPage, paginationLimit]);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9999/api/departments", {
        params: {
          search: searchQuery.trim(),
          page: currentPage,
          limit: paginationLimit,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { departments, pagination } = response.data;
      setDepartments(departments || []);
      setCurrentPage(pagination.page || 1);
      setTotalPages(pagination.totalPages || 1);
      setTotalItems(pagination.total || 0);
    } catch (error) {
      console.error("Lỗi tải danh sách khoa:", error);
      message.error("Lỗi tải danh sách khoa");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleAddNew = () => {
    setCurrentDepartment(null);
    setForm({ name: "", description: "" });
    setImageFile(null);
    setShowModal(true);
  };

  const handleEdit = (department) => {
    setCurrentDepartment(department);
    setForm({
      name: department.name || "",
      description: department.description || "",
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        message.error("Không tìm thấy token. Vui lòng đăng nhập lại.");
        return;
      }

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };

      if (currentDepartment) {
        await axios.put(
          `http://localhost:9999/api/departments/${currentDepartment._id}`,
          formData,
          config
        );
        message.success("Cập nhật phòng ban thành công!");
      } else {
        await axios.post("http://localhost:9999/api/departments", formData, config);
        message.success("Thêm phòng ban thành công!");
      }

      setShowModal(false);
      setImageFile(null);
      fetchDepartments();
    } catch (error) {
      console.error("Lỗi gửi yêu cầu:", error);
      message.error(error.response?.data?.message || "Thao tác thất bại.");
    }
  };

  const handleDeleteClick = (departmentId) => {
    setDeleteDepartmentId(departmentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9999/api/departments/${deleteDepartmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Xóa phòng ban thành công!");
      setShowDeleteModal(false);
      fetchDepartments();
    } catch (error) {
      message.error(error.response?.data?.message || "Xóa thất bại.");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const truncateDescription = (description) => {
    if (!description) return "Không có";
    return description.length > 50 ? description.substring(0, 50) + "..." : description;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Quản lý khoa</h2>
        <button
          onClick={handleAddNew}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
        >
          <FaPlus className="mr-2" /> Thêm khoa
        </button>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Tìm kiếm:</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mô tả..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border px-3 py-1 rounded w-full max-w-xs"
          />
          {searchQuery && (
            <FaTimes
              className="absolute right-2 top-2 cursor-pointer text-gray-500"
              onClick={handleClearFilters}
            />
          )}
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600 italic">Đang tải dữ liệu...</p>
      ) : departments.length === 0 ? (
        <p className="text-gray-600 italic">Không tìm thấy phòng ban nào.</p>
      ) : (
        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
              <tr>
                <th className="px-4 py-2 border">STT</th>
                <th className="px-4 py-2 border">Tên</th>
                <th className="px-4 py-2 border">Mô tả</th>
                <th className="px-4 py-2 border">Hình ảnh</th>
                <th className="px-4 py-2 border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={department._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{(currentPage - 1) * paginationLimit + index + 1}</td>
                  <td className="px-4 py-2 border">{department.name}</td>
                  <td className="px-4 py-2 border">{truncateDescription(department.description)}</td>
                  <td className="px-4 py-2 border">
                    {department.image ? (
                      <img
                        src={department.image}
                        alt="Ảnh phòng ban"
                        className="rounded-circle shadow-sm"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                      />
                    ) : (
                      <span className="text-gray-500">Không có</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleEdit(department)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(department._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {departments.length > 0 && (
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-600">
            Hiển thị từ {(currentPage - 1) * paginationLimit + 1} đến{" "}
            {Math.min(currentPage * paginationLimit, totalItems)} / {totalItems}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Trước
            </button>
            {[...Array(totalPages).keys()].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setCurrentPage(idx + 1)}
                className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-blue-500 text-white" : "hover:bg-gray-100"}`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
            >
              Sau
            </button>
          </div>
        </div>
      )}

      {/* Modal Thêm / Sửa */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {currentDepartment ? "Cập nhật phòng ban" : "Thêm phòng ban"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Tên phòng ban</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nhập tên phòng ban"
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Mô tả</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Nhập mô tả"
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Ảnh đại diện</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full border rounded px-3 py-2"
                />
                {currentDepartment?.image && (
                  <img
                    src={currentDepartment.image}
                    alt="Current"
                    className="mt-2 rounded-circle shadow-sm"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {currentDepartment ? "Lưu" : "Thêm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Xác nhận Xóa */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
            <p>Bạn có chắc chắn muốn xóa phòng ban này?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;