import React, { useEffect, useState } from "react";
import { User, Edit3, FileText, Save, X, Users, Car as IdCard, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileManagePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?._id;
    } catch {
      return null;
    }
  };

  const fetchProfiles = async () => {
    const userId = getUserId();
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/danhsachprofile/${userId}`);
      const data = await res.json();
      setProfiles(data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách hồ sơ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const res = await fetch(`/api/user/capnhatprofile/${editingProfile._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProfile),
      });

      if (res.ok) {
        alert("Cập nhật thành công");
        setEditingProfile(null);
        fetchProfiles();
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật hồ sơ:", error);
    }
  };



  useEffect(() => {
    fetchProfiles();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 font-medium">Đang tải...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Quản lý hồ sơ</h1>
          </div>
          <p className="text-gray-600">Quản lý và cập nhật thông tin hồ sơ cá nhân</p>
        </div>
        {/* Action Buttons */}
        <div className="flex space-x-3 mt-4 mb-4">
          <button
            onClick={() => navigate("/taoprofile")}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow"
          >
            <span>+ Tạo hồ sơ</span>
          </button>

          <button
            onClick={() => navigate("/nhanhosobenhan")}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow"
          >
            <span>Lấy hồ sơ bệnh án</span>
          </button>
        </div>

        {/* Profiles Grid */}
        <div className="grid gap-6 mb-8">
          {profiles.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chưa có hồ sơ nào</h3>
              <p className="text-gray-500">Bạn chưa có hồ sơ nào được tạo.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profiles.map((profile) => (
                <div
                  key={profile._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-300"
                >
                  <div className="p-6">
                    {/* Profile Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg">{profile.name}</h3>
                          <span className="text-sm text-gray-500">Hồ sơ cá nhân</span>
                        </div>
                      </div>
                    </div>

                    {/* Profile Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center space-x-3">
                        <IdCard className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-500">CCCD:</span>
                          <p className="font-medium text-gray-900">{profile.identityNumber}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <UserCheck className="w-4 h-4 text-gray-400" />
                        <div>
                          <span className="text-sm text-gray-500">Giới tính:</span>
                          <p className="font-medium text-gray-900">
                            {profile.gender === 'Male' ? 'Nam' : profile.gender === 'Female' ? 'Nữ' : 'Khác'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/medical-records/${profile._id}`)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                      >
                        <FileText className="w-4 h-4" />
                        <span>Xem bệnh án</span>
                      </button>
                      <button
                        onClick={() => setEditingProfile(profile)}
                        className="flex items-center justify-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Sửa</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Profile Modal */}
        {editingProfile && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Edit3 className="w-5 h-5 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Cập nhật hồ sơ</h3>
                  </div>
                  <button
                    onClick={() => setEditingProfile(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={editingProfile.name}
                      onChange={(e) =>
                        setEditingProfile({ ...editingProfile, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập họ và tên"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Số CCCD
                    </label>
                    <input
                      type="text"
                      value={editingProfile.identityNumber}
                      onChange={(e) =>
                        setEditingProfile({ ...editingProfile, identityNumber: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Nhập số CCCD"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Giới tính
                    </label>
                    <select
                      value={editingProfile.gender}
                      onChange={(e) =>
                        setEditingProfile({ ...editingProfile, gender: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="Male">Nam</option>
                      <option value="Female">Nữ</option>
                      <option value="Other">Khác</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mt-8">
                  <button
                    onClick={handleUpdateProfile}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-md"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu thay đổi</span>
                  </button>
                  <button
                    onClick={() => setEditingProfile(null)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Hủy</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileManagePage;