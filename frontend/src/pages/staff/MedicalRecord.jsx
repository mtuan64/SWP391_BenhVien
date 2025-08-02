import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function MedicalRecord() {
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [procedureResult, setProcedureResult] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [search, gender, sortBy, page]);

  const fetchProfiles = async () => {
    try {
      const res = await axios.get('/api/doctor/danhsachhosocuatatcabenhnhan', {
        params: { search, gender, sortBy, page, limit },
      });
      setProfiles(res.data.profiles);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Loi khi lay danh sach profile', err);
    }
  };

  const fetchMedicalRecords = async (profileId) => {
    try {
      const res = await axios.get('/api/doctor/danhsachhosobenhancuabenhnhan', {
        params: { profileId },
      });
      setMedicalRecords(res.data);
    } catch (err) {
      console.error('Loi khi lay ho so benh an', err);
    }
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    fetchMedicalRecords(profile._id);
    setIsModalOpen(true);
  };

  const handleViewResult = async (service) => {
    setSelectedService(service);
    try {
      const res = await axios.get('/api/doctor/ketquakham', {
        params: {
          procedureRequestId: service.procedureRequestId,
          testType: service.testType
        }
      });
      setProcedureResult(res.data);
      setResultModalOpen(true);
    } catch (err) {
      console.error('Loi khi lay ket qua dich vu', err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Danh sach benh nhan</h2>

      <div className="flex gap-3 mb-4">
        <input type="text" placeholder="Tim ten hoac CCCD" className="border p-2 rounded" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border p-2 rounded" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Tat ca gioi tinh</option>
          <option value="Male">Nam</option>
          <option value="Female">Nu</option>
          <option value="Other">Khac</option>
        </select>
        <select className="border p-2 rounded" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sap xep theo ten</option>
          <option value="createdAt">Sap xep theo ngay tao</option>
        </select>
      </div>

      <table className="table-auto w-full border mb-8">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Ten</th>
            <th className="border px-4 py-2">CCCD</th>
            <th className="border px-4 py-2">Gioi tinh</th>
            <th className="border px-4 py-2">Ngay sinh</th>
            <th className="border px-4 py-2">Xem</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((p) => (
            <tr key={p._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.identityNumber}</td>
              <td className="border px-4 py-2">{p.gender}</td>
              <td className="border px-4 py-2">{new Date(p.dateOfBirth).toLocaleDateString()}</td>
              <td className="border px-4 py-2 text-center">
                <button onClick={() => handleView(p)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {total > limit && (
        <div className="flex justify-center mt-4 gap-2">
          {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded shadow-lg max-w-4xl mx-auto my-10 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <button className="text-right text-red-500 font-bold mb-2" onClick={() => setIsModalOpen(false)}>Đóng</button>

        {selectedProfile && (
          <>
            <h3 className="text-xl font-semibold mb-4">Hồ sơ bệnh án của: {selectedProfile.name}</h3>
            {medicalRecords.length === 0 ? (
              <p>Chưa có hồ sơ bệnh án nào.</p>
            ) : (
              <table className="table-auto w-full border">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border px-4 py-2">Ngày tạo</th>
                    <th className="border px-4 py-2">Triệu chứng</th>
                    <th className="border px-4 py-2">Chẩn đoán</th>
                    <th className="border px-4 py-2">Kết luận</th>
                    <th className="border px-4 py-2">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {medicalRecords.map((record) => (
                    <React.Fragment key={record._id}>
                      <tr>
                        <td className="border px-4 py-2">{new Date(record.createdAt).toLocaleString()}</td>
                        <td className="border px-4 py-2">{record.symptoms || '-'}</td>
                        <td className="border px-4 py-2">{record.diagnosis || '-'}</td>
                        <td className="border px-4 py-2">{record.conclusion || '-'}</td>
                        <td className="border px-4 py-2">{record.status}</td>
                      </tr>
                      {record.procedureRequests?.map((req, idx) => (
                        <tr key={req._id} className="bg-gray-50">
                          <td colSpan={5} className="border px-4 py-2">
                            <p className="font-semibold mb-2">Yêu cầu thủ tục #{idx + 1}</p>
                            {req.services?.map((service, idx2) => (
                              <div key={idx2} className="ml-4 mt-2 border-l-4 pl-2 border-blue-300">
                                <p>- Dịch vụ: {service.testType}</p>
                                <p>- Trạng thái: {service.status}</p>
                                <button
                                  className="text-blue-500 underline"
                                  onClick={() => {
                                    // Debug in log
                                    console.log("procedureRequestId:", req._id);
                                    console.log("testType:", service.testType);

                                    handleViewResult({
                                      ...service,
                                      procedureRequestId: req._id,
                                    });
                                  }}
                                >
                                  📄 Xem kết quả
                                </button>
                              </div>
                            ))}
                          </td>
                        </tr>
                      ))}

                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </Modal>

      <Modal
        isOpen={resultModalOpen}
        onRequestClose={() => setResultModalOpen(false)}
        className="bg-white p-6 rounded shadow-lg max-w-2xl mx-auto my-10 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <button className="text-right text-red-500 font-bold mb-2" onClick={() => setResultModalOpen(false)}>Đóng</button>
        {procedureResult ? (
          <>
            <h3 className="text-lg font-semibold mb-2">Kết quả xét nghiệm ({procedureResult.testType})</h3>
            <p><strong>Ghi chú:</strong> {procedureResult.resultNote || 'Không có'}</p>
            <table className="w-full border mt-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Tên chỉ số</th>
                  <th className="border px-2 py-1">Giá trị</th>
                  <th className="border px-2 py-1">Đơn vị</th>
                  <th className="border px-2 py-1">Khoảng tham chiếu</th>
                </tr>
              </thead>
              <tbody>
                {procedureResult.resultDetails.map((r, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{r.name}</td>
                    <td className="border px-2 py-1">{r.value}</td>
                    <td className="border px-2 py-1">{r.unit || '-'}</td>
                    <td className="border px-2 py-1">{r.referenceRange || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>Đang tải dữ liệu...</p>
        )}
      </Modal>
    </div>
  );
}

export default MedicalRecord;
