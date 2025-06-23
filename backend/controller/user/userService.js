const Profile = require("../../models/Profile");
const Question = require("../../models/Question");
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

exports.sendQA = async (req, res) => {
  const { userId = null, email, title, message, status = "pending" } = req.body;

  try {
    if (!email || !title || !message) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc (email, title, message)." });
    }

    const question = new Question({
      userId,
      email,
      title,
      message,
      status
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Yêu cầu hỗ trợ đã được gửi.",
      data: question
    });

  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi yêu cầu." });
  }
};

module.exports.getAllQAUser = async (req, res) => {
  const { sort, statusfilter, page = 1, limit = 10, idUser } = req.query; // Use query parameters

  try {
    const userId = idUser;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Chưa đăng nhập." });
    }

    let filter = { userId };

    if (statusfilter) {
      filter.status = statusfilter;
    }

    let sortOption = { createdAt: -1 }; // Default sort
    if (sort) {
      const [field, order] = sort.split('_');
      if (field && order) {
        sortOption[field] = order === 'asc' ? 1 : -1;
      }
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const total = await Question.countDocuments(filter);

    const QAs = await Question.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / limit),
      data: QAs
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Q&A:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau."
    });
  }
};
