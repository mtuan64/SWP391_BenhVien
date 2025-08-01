import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Loader2, AlertCircle } from 'lucide-react';
import { Form, Input, Button, message } from 'antd';

const LabTest = () => {
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const location = useLocation();
  const navigate = useNavigate();

  const { procedureRequestId, serviceId, testType } = location.state || {};

  useEffect(() => {
    console.log('Received state:', { procedureRequestId, serviceId, testType }); // Thêm log để debug
    const fetchParameters = async () => {
      if (!testType || !procedureRequestId || !serviceId) {
        setError('Thiếu thông tin yêu cầu xét nghiệm, dịch vụ hoặc loại xét nghiệm');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:9999/api/doctor2/parameters/${testType}`, {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 10000,
        });

        if (res.data.success) {
          setParameters(res.data.data || []);
        } else {
          setError(res.data.message || 'Không thể lấy thông số xét nghiệm');
        }
      } catch (err) {
        console.error('Lỗi lấy thông số:', err);
        setError('Lỗi hệ thống: ' + (err.message || 'Network Error') + ' (Mã lỗi: ' + err.response?.status + ')');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchParameters();
  }, [testType, procedureRequestId, serviceId, navigate]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const resultDetails = parameters.map((param) => ({
        name: param.name,
        value: values[param.name],
        unit: param.unit,
        referenceRange: param.referenceRange,
      }));

      const res = await axios.post(
        'http://localhost:9999/api/doctor2/submit',
        {
          procedureRequestId,
          serviceId,
          testType,
          resultDetails,
          resultNote: values.resultNote,
        },
        { headers: { Authorization: `Bearer ${token}` }, timeout: 10000 }
      );

      if (res.data.success) {
        message.success('Kết quả xét nghiệm đã được gửi thành công!');
        navigate('/doctor2/procedure-requests');
      } else {
        message.error(res.data.message || 'Không thể gửi kết quả xét nghiệm');
      }
    } catch (err) {
      console.error('Lỗi gửi kết quả:', err);
      message.error('Lỗi hệ thống: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full mb-4 shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nhập kết quả xét nghiệm</h1>
          <p className="text-gray-600">Điền các thông số xét nghiệm cho {testType || 'N/A'}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
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
          ) : (
            <Form form={form} layout="vertical" onFinish={onFinish}>
              {parameters.map((param) => (
                <Form.Item
                  key={param.name}
                  name={param.name}
                  label={`${param.name} (${param.unit || ''}, Tham chiếu: ${param.referenceRange || 'N/A'})`}
                  rules={[{ required: true, message: `Vui lòng nhập ${param.name}` }]}
                >
                  <Input placeholder={`Nhập giá trị ${param.name}`} />
                </Form.Item>
              ))}
              <Form.Item name="resultNote" label="Ghi chú">
                <Input.TextArea rows={4} placeholder="Nhập ghi chú (nếu có)" />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                >
                  Gửi kết quả
                </Button>
              </Form.Item>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LabTest;