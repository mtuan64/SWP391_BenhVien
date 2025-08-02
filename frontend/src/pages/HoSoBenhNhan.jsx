import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Modal from "react-modal";

Modal.setAppElement("#root");

const MedicalRecordPage = () => {
  const { profileId } = useParams();
  const [records, setRecords] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedId, setExpandedId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [ketQua, setKetQua] = useState(null);

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

  const openModal = async (procedureRequestId, testType) => {
    if (!procedureRequestId || !testType) {
      alert("Thiếu procedureRequestId hoặc testType");
      return;
    }

    try {
      const res = await axios.get("/api/doctor/ketquakham", {
        params: { procedureRequestId, testType },
      });
      setKetQua(res.data);
      setModalIsOpen(true);
    } catch (err) {
      alert("Lỗi khi lấy kết quả: " + (err.response?.data?.message || err.message));
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setKetQua(null);
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
              <th className="text-center">#</th>
              <th>Triệu chứng</th>
              <th>Chẩn đoán</th>
              <th>Bác sĩ</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th className="text-center">Chi tiết</th>
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
                        className={`badge ${record.status === "in-progress"
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
                            <strong>Kết luận:</strong> {record.conclusion || "Chưa có"}
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
                              <p className="ms-3 text-muted">Không có đơn thuốc.</p>
                            )}
                          </div>

                          <div>
                            <strong>Dịch vụ:</strong>
                            {record.procedureRequests?.length > 0 ? (
                              <ul className="list-group list-group-flush ms-3">
                                {record.procedureRequests.map((req, idx) => (
                                  <li key={idx} className="list-group-item">
                                    {req.services.map((s, i) => (
                                      <div key={i} className="d-flex justify-content-between align-items-center">
                                        <div>
                                          - {s.serviceId?.name || "Tên dịch vụ?"} ({s.status})
                                          {s.resultNote && ` - Ghi chú: ${s.resultNote}`}
                                        </div>
                                        <button
                                          className="btn btn-sm btn-outline-secondary"
                                          onClick={() => openModal(req._id, s.testType)}
                                        >
                                          Xem kết quả
                                        </button>
                                      </div>
                                    ))}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="ms-3 text-muted">Không có dịch vụ.</p>
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Kết quả khám"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            borderRadius: "10px",
            padding: "0",
            maxWidth: "800px",
            width: "90%",
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.6)", // chỉnh độ mờ tại đây
            zIndex: 1050,
          },
        }}
        ariaHideApp={false}
      >

        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Kết quả xét nghiệm</h5>
              <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>

            <div className="modal-body">
              {ketQua ? (
                <>
                  <p><strong>Loại xét nghiệm:</strong> {ketQua.testType.toUpperCase()}</p>

                  <table className="table table-bordered table-hover mt-3">
                    <thead className="table-light">
                      <tr>
                        <th>Chỉ số</th>
                        <th>Giá trị</th>
                        <th>Đơn vị</th>
                        <th>Khoảng tham chiếu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ketQua.resultDetails.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{item.value}</td>
                          <td>{item.unit || '-'}</td>
                          <td>{item.referenceRange || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {ketQua.resultNote && (
                    <div className="mt-3">
                      <strong>Ghi chú:</strong>
                      <div className="alert alert-info mt-1">{ketQua.resultNote}</div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-muted">Đang tải kết quả...</div>
              )}
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeModal}>Đóng</button>
            </div>
          </div>
        </div>
      </Modal>

    </div >
  );
};

export default MedicalRecordPage;