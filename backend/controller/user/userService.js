const Profile = require("../../models/Profile");
const User = require("../../models/User");

exports.getMyProfiles = async (req, res) => {
  try {
    const UserId = req.user.id;

    // Lấy danh sách ID hồ sơ từ tài khoản
    const user = await User.findById(UserId);
    if (!user) return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    const profileIds = user.profiles || [];

    // Lấy thông tin hồ sơ
    const profiles = await Profile.find({ _id: { $in: profileIds } })
      .populate("doctorId", "name")     // chỉ lấy trường name của bác sĩ
      .populate("medicine", "name type") // chỉ lấy name và type thuốc
      .sort({ createdAt: -1 }); // mặc định sort mới nhất trước

    res.json(profiles);
  } catch (err) {
    console.error("Lỗi khi lấy hồ sơ:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
