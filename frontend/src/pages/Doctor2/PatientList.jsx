import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PatientList = () => {
  const [procedureRequests, setProcedureRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchProcedureRequests = useCallback(async () => {
    if (!user || !token) {
      setError('Vui lòng đăng nhập lại - User or token missing');
      navigate('/login');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get('/api/doctor2/procedure-requests', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setProcedureRequests(res.data.data || []);
      } else {
        setError(res.data.message || 'Không thể lấy danh sách yêu cầu xét nghiệm');
      }
    } catch (err) {
      console.error('Error fetching procedure requests:', err.response ? err.response.data : err.message);
      if (err.response?.status === 429) {
        setError('Quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.');
      } else if (err.response?.status === 401) {
        setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        navigate('/login');
      } else {
        setError('Lỗi khi lấy danh sách yêu cầu xét nghiệm: ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  }, [user, token, navigate]);

  useEffect(() => {
    fetchProcedureRequests();
  }, [fetchProcedureRequests]);

  useEffect(() => {
    // Filter requests based on selected date
    const filtered = procedureRequests.filter(request => {
      if (!request.requestedAt) return false;
      const requestDate = new Date(request.requestedAt).toISOString().split('T')[0];
      return requestDate === selectedDate;
    });
    setFilteredRequests(filtered);
  }, [procedureRequests, selectedDate]);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <label className="font-semibold">Chọn ngày:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>

      {error && (
        <p className="text-red-500 mb-4 font-medium">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-600 italic">Đang tải dữ liệu...</p>
      ) : filteredRequests.length === 0 ? (
        <p className="text-gray-600 italic">Không có yêu cầu xét nghiệm nào cho ngày đã chọn.</p>
      ) : (
        <div className="overflow-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700 font-semibold text-left">
              <tr>
                <th className="px-4 py-2 border">STT</th>
                <th className="px-4 py-2 border">Tên bệnh nhân</th>
                <th className="px-4 py-2 border">CCCD</th>
                <th className="px-4 py-2 border">Bác sĩ yêu cầu</th>
                <th className="px-4 py-2 border">Ngày yêu cầu</th>
                <th className="px-4 py-2 border">Trạng thái</th>
                <th className="px-4 py-2 border text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{request.profile?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">{request.profile?.identityNumber || 'N/A'}</td>
                  <td className="px-4 py-2 border">{request.referringDoctor?.name || 'N/A'}</td>
                  <td className="px-4 py-2 border">
                    {request.requestedAt
                      ? new Date(request.requestedAt).toLocaleDateString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2 border">{request.status || 'N/A'}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                      disabled
                    >
                      Xét nghiệm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;