const mongoose = require('mongoose');
const Invoice = require('../../models/Invoice');
const Payment = require('../../models/Payment');
const Service = require('../../models/Service');
const User = require('../../models/User');
exports.getAllInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // if (!req.user) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Vui lòng đăng nhập để truy cập'
    //   });
    // }

    // const invoices = await Invoice.find({ userId: req.user.id })
    const invoices = await Invoice.find()
      .populate('userId', 'name email')
      .populate('profileId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // const total = await Invoice.countDocuments({ userId: req.user.id });
    const total = await Invoice.countDocuments()
    res.status(200).json({
      success: true,
      count: invoices.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      data: invoices
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
exports.CreateInvoices = async (req, res) => {
  const { userId = null, profileId = null, ArrayServiceId } = req.body;

  try {
    // Lấy danh sách dịch vụ từ DB
    const services = await Service.find({
      _id: { $in: ArrayServiceId.map(id => new mongoose.Types.ObjectId(id)) }
    });
    // tinh tien dich vu nek kkk
    const totalAmount = services.reduce((sum, svc) => sum + svc.price, 0);
    // tao so hoa don
    const invoiceNumber = "INV-" + Math.floor(1000 + Math.random() * 9000);
    const newInvoice = new Invoice({
      userId,
      profileId,
      services,
      invoiceNumber,
      totalAmount,
      status: "Pending",
      createdAt: new Date(),
      updatedAt: new Date()
    });
    await newInvoice.save();
    // thanh cong
    res.status(200).json({ message: "create hoa don thanh cong roi ne", invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ message: "error by server" });
  }
};

exports.getServices = async (req, res) => {
  const invoiceId = req.params.invoiceId;
  try {
    const invoice = await Invoice.findById({ _id: invoiceId });
    if (!invoice) {
      res.status(500).json({ message: "error" });
    }
    const services = await Service.find({
      _id: { $in: invoice.services.map(id => new mongoose.Types.ObjectId(id)) }
    });
    res.status(200).json({ services: services });
  } catch (error) {
    res.status(500).json({ message: "error by server" });
  }

}
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services: services });
  } catch (error) {
    res.status(500).json({ message: "error by server" });
  }

}
// Lấy tất cả hồ sơ theo Employee ID
exports.getProfilesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: 'ID người dùng không hợp lệ'
      });
    }

    const user = await User.findById(userId)
      .populate({
        path: 'profiles',
        select: 'name dateOfBirth gender diagnose note issues doctorId',
        populate: {
          path: 'doctorId',
          select: 'name email specialization'
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    res.status(200).json({
      success: true,
      count: user.profiles.length,
      data: user.profiles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
};
