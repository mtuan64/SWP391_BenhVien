import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const MedicalRecordPage = () => {
  const { profileId } = useParams();
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    filterAndSortRecords();
  }, [search, statusFilter, sortField, sortOrder, records]);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`/api/user/hosobenhan/${profileId}`);
      setRecords(res.data);
    } catch (error) {
      console.error("Lỗi khi lấy bệnh án:", error);
    }
  };

  const filterAndSortRecords = () => {
    let result = [...records];

    // Filter by status
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    // Search in symptoms or diagnosis
    if (search.trim() !== "") {
      result = result.filter(
        (r) =>
          r.symptoms?.toLowerCase().includes(search.toLowerCase()) ||
          r.diagnosis?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (!aVal || !bVal) return 0;

      return sortOrder === "asc"
        ? new Date(aVal) - new Date(bVal)
        : new Date(bVal) - new Date(aVal);
    });

    setFiltered(result);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hồ sơ bệnh án</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Tìm theo triệu chứng hoặc chẩn đoán"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded w-1/3"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="all">Tất cả</option>
          <option value="in-progress">Đang điều trị</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="createdAt">Ngày tạo</option>
          <option value="updatedAt">Ngày cập nhật</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          <option value="desc">Mới nhất</option>
          <option value="asc">Cũ nhất</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>Không có bản ghi phù hợp.</p>
      ) : (
        filtered.map((record) => (
          <div key={record._id} className="border p-3 mb-3 rounded bg-white shadow">
            <p><strong>Triệu chứng:</strong> {record.symptoms}</p>
            <p><strong>Chẩn đoán:</strong> {record.diagnosis}</p>
            <p><strong>Kết luận:</strong> {record.conclusion}</p>
            <p><strong>Bác sĩ:</strong> {record.doctorId?.name || "Chưa rõ"}</p>
            <p><strong>Trạng thái:</strong> {record.status}</p>
            <p><strong>Ngày tạo:</strong> {new Date(record.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MedicalRecordPage;
