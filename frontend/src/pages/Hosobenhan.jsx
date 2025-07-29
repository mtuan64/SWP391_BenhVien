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
  const [expandedId, setExpandedId] = useState(null);

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

    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }

    if (search.trim() !== "") {
      result = result.filter(
        (r) =>
          r.symptoms?.toLowerCase().includes(search.toLowerCase()) ||
          r.diagnosis?.toLowerCase().includes(search.toLowerCase())
      );
    }

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

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold text-primary">Hồ sơ bệnh án</h2>

      <div className="row mb-4 g-3">
        <div className="col-md-6 col-lg-3">
          <input
            type="text"
            placeholder="Tìm theo triệu chứng hoặc chẩn đoán"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-md-6 col-lg-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option value="all">Tất cả</option>
            <option value="in-progress">Đang điều trị</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>
        <div className="col-md-6 col-lg-3">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="form-select"
          >
            <option value="createdAt">Ngày tạo</option>
            <option value="updatedAt">Ngày cập nhật</option>
          </select>
        </div>
        <div className="col-md-6 col-lg-3">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="form-select"
          >
            <option value="desc">Mới nhất</option>
            <option value="asc">Cũ nhất</option>
          </select>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th scope="col" className="text-center">#</th>
              <th scope="col">Triệu chứng</th>
              <th scope="col">Chẩn đoán</th>
              <th scope="col">Bác sĩ</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Ngày tạo</th>
              <th scope="col" className="text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-muted">
                  Không có bệnh án phù hợp.
                </td>
              </tr>
            ) : (
              filtered.map((record, index) => (
                <React.Fragment key={record._id}>
                  <tr>
                    <td className="text-center">{index + 1}</td>
                    <td>{record.symptoms}</td>
                    <td>{record.diagnosis}</td>
                    <td>{record.doctorId?.name || "Chưa rõ"}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === "in-progress"
                            ? "bg-warning"
                            : "bg-success"
                        }`}
                      >
                        {record.status === "in-progress"
                          ? "Đang điều trị"
                          : "Hoàn thành"}
                      </span>
                    </td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                    <td className="text-center">
                      <button
                        onClick={() => toggleExpand(record._id)}
                        className="btn btn-sm btn-outline-primary"
                      >
                        {expandedId === record._id ? "Ẩn" : "Xem"}
                      </button>
                    </td>
                  </tr>
                  {expandedId === record._id && (
                    <tr>
                      <td colSpan="7" className="bg-light p-4">
                        <div className="text-muted">
                          <p className="mb-3">
                            <strong>Kết luận:</strong>{" "}
                            {record.conclusion || "Chưa có"}
                          </p>

                          <div className="mb-3">
                            <strong>Đơn thuốc:</strong>
                            {record.prescriptions?.length > 0 ? (
                              <ul className="list-group list-group-flush ms-3">
                                {record.prescriptions.map((p, i) => (
                                  <li key={i} className="list-group-item">
                                    {p.medicines?.map((m, idx) => (
                                      <div key={idx}>
                                        - {m.name}: {m.dosage} ({m.frequency})
                                      </div>
                                    ))}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="ms-3 text-muted">
                                Không có đơn thuốc.
                              </p>
                            )}
                          </div>

                          <div>
                            <strong>Dịch vụ:</strong>
                            {record.procedureRequests?.length > 0 ? (
                              <ul className="list-group list-group-flush ms-3">
                                {record.procedureRequests.map((req, idx) => (
                                  <li key={idx} className="list-group-item">
                                    {req.services.map((s, i) => (
                                      <div key={i}>
                                        - {s.serviceId?.name || "Tên dịch vụ?"} (
                                        {s.status})
                                        {s.resultNote &&
                                          ` - Ghi chú: ${s.resultNote}`}
                                      </div>
                                    ))}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="ms-3 text-muted">
                                Không có dịch vụ.
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecordPage;