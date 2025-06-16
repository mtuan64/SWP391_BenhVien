const mongoose = require('mongoose');
const Invoice = require('./models/Invoice'); // Đường dẫn tới model Invoice

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    // Lấy tất cả hóa đơn và populate các trường liên quan
    const invoices = await Invoice.find()
      .populate('userId', 'email name') // Populate email và name từ User
      .populate('profileId', 'name') // Populate name từ Profile
      .populate('services', 'name price') // Populate name và price từ Services
      .lean(); // Chuyển đổi sang plain JavaScript object để tối ưu hiệu suất

    // Kiểm tra nếu không có hóa đơn nào
    if (!invoices || invoices.length === 0) {
      return res.status(404).json({ message: 'No invoices found' });
    }

    // Trả về danh sách hóa đơn
    res.status(200).json({
      message: 'Invoices retrieved successfully',
      invoices: invoices.map(invoice => ({
        id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        user: invoice.userId, // Dữ liệu đã populate từ User
        profile: invoice.profileId, // Dữ liệu đã populate từ Profile
        services: invoice.services, // Dữ liệu đã populate từ Services
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt
      }))
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};