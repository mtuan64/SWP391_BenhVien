const Profile = require("../../models/Profile");
const Question = require("../../models/Question");
const User = require("../../models/User");
const Appointment = require("../../models/Appointment");
const Feedback = require("../../models/Feedback");
const { sendAppointmentConfirmation } = require("../../utils/mailService");

const Employee = require("../../models/Employee");
exports.getMyProfiles = async (req, res) => {
  try {
    const UserId = req.user.id;

    // Lấy danh sách ID hồ sơ từ tài khoản
    const user = await User.findById(UserId);
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    const profileIds = user.profiles || [];

    // Lấy thông tin hồ sơ
    const profiles = await Profile.find({ _id: { $in: profileIds } })
      .populate("doctorId", "name") // chỉ lấy trường name của bác sĩ
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
      return res
        .status(400)
        .json({ message: "Thiếu thông tin bắt buộc (email, title, message)." });
    }

    const question = new Question({
      userId,
      email,
      title,
      message,
      status,
    });

    await question.save();

    res.status(201).json({
      success: true,
      message: "Yêu cầu hỗ trợ đã được gửi.",
      data: question,
    });
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi gửi yêu cầu." });
  }
};

module.exports.getAllQAUser = async (req, res) => {
  const {
    sort,
    statusfilter,
    search,
    page = 1,
    limit = 10,
    idUser,
  } = req.query;

  try {
    if (!idUser) {
      return res
        .status(401)
        .json({ success: false, message: "Chưa đăng nhập." });
    }

    const filter = { userId: idUser };
    if (statusfilter) filter.status = statusfilter;
    if (search) filter.title = { $regex: search, $options: "i" };

    const sortOption = {};
    if (sort) {
      const [field, order] = sort.split("_");
      sortOption[field] = order === "asc" ? 1 : -1;
    } else {
      sortOption.createdAt = -1;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Question.countDocuments(filter);

    const QAs = await Question.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      data: QAs,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Q&A:", error);
    res.status(500).json({ success: false, message: "Đã xảy ra lỗi máy chủ." });
  }
};

// Đặt lịch khám
exports.createAppointment = async (req, res) => {
  const { profileId, doctorId, department, appointmentDate, type } = req.body;
  const userId = req.user.id;

  try {
    const newAppointment = new Appointment({
      userId,
      profileId,
      doctorId,
      department,
      appointmentDate,
      type,
      status: "Booked",
    });

    await newAppointment.save();

    const [user, profile, doctor] = await Promise.all([
      User.findById(userId),
      Profile.findById(profileId),
      Employee.findById(doctorId),
    ]);

    await sendAppointmentConfirmation({
      to: user.email,
      patientName: profile.name,
      doctorName: doctor.name,
      date: appointmentDate,
      type,
    });

    res.status(201).json({
      message: "Appointment created successfully.",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create appointment.",
      error: error.message,
    });
  }
};

// Hiển thị toàn bộ danh sách đặt lịch của chính người dùng
exports.getAppointmentsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const appointments = await Appointment.find({ userId })
      .populate("profileId doctorId")
      .sort({ appointmentDate: -1 });

    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get appointments", error: err.message });
  }
};

// Hủy lịch hẹn
exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const appointment = await Appointment.findOne({ _id: id, userId });
    if (!appointment)
      return res.status(404).json({ message: "Appointment not found" });

    if (appointment.status === "Canceled") {
      return res
        .status(400)
        .json({ message: "Appointment is already canceled" });
    }

    appointment.status = "Canceled";
    await appointment.save();

    res
      .status(200)
      .json({ message: "Appointment canceled successfully", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to cancel appointment", error: err.message });
  }
};

// POST: User gửi feedback
exports.createFeedback = async (req, res) => {
  const userId = req.user.id;
  try {
    const { content, rating, appointmentId } = req.body;
    const feedback = new Feedback({
      userId,
      appointmentId,
      content,
      rating,
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback sent successfully', feedback });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send feedback' });
  }
};