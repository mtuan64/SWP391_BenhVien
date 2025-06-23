const Profile = require("../../models/Profile");
const Question = require("../../models/Question");
const User = require("../../models/User");
const sendEmail = require('../../utils/sendEmail');
module.exports.createCheckup = async (req, res) => {
  try {
    const { patientId, doctorId, date, time, symptoms } = req.body;
    if (!patientId || !doctorId || !date || !time || !symptoms) {
      return res.status(400).json({ message: "All fields are required" });
    }

    return res.status(201).json({ message: "Checkup created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.replyQA = async (req, res) => {
  const { id } = req.params;
  const { replyMessage } = req.body;

  try {
    const question = await Question.findById(id);
    if (!question) return res.status(404).json({ message: "Không tìm thấy yêu cầu." });

    question.reply = replyMessage;
    question.status = 'answered';
    question.repliedAt = new Date();
    await question.save();

    // Gửi email phản hồi
    await sendEmail({
      to: question.email,
      subject: `Phản hồi yêu cầu hỗ trợ: ${question.title}`,
      text: `Chào bạn,\n\nChúng tôi đã phản hồi yêu cầu của bạn:\n\n${replyMessage}\n\nTrân trọng,\nBệnh viện`
    });

    res.json({ success: true, message: "Đã phản hồi và gửi email cho người dùng." });

  } catch (error) {
    console.error("Lỗi phản hồi yêu cầu:", error);
    res.status(500).json({ message: "Lỗi phản hồi yêu cầu." });
  }
};

exports.getAllQA = async (req, res) => {
  const { sort, searchId, statusfilter, page = 1, limit = 10 } = req.body;

  try {
    let filter = {};

    if (searchId) {
      filter.userId = searchId;
    }

    if (statusfilter) {
      filter.status = statusfilter;
    }

    let sortOption = {};
    if (sort) {
      const [field, order] = sort.split('_');
      sortOption[field] = order === 'asc' ? 1 : -1;
    } else {
      sortOption = { createdAt: -1 };
    }

    // Tính toán offset để phân trang
    const skip = (page - 1) * limit;

    // Lấy tổng số bản ghi thỏa filter (để frontend biết tổng số trang)
    const total = await Question.countDocuments(filter);

    // Lấy dữ liệu với phân trang
    const QAs = await Question.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
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
