import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertCircle, Loader2, Search } from 'lucide-react';
import { Drawer, Descriptions, Table, List, Button, Input, Space } from 'antd';
import moment from 'moment';

const TestResultList = () => {
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewingResult, setViewingResult] = useState(null);
    const [searchName, setSearchName] = useState('');
    const [searchCCCD, setSearchCCCD] = useState('');
    const [searchDoctor, setSearchDoctor] = useState('');
    const navigate = useNavigate();

    const fetchTestResults = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || !token || !user._id) {
            setError('Vui lòng đăng nhập lại');
            navigate('/login');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await axios.get(`/api/doctor2/results/doctor/${user._id}`, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 10000,
            });

            if (res.data.success) {
                setResults(res.data.data || []);
                setFilteredResults(res.data.data || []);
            } else {
                setError(res.data.message || 'Không thể lấy danh sách kết quả xét nghiệm');
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

    useEffect(() => {
        fetchTestResults();
    }, [navigate]);

    useEffect(() => {
        const filtered = results.filter(result => {
            const patientName = result.procedureRequestId?.profileId?.name?.toLowerCase() || '';
            const cccd = result.procedureRequestId?.profileId?.identityNumber?.toLowerCase() || '';
            const doctorName = result.procedureRequestId?.doctorId?.name?.toLowerCase() || '';
            
            return (
                patientName.includes(searchName.toLowerCase()) &&
                cccd.includes(searchCCCD.toLowerCase()) &&
                doctorName.includes(searchDoctor.toLowerCase())
            );
        });
        setFilteredResults(filtered);
    }, [searchName, searchCCCD, searchDoctor, results]);

    const handleViewDetails = (result) => {
        setViewingResult(result);
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => index + 1,
            width: '5%',
        },
        {
            title: 'Tên bệnh nhân',
            dataIndex: 'procedureRequestId',
            key: 'patientName',
            render: (procedureRequestId) => procedureRequestId?.profileId?.name || 'Không có',
            width: '25%',
        },
        {
            title: 'Loại xét nghiệm',
            dataIndex: 'testType',
            key: 'testType',
            render: (testType) => {
                const testTypeMap = {
                    blood: 'Xét nghiệm máu',
                    urine: 'Xét nghiệm nước tiểu',
                    xray: 'X-quang',
                    ultrasound: 'Siêu âm',
                    ecg: 'Điện tâm đồ',
                    lipid: 'Xét nghiệm mỡ máu',
                };
                return testTypeMap[testType] || testType.toUpperCase();
            },
            width: '25%',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt) =>
                createdAt ? moment(createdAt).format('DD-MM-YYYY HH:mm') : 'Không có',
            width: '20%',
        },
        {
            title: 'Ghi chú',
            dataIndex: 'resultNote',
            key: 'resultNote',
            render: (resultNote) => resultNote || 'Không có',
            width: '25%',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <button
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                    onClick={() => handleViewDetails(record)}
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Xem chi tiết
                </button>
            ),
            width: '15%',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full mb-4 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Danh sách kết quả xét nghiệm</h1>
                    <p className="text-gray-600">Xem và quản lý các kết quả xét nghiệm đã thực hiện</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <div className="mb-6">
                            <Space direction="horizontal" size={12} className="w-full mb-4">
                                <Input
                                    placeholder="Tìm theo tên bệnh nhân"
                                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    className="w-1/3"
                                />
                                <Input
                                    placeholder="Tìm theo CCCD"
                                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                                    value={searchCCCD}
                                    onChange={(e) => setSearchCCCD(e.target.value)}
                                    className="w-1/3"
                                />
                                <Input
                                    placeholder="Tìm theo bác sĩ chỉ định"
                                    prefix={<Search className="w-4 h-4 text-gray-400" />}
                                    value={searchDoctor}
                                    onChange={(e) => setSearchDoctor(e.target.value)}
                                    className="w-1/3"
                                />
                            </Space>
                            <Button
                                type="primary"
                                onClick={fetchTestResults}
                                icon={<Loader2 className="w-4 h-4 mr-2" />}
                            >
                                Làm mới
                            </Button>
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
                        ) : filteredResults.length === 0 ? (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
                                <p className="text-blue-800 italic">
                                    Không có kết quả xét nghiệm nào.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table
                                    columns={columns}
                                    dataSource={filteredResults}
                                    rowKey="_id"
                                    pagination={{ pageSize: 10 }}
                                    className="text-sm text-gray-700"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <Drawer
                    title="Chi tiết kết quả xét nghiệm"
                    open={!!viewingResult}
                    onClose={() => setViewingResult(null)}
                    width={500}
                >
                    {viewingResult && (
                        <Descriptions column={1} bordered>
                            <Descriptions.Item label="Mã kết quả">
                                {viewingResult._id || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tên bệnh nhân">
                                {viewingResult.procedureRequestId?.profileId?.name || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="CCCD">
                                {viewingResult.procedureRequestId?.profileId?.identityNumber || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Bác sĩ yêu cầu">
                                {viewingResult.procedureRequestId?.doctorId?.name || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Loại xét nghiệm">
                                {(() => {
                                    const testTypeMap = {
                                        blood: 'Xét nghiệm máu',
                                        urine: 'Xét nghiệm nước tiểu',
                                        xray: 'X-quang',
                                        ultrasound: 'Siêu âm',
                                        ecg: 'Điện tâm đồ',
                                        lipid: 'Xét nghiệm mỡ máu',
                                    };
                                    return testTypeMap[viewingResult.testType] || viewingResult.testType.toUpperCase();
                                })()}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mã yêu cầu xét nghiệm">
                                {viewingResult.procedureRequestId?._id || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Mã hồ sơ y tế">
                                {viewingResult.procedureRequestId?.medicalRecordId?._id || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ghi chú">
                                {viewingResult.resultNote || 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày tạo">
                                {viewingResult.createdAt
                                    ? moment(viewingResult.createdAt).format('DD-MM-YYYY HH:mm')
                                    : 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày cập nhật">
                                {viewingResult.updatedAt
                                    ? moment(viewingResult.updatedAt).format('DD-MM-YYYY HH:mm')
                                    : 'Không có'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Chi tiết kết quả">
                                {viewingResult.resultDetails?.length > 0 ? (
                                    <List
                                        dataSource={viewingResult.resultDetails}
                                        renderItem={(detail) => (
                                            <List.Item>
                                                <div>
                                                    <strong>{detail.name}</strong> <br />
                                                    Giá trị: {detail.value || 'Không có'} <br />
                                                    Đơn vị: {detail.unit || 'Không có'} <br />
                                                    Phạm vi tham chiếu: {detail.referenceRange || 'Không có'}
                                                </div>
                                            </List.Item>
                                        )}
                                    />
                                ) : (
                                    'Không có'
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Drawer>
            </div>
        </div>
    );
};

export default TestResultList;