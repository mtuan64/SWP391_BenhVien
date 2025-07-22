import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/css/QnA.css';
const QnAView = () => {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("");
  const [searchId, setSearchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [replyMessages, setReplyMessages] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/staff/qa', {
  params: { sort, searchId, statusfilter: statusFilter, page, limit: 5 }
});

      setQuestions(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [sort, searchId, statusFilter, page]);

  const handleReply = async (id) => {
    const replyMessage = replyMessages[id];
    if (!replyMessage) return alert("Vui lòng nhập nội dung phản hồi.");

    try {
      await axios.put(`/api/staff/qa/${id}`, { replyMessage });
      alert("Phản hồi thành công!");
      fetchQuestions();
    } catch (error) {
      console.error("Lỗi khi phản hồi:", error);
      alert("Có lỗi xảy ra.");
    }
  };

  return (
    <div className="container">
      <h1>Quản lý Q&A</h1>

      {/* Bộ lọc */}
      <div className="filter-section">
        <input
          type="text"
          placeholder="Tìm theo User ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />

        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ phản hồi</option>
          <option value="answered">Đã phản hồi</option>
          <option value="closed">Đã đóng</option>
        </select>

        <select onChange={(e) => setSort(e.target.value)} value={sort}>
          <option value="">Mới nhất</option>
          <option value="createdAt_asc">Cũ nhất</option>
          <option value="createdAt_desc">Mới nhất</option>
        </select>

        <button onClick={() => setPage(1)}>Lọc</button>
      </div>

      {/* Danh sách câu hỏi */}
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="question-card">
            <h3>{q.title}</h3>
            <p><strong>Email:</strong> {q.email}</p>
            <p><strong>Nội dung:</strong> {q.message}</p>
            <p><strong>Trạng thái:</strong> {q.status}</p>

            {q.status === "pending" ? (
              <div>
                <textarea
                  placeholder="Nhập phản hồi..."
                  value={replyMessages[q._id] || ""}
                  onChange={(e) =>
                    setReplyMessages({ ...replyMessages, [q._id]: e.target.value })
                  }
                />
                <button onClick={() => handleReply(q._id)}>Gửi phản hồi</button>
              </div>
            ) : (
              <>
                <p><strong>Phản hồi:</strong> {q.reply}</p>
                {q.repliedAt && (
                  <p><strong>Thời gian phản hồi:</strong> {new Date(q.repliedAt).toLocaleString()}</p>
                )}
              </>
            )}
          </div>
        ))
      )}

      {/* Phân trang */}
      <div className="pagination">
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Trang trước
        </button>
        <span>Trang {page} / {totalPages}</span>
        <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>
          Trang sau
        </button>
      </div>
    </div>
  );
};

export default QnAView;
