import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../context/authContext';

const AddMedicalRecord = ({ propPatientId, propDoctorId }) => {
    const { user } = useAuth();
    const [accountId, setAccountId] = useState('');
    const [patientId, setPatientId] = useState('');
    const [doctorId, setDoctorId] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [treatment, setTreatment] = useState('');
    const [notes, setNotes] = useState('');
    const [profiles, setProfiles] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Hàm formatDate
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('vi-VN');
    };

    // Lấy danh sách bác sĩ
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/apm/doctors');
                const data = await response.json();
                if (data.success) {
                    setDoctors(data.data.map(doctor => ({
                        id: doctor._id,
                        name: doctor.name
                    })));
                } else {
                    setError('Không thể tải danh sách bác sĩ');
                }
            } catch (err) {
                setError('Lỗi kết nối server khi tải bác sĩ');
            }
        };
        fetchDoctors();
    }, []);

    // Lấy danh sách profiles khi accountId thay đổi
    useEffect(() => {
        const fetchProfiles = async () => {
            if (accountId && accountId.length === 24) {
                try {
                    setError('');
                    setProfiles([]);
                    setPatientId('');
                    const response = await fetch(`http://localhost:9999/api/apm/${accountId}/profiles`);
                    const data = await response.json();
                    if (data.success) {
                        setProfiles(data.data.map(profile => ({
                            id: profile._id,
                            name: profile.name,
                            gender: profile.gender,
                            dateOfBirth: profile.dateOfBirth
                        })));
                    } else {
                        setError(data.message);
                    }
                } catch (err) {
                    setError('Lỗi kết nối server khi tải hồ sơ');
                }
            } else if (accountId) {
                setError('ID tài khoản phải là 24 ký tự');
                setProfiles([]);
                setPatientId('');
            } else {
                setProfiles([]);
                setPatientId('');
                setError('');
            }
        };
        fetchProfiles();
    }, [accountId]);

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await fetch('http://localhost:9999/api/checkup/medical-record', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: accountId,
                    profileId: patientId,
                    doctorId: doctorId,
                    diagnose: diagnosis,
                    treatment,
                    notes
                })
            });
            const data = await response.json();
            if (data.success) {
                setSuccess('Tạo hồ sơ bệnh án thành công!');
                setAccountId('');
                setPatientId('');
                setDoctorId('');
                setDiagnosis('');
                setTreatment('');
                setNotes('');
                setProfiles([]);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Lỗi kết nối server khi tạo hồ sơ');
        }
    };

    return (
        <div className="container my-4">
            <h2 className="text-2xl font-bold mb-4">Tạo hồ sơ bệnh án</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">ID account</label>
                    <input
                        type="text"
                        name="accountId"
                        className="form-control"
                        placeholder="Enter account ID"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hồ sơ bệnh nhân</label>
                    <select
                        className="form-control"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                        disabled={!!propPatientId || !profiles.length}
                    >

                        <option value="">Chọn hồ sơ</option>
                        {profiles.map(profile => (
                            <option key={profile.id} value={profile.id}>
                                {profile.name} ({profile.gender}, {formatDate(profile.dateOfBirth)})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Bác sĩ</label>
                    <select
                        className="form-control"
                        value={doctorId}
                        onChange={(e) => setDoctorId(e.target.value)}
                        required
                        disabled={!!propDoctorId || user?.role === 'Doctor'}
                    >
                        <option value="">Chọn bác sĩ</option>
                        {doctors.map(doctor => (
                            // check mỗi item có _id không

                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Chẩn đoán</label>
                    <textarea
                        className="form-control"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
                        placeholder="Nhập chẩn đoán"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Phương pháp điều trị</label>
                    <textarea
                        className="form-control"
                        value={treatment}
                        onChange={(e) => setTreatment(e.target.value)}
                        placeholder="Nhập phương pháp điều trị"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ghi chú</label>
                    <textarea
                        className="form-control"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Nhập ghi chú (tùy chọn)"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Tạo hồ sơ
                </button>
            </form>
        </div>
    );
};

export default AddMedicalRecord;