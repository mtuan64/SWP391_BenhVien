import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const UserMedicalProfileDetail = () => {

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { profileId } = useParams();
  const [activeTab, setActiveTab] = useState("send");
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    sampleType: "",
    collectionDate: "",
    containerType: "",
  });
  const [editId, setEditId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileDetail, setProfileDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: "",
    gender: "",
    sampleType: "",
    collectionDate: "",
    containerType: "",
  });

  const goBack = () => {
    navigate('/doctor/medical-profile');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const user = JSON.parse(localStorage.getItem("user"));

    const url = "http://localhost:9999/api/user-profile/create";
    const method = "POST";

    const response = await fetch(url, {
      method,
      body: JSON.stringify({ ...formData, userId: user._id }),
      headers: { 'Content-Type': 'application/json' }
    });

    setIsSubmitting(false);
    setShowSuccessDialog(true);
    setEditId(null);
    fetchProfileDetail();
  };

  const handleEditClick = (sample) => {
    setEditFormData({
      fullName: sample.fullName,
      gender: sample.gender,
      sampleType: sample.sampleType,
      collectionDate: sample.collectionDate?.slice(0, 10),
      containerType: sample.containerType,
    });
    setEditId(sample._id);
    setShowEditModal(true);
  };

  const submitEdit = async () => {
    try {
      const res = await fetch(`http://localhost:9999/api/user-profile/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      setProfileDetail(prev => prev.map(item =>
        item._id === editId ? updated.data : item
      ));

      setShowEditModal(false);
      setEditId(null);
    } catch (err) {
      alert("Update error: " + err.message);
    }
  };

  const handleEditChange = (field, value) => {
    setEditFormData(prev => ({ ...prev, [field]: value }));
  };

  const fetchProfileDetail = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9999/api/user-profile/all/${user._id}`);
      if (!response.ok) throw new Error("Can not load medical profile");
      const data = await response.json();
      setProfileDetail([...data.data]);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Error with loading data");
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user._id) {
      fetchProfileDetail();
    }
  }, [activeTab]);

  const updateResult = async (newResult) => {
    try {
      const response = await fetch(`http://localhost:9999/api/user-profile/${profileId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ result: newResult, status: "completed" }),
      });
      if (!response.ok) throw new Error("Can not update the result");
      const updated = await response.json();
      setProfileDetail(updated.data || updated);
      alert("Result Updated Successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!profileDetail) return <p>Can not find profile.</p>;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = profileDetail.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(profileDetail.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: "#f1f5f9",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {/* Tab Buttons */}
        <div
          style={{
            display: "flex",
            backgroundColor: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <button
            onClick={() => setActiveTab("send")}
            style={{
              flex: 1,
              padding: "16px 24px",
              backgroundColor: activeTab === "send" ? "white" : "transparent",
              color: activeTab === "send" ? "#3b82f6" : "#64748b",
              border: "none",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              borderBottom: activeTab === "send" ? "2px solid #3b82f6" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            📤 CREATE MEDICAL PROFILE
          </button>
          <button
            onClick={() => setActiveTab("list")}
            style={{
              flex: 1,
              padding: "16px 24px",
              backgroundColor: activeTab === "list" ? "white" : "transparent",
              color: activeTab === "list" ? "#3b82f6" : "#64748b",
              border: "none",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              borderBottom: activeTab === "list" ? "2px solid #3b82f6" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            📋 MEDICAL PROFILE LIST
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ padding: "32px" }}>
          {activeTab === "send" && (
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                NEW MEDICAL PROFILE
              </h2>
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "32px",
                  fontSize: "0.95rem",
                }}
              >

              </p>

              <form onSubmit={handleSubmit}>
                {/* Row 1: Tên Bệnh Nhân và Giới Tính */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "24px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Patient name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter patient fullname"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Gender <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        outline: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Choose gender</option>
                      <option value="Nam">Male</option>
                      <option value="Nữ">Female</option>
                      <option value="Khác">Other</option>
                    </select>
                  </div>
                </div>

                {/* Loại Thử Nghiệm */}
                <div style={{ marginBottom: "24px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    Type of test <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    value={formData.testType}
                    onChange={(e) => handleInputChange("sampleType", e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: "1px solid #d1d5db",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      outline: "none",
                      backgroundColor: "white",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Choose type of test</option>
                    <option value="Xét nghiệm máu">Xét nghiệm máu</option>
                    <option value="Xét nghiệm nước tiểu">Xét nghiệm nước tiểu</option>
                    <option value="Xét nghiệm COVID-19">Xét nghiệm COVID-19</option>
                    <option value="Xét nghiệm sinh hóa">Xét nghiệm sinh hóa</option>
                    <option value="Xét nghiệm vi sinh">Xét nghiệm vi sinh</option>
                    <option value="Xét nghiệm hormone">Xét nghiệm hormone</option>
                    <option value="Xét nghiệm miễn dịch">Xét nghiệm miễn dịch</option>
                    <option value="Xét nghiệm di truyền">Xét nghiệm di truyền</option>
                  </select>
                </div>

                {/* Row 2: Ngày Xét Nghiệm và Loại Chứa */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "32px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Date <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.testDate}
                      onChange={(e) => handleInputChange("collectionDate", e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px",
                      }}
                    >
                      Container Type <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      value={formData.containerType}
                      onChange={(e) => handleInputChange("containerType", e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "0.95rem",
                        outline: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Choose test tube</option>
                      <option value="Ống nghiệm EDTA">Ống nghiệm EDTA</option>
                      <option value="Ống nghiệm Heparin">Ống nghiệm Heparin</option>
                      <option value="Ống nghiệm không chất chống đông">
                        Ống nghiệm không chất chống đông
                      </option>
                      <option value="Cốc nhựa vô trùng">Cốc nhựa vô trùng</option>
                      <option value="Ống nghiệm VTM">Ống nghiệm VTM</option>
                      <option value="Lọ nhựa vô trùng">Lọ nhựa vô trùng</option>
                      <option value="Ống nghiệm Fluoride">Ống nghiệm Fluoride</option>
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    backgroundColor: isSubmitting ? "#9ca3af" : "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "14px 24px",
                    fontSize: "1rem",
                    fontWeight: "500",
                    borderRadius: "8px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s",
                  }}
                  onMouseOver={(e) => {
                    if (!isSubmitting) e.target.style.backgroundColor = "#2563eb"
                  }}
                  onMouseOut={(e) => {
                    if (!isSubmitting) e.target.style.backgroundColor = "#3b82f6"
                  }}
                >
                  {isSubmitting ? "⏳ Sending in progress..." : "📤 Send Medical Profile"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "list" && (
            <div>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#1e293b",
                  marginBottom: "8px",
                }}
              >
                MEDICAL PROFILE LIST
              </h2>
              <p
                style={{
                  color: "#64748b",
                  marginBottom: "32px",
                  fontSize: "0.95rem",
                }}
              >

              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {currentItems.map((sample) => (

                  <div key={sample._id}>


                    <div
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#fafafa",
                        transition: "background-color 0.2s",
                      }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fafafa")}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "12px",
                        }}
                      >
                        <h4 style={{ margin: 0, color: "#1e293b", fontSize: "1.1rem" }}>{sample._id}</h4>
                        <span
                          style={{
                            padding: "4px 12px",
                            borderRadius: "12px",
                            fontSize: "0.8rem",
                            backgroundColor: sample.gender === "Nam" ? "#dbeafe" : "#fce7f3",
                            color: sample.gender === "Nam" ? "#1d4ed8" : "#be185d",
                          }}
                        >
                          {sample.gender}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Patient:</strong> {sample.fullName}
                        </p>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Test type:</strong> {sample.sampleType}
                        </p>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Date:</strong> {new Date(sample.collectionDate).toLocaleDateString("vi-VN")}

                        </p>
                        <p style={{ margin: "4px 0" }}>
                          <strong>Container type:</strong> {sample.containerType}
                        </p>
                      </div>
                      <button
                        onClick={() => handleEditClick(sample)}
                        style={{
                          marginTop: "12px",
                          padding: "8px 16px",
                          backgroundColor: "#facc15",
                          color: "#1f2937",
                          border: "none",
                          borderRadius: "8px",
                          cursor: "pointer",
                          fontWeight: "500",
                        }}
                      >
                        📝 Update
                      </button>
                    </div>


                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      style={{
                        margin: '0 4px',
                        padding: '8px 12px',
                        backgroundColor: currentPage === i + 1 ? '#3b82f6' : '#e5e7eb',
                        color: currentPage === i + 1 ? 'white' : '#1f2937',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          )}
        </div>
      </div>
      {showSuccessDialog && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "12px",
              textAlign: "center",
              maxWidth: "400px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#10b981" }}>
              🎉 Send medical profile successfull!
            </h2>
            <button
              onClick={() => {
                setShowSuccessDialog(false);
                setActiveTab("list");
              }}
              style={{
                marginTop: "16px",
                padding: "12px 24px",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              ⬅️ View Medical Profile List
            </button>

          </div>
        </div>
      )}


      {showEditModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 10000
        }}>
          <div style={{
            background: "white", padding: "24px", borderRadius: "12px",
            width: "500px", maxWidth: "95%"
          }}>
            <h3 style={{ marginBottom: "16px" }}>📝 Update Medical Profile</h3>

            {/* Form fields */}
            <input type="text" value={editFormData.fullName}
              placeholder="Full name"
              onChange={e => handleEditChange("fullName", e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />

            <select value={editFormData.gender}
              onChange={e => handleEditChange("gender", e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "12px" }}>
              <option value="">Gender</option>
              <option value="Nam">Male</option>
              <option value="Nữ">Female</option>
              <option value="Khác">Other</option>
            </select>

            <input type="text" value={editFormData.sampleType}
              placeholder="Sample type"
              onChange={e => handleEditChange("sampleType", e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />

            <input type="date" value={editFormData.collectionDate}
              onChange={e => handleEditChange("collectionDate", e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "12px" }} />

            <input type="text" value={editFormData.containerType}
              placeholder="Container type"
              onChange={e => handleEditChange("containerType", e.target.value)}
              style={{ width: "100%", padding: "8px", marginBottom: "16px" }} />

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button onClick={() => setShowEditModal(false)}
                style={{ padding: "8px 16px", background: "#e5e7eb", border: "none", borderRadius: "6px" }}>
                Cancel
              </button>
              <button onClick={submitEdit}
                style={{ padding: "8px 16px", background: "#3b82f6", color: "white", border: "none", borderRadius: "6px" }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}


    </div>

  );
};

export default UserMedicalProfileDetail;
