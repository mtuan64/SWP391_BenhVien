import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/QAHistories.css";

const QAHistories = () => {
  const [qaHistory, setQAHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const navigate = useNavigate();

  const fetchQAHistory = async (userId) => {
    setHistoryLoading(true);
    try {
      const res = await axios.get("/api/user/qahistory", {
        params: { idUser: userId, page: 1, limit: 10 },
      });
      setQAHistory(res.data.data || []);
    } catch (error) {
      console.error("Lỗi khi tải lịch sử QA:", error);
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user._id) {
      fetchQAHistory(user._id);
    }
  }, []);

  const handleCreateNewQA = () => {
    navigate("/qa"); // Điều hướng sang trang tạo QA mới
  };

  return (
    <div className="sendqa-container">
      <h2 className="sendqa-title">Lịch Sử Câu Hỏi & Hỗ Trợ</h2>

      <div className="animate-fade-in">
        {historyLoading ? (
          <p className="text-center text-gray-600">Đang tải lịch sử...</p>
        ) : qaHistory.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="sendqa-history-table">
                <thead>
                  <tr>
                    <th>Tiêu đề</th>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                    <th>Phản hồi</th>
                    <th>Ngày tạo</th>
                  </tr>
                </thead>
                <tbody>
                  {qaHistory.map((qa) => (
                    <tr key={qa._id}>
                      <td>{qa.title}</td>
                      <td className="truncate" style={{ maxWidth: "20rem" }}>
                        {qa.message}
                      </td>
                      <td>{qa.status || "Chờ xử lý"}</td>
                      <td>{qa.reply || "---"}</td>
                      <td>{new Date(qa.createdAt).toLocaleDateString("vi-VN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              className="sendqa-create-new-btn"
              onClick={handleCreateNewQA}
              type="button"
            >
              Tạo QA mới
            </button>
          </>
        ) : (
          <>
            <p className="sendqa-history-empty">Chưa có yêu cầu nào.</p>
            <button
              className="sendqa-create-new-btn"
              onClick={handleCreateNewQA}
              type="button"
            >
              Tạo QA mới
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default QAHistories;
