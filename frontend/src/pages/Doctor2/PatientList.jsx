import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Stethoscope, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { Drawer, Descriptions, List, Button } from 'antd';
import moment from 'moment';

const PatientList = () => {
  const [procedureRequests, setProcedureRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [viewingRequest, setViewingRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProcedureRequests = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = localStorage.getItem('token');

      if (!user || !token) {
        setError('Vui lòng đăng nhập lại');
        navigate('/login');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`/api/doctor2/procedure-requests/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });

        if (res.data.success) {
          setProcedureRequests(res.data.data || []);
        } else {
          setError(res.data.message || 'Không thể lấy danh sách yêu cầu xét nghiệm');
        }
      } catch (err) {
        console.error('Lỗi lấy dữ liệu:', err);
        if (err.response?.status === 429) {
          setError('Quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.');
        } else if (err.response?.status === 401) {
          setError('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          navigate('/login');
        } else {
          setError('Lỗi hệ thống: ' + (err.response?.data?.message || err.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProcedureRequests();
  }, [navigate]);

  useEffect(() => {
    const filtered = procedureRequests
      .filter((request) => {
        if (!request.requestedAt) return false;
        const requestDate = new Date(request.requestedAt).toISOString().split('T')[0];
        return requestDate === selectedDate;
      })
      .sort((a, b) => new Date(a.requestedAt) - new Date(b.requestedAt)); // Sort by requestedAt time
    setFilteredRequests(filtered);
  }, [procedureRequests, selectedDate]);

  const handleViewDetails = (request) => {
    setViewingRequest(request);
  };

  const handleTestClick = (procedureRequestId, serviceId, testType) => {
    navigate('/doctor2/lab-tests', { state: { procedureRequestId, serviceId, testType } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách yêu cầu xét nghiệm</h1>
          <p className="text-gray-600">Xem và quản lý các yêu cầu xét nghiệm được giao</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Chọn ngày
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:bg-gray-100"
              />
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl flex items-center space-x-3 bg-red-50 border border-red-200 text-red-800">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                <p className="text-blue-800 italic">
                  Không có yêu cầu xét nghiệm nào cho ngày đã chọn.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 text-left">
                    <tr>
                      <th className="py-3 px-4 font-semibold">STT</th>
                      <th className="py-3 px-4 font-semibold">Tên bệnh nhân</th>
                      <th className="py-3 px-4 font-semibold">CCCD</th>
                      <th className="py-3 px-4 font-semibold">Bác sĩ yêu cầu</th>
                      <th className="py-3 px-4 font-semibold">Dịch vụ</th>
                      <th className="py-3 px-4 font-semibold">Loại xét nghiệm</th>
                      <th className="py-3 px-4 font-semibold">Trạng thái</th>
                      <th className="py-3 px-4 font-semibold">Ngày yêu cầu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request, index) =>
                      request.services.map((service, serviceIndex) => (
                        <tr key={`${request._id}-${service._id}`} className="border-b hover:bg-gray-50">
                          {serviceIndex === 0 && (
                            <>
                              <td className="py-3 px-4">{index + 1}</td>
                              <td className="py-3 px-4">
                                <button
                                  className="text-blue-600 hover:text-blue-800 flex items-center"
                                  onClick={() => handleViewDetails(request)}
                                >
                                  <User className="w-4 h-4 mr-2" />
                                  {request.profile?.name || 'N/A'}
                                </button>
                              </td>
                              <td className="py-3 px-4">{request.profile?.identityNumber || 'N/A'}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <Stethoscope className="w-4 h-4 mr-2 text-purple-600" />
                                  {request.referringDoctor?.name || 'N/A'}
                                </div>
                              </td>
                            </>
                          )}
                          <td className="py-3 px-4">{service.serviceName || 'N/A'}</td>
                          <td className="py-3 px-4">{service.testType || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-white ${
                                service.status === 'Completed'
                                  ? 'bg-green-500'
                                  : 'bg-red-500'
                              }`}
                            >
                              {service.status || 'N/A'}
                            </span>
                          </td>
                          {serviceIndex === 0 && (
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2 text-orange-600" />
                                {request.requestedAt
                                  ? moment(request.requestedAt).format('DD-MM-YYYY HH:mm')
                                  : 'N/A'}
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <Drawer
          title="Chi tiết yêu cầu xét nghiệm"
          open={!!viewingRequest}
          onClose={() => setViewingRequest(null)}
          width={400}
        >
          {viewingRequest && (
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tên bệnh nhân">
                {viewingRequest.profile?.name || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Số CMND/CCCD">
                {viewingRequest.profile?.identityNumber || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Bác sĩ yêu cầu">
                {viewingRequest.referringDoctor?.name || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Mã hồ sơ y tế">
                {viewingRequest.medicalRecordId || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {viewingRequest.status || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày yêu cầu">
                {viewingRequest.requestedAt
                  ? moment(viewingRequest.requestedAt).format('DD-MM-YYYY HH:mm')
                  : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày tạo">
                {viewingRequest.createdAt
                  ? moment(viewingRequest.createdAt).format('DD-MM-YYYY HH:mm')
                  : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày cập nhật">
                {viewingRequest.updatedAt
                  ? moment(viewingRequest.updatedAt).format('DD-MM-YYYY HH:mm')
                  : 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Dịch vụ">
                {viewingRequest.services?.length > 0 ? (
                  <List
                    dataSource={viewingRequest.services}
                    renderItem={(service) => (
                      <List.Item>
                        <div>
                          <strong>{service.serviceName || 'N/A'}</strong> <br />
                          Loại xét nghiệm: {service.testType || 'N/A'} <br />
                          Giá: {service.servicePrice
                            ? `${service.servicePrice.toLocaleString('vi-VN')} VNĐ`
                            : 'N/A'} <br />
                          Trạng thái: 
                          <span
                            className={`inline-flex items-center px-3 py-1 ml-2 rounded-full text-white ${
                              service.status === 'Completed'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}
                          >
                            {service.status || 'N/A'}
                          </span> <br />
                          Thời gian: {service.scheduledTime
                            ? moment(service.scheduledTime).format('DD-MM-YYYY HH:mm')
                            : 'Chưa lên lịch'} <br />
                          Ghi chú: {service.resultNote || 'Chưa có'}
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  '—'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Kết quả">
                {viewingRequest.services?.length > 0 ? (
                  <List
                    dataSource={viewingRequest.services}
                    renderItem={(service) => (
                      <List.Item>
                        {service.status === 'Completed' && (
                          <div>
                            <strong>{service.serviceName || 'N/A'}</strong>: Kết quả đã hoàn thành
                          </div>
                        )}
                        {service.status !== 'Completed' && (
                          <div>
                            <strong>{service.serviceName || 'N/A'}</strong>: Chưa có kết quả
                          </div>
                        )}
                      </List.Item>
                    )}
                  />
                ) : (
                  '—'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Hành động">
                {viewingRequest.services?.length > 0 ? (
                  <List
                    dataSource={viewingRequest.services}
                    renderItem={(service) => (
                      <List.Item>
                        <div>
                          <strong>{service.serviceName || 'N/A'}</strong>
                          {service.status !== 'Completed' && (
                            <Button
                              type="primary"
                              onClick={() => handleTestClick(viewingRequest._id, service._id, service.testType)}
                              className="ml-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                            >
                              Xét nghiệm
                            </Button>
                          )}
                          {service.status === 'Completed' && (
                            <span className="ml-4 text-green-600 font-semibold">Hoàn thành</span>
                          )}
                        </div>
                      </List.Item>
                    )}
                  />
                ) : (
                  '—'
                )}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default PatientList;