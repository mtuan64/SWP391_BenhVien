const mongoose = require('mongoose');
const Invoice = require('../../models/Invoice');

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
    const invoices = await Invoice.find({ userId: "684e7597c7efedc32ca55271" })
      .populate('userId', 'name email')
      .populate('profileId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    // const total = await Invoice.countDocuments({ userId: req.user.id });
    const total = await Invoice.countDocuments({ userId: "684e7597c7efedc32ca55271" })
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