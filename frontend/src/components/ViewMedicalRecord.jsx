import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/authContext';

const ViewMedicalRecords = ({ profileId }) => {
    const { user, loading: authLoading } = useAuth();
    const [records, setRecords] = useState([]);
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileId, setSelectedProfileId] = useState(profileId || '');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingRecordId, setEditingRecordId] = useState(null);
    const [editForm, setEditForm] = useState({
        diagnose: '',
        treatment: '',
        notes: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('token');

                // Fetch profiles
                const profileResponse = await axios.get(
                    // `http://localhost:9999/api/apm/${user?._id}/profiles`,
                    `http://localhost:9999/api/apm/684e7597c7efedc32ca55271/profiles`,

                    {
                        headers: { Authorization: `Bearer ${token}` },
                        timeout: 5000,
                    }
                );
                const fetchedProfiles = Array.isArray(profileResponse.data?.data)
                    ? profileResponse.data.data.map(profile => ({
                        id: profile._id,
                        name: profile.name,
                        dateOfBirth: profile.dateOfBirth,
                        gender: profile.gender,
                    }))
                    : [];
                setProfiles(fetchedProfiles);

                // Fetch records if selectedProfileId is set
                if (selectedProfileId) {
                    const recordResponse = await axios.get(
                        `http://localhost:9999/api/checkup/medical-records`,
                        {
                            params: { profileId: selectedProfileId },
                            headers: { Authorization: `Bearer ${token}` },
                            timeout: 5000,
                        }
                    );
                    setRecords(recordResponse.data?.data || []);
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.response?.data?.message || 'Lỗi khi tải dữ liệu hồ sơ hoặc bệnh án');
                setLoading(false);
            }
        };

        if (user?._id && !authLoading) {
            fetchData();
        } else if (!authLoading) {
            setError('Vui lòng đăng nhập để tải dữ liệu');
            setLoading(false);
        }
    }, [user?._id, selectedProfileId, authLoading]);

    const formatDate = (date) => (date ? new Date(date).toLocaleDateString('vi-VN') : 'N/A');

    const handleEditClick = (record) => {
        setEditingRecordId(record._id);
        setEditForm({
            diagnose: record.diagnose || '',
            treatment: record.treatment || '',
            notes: record.notes || ''
        });
    };

    const handleSave = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:9999/api/checkup/medical-records/${editingRecordId}`,
                editForm,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const updatedRecords = records.map(r =>
                r._id === editingRecordId ? { ...r, ...editForm } : r
            );
            setRecords(updatedRecords);
            setEditingRecordId(null);
        } catch (err) {
            console.error('Lỗi khi cập nhật hồ sơ:', err);
            alert('Cập nhật thất bại');
        }
    };

    if (authLoading || loading) return <div className="text-center">Đang tải...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container my-4">
            <h2 className="text-2xl font-bold mb-4">Xem hồ sơ bệnh án</h2>
            <div className="mb-3">
                <label className="form-label">Hồ sơ bệnh nhân</label>
                <select
                    className="form-control"
                    value={selectedProfileId}
                    onChange={(e) => setSelectedProfileId(e.target.value)}
                    required
                >
                    <option value="">Chọn hồ sơ</option>
                    {profiles.map((profile) => (
                        <option key={profile.id} value={profile.id}>
                            {profile.name} ({profile.gender}, {formatDate(profile.dateOfBirth)})
                        </option>
                    ))}
                </select>
            </div>
            {selectedProfileId ? (
                records.length === 0 ? (
                    <div className="text-center">Không có hồ sơ bệnh án nào</div>
                ) : (
                    <div className="row">
                        {records.length === 0 ? (
                            <div className="col-12">
                                <div className="card p-3 text-center">
                                    <h5 className="card-title">Không có hồ sơ bệnh án nào</h5>
                                </div>
                            </div>
                        ) : (
                            records.map((record) => (
                                <div key={record._id} className="col-12 mb-3">
                                    <div className="card p-3">
                                        <h5 className="card-title">Hồ sơ ngày {formatDate(record.createdAt)}</h5>

                                        {editingRecordId === record._id ? (
                                            <>
                                                <div className="mb-2">
                                                    <label>Chẩn đoán</label>
                                                    <input
                                                        className="form-control"
                                                        value={editForm.diagnose}
                                                        onChange={(e) => setEditForm({ ...editForm, diagnose: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label>Điều trị</label>
                                                    <input
                                                        className="form-control"
                                                        value={editForm.treatment}
                                                        onChange={(e) => setEditForm({ ...editForm, treatment: e.target.value })}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label>Ghi chú</label>
                                                    <textarea
                                                        className="form-control"
                                                        value={editForm.notes}
                                                        onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                                                    />
                                                </div>
                                                <button className="btn btn-success me-2" onClick={handleSave}>
                                                    Lưu
                                                </button>
                                                <button className="btn btn-secondary" onClick={() => setEditingRecordId(null)}>
                                                    Hủy
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <p><strong>Bệnh nhân:</strong> {record.profileId?.name || 'N/A'}</p>
                                                <p><strong>Bác sĩ:</strong> {record.doctorId?.name || 'N/A'}</p>
                                                <p><strong>Chẩn đoán:</strong> {record.diagnose || 'N/A'}</p>
                                                <p><strong>Điều trị:</strong> {record.treatment || 'N/A'}</p>
                                                <p><strong>Ghi chú:</strong> {record.notes || 'Không có'}</p>
                                                <button className="btn btn-primary" onClick={() => handleEditClick(record)}>
                                                    Chỉnh sửa
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                )
            ) : (
                <div className="text-center">Vui lòng chọn một hồ sơ để xem bệnh án</div>
            )}
        </div>
    );
};

export default ViewMedicalRecords;
