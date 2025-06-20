const PayOS = require('@payos/node');
const mongoose = require('mongoose');
const Invoice = require('../../models/Invoice');
const Payment = require('../../models/Payment');
const crypto = require('crypto');

const payos = new PayOS(
    process.env.PAYOS_CLIENT_ID,
    process.env.PAYOS_API_KEY,
    process.env.PAYOS_CHECKSUM_KEY
);

// Tạo link thanh toán PayOS
exports.createPaymentLink = async (req, res) => {
    try {
        const { invoiceId, method } = req.body;

        if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
            return res.status(400).json({
                success: false,
                message: 'ID hóa đơn không hợp lệ'
            });
        }


        if (!['Credit Card', 'Mobile App'].includes(method)) {
            return res.status(400).json({
                success: false,
                message: 'Phương thức thanh toán không được hỗ trợ bởi PayOS'
            });
        }

        const invoice = await Invoice.findById(invoiceId)
            .populate('userId', 'name email')
            .populate('profileId', 'name');

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy hóa đơn'
            });
        }

        if (invoice.status !== 'Pending') {
            return res.status(400).json({
                success: false,
                message: 'Hóa đơn không ở trạng thái chờ thanh toán'
            });
        }

        // Kiểm tra xem đã có Payment đang chờ hay chưa
        let payment = await Payment.findOne({ invoiceId, status: 'Pending' });

        if (!payment) {
            payment = await Payment.create({
                invoiceId,
                userId: invoice.userId,
                profileId: invoice.profileId,
                amount: invoice.totalAmount,
                method,
                status: 'Pending',
                paymentDate: new Date()
            });
        }

        // Tạo orderCode tránh trùng: INV-1235_ab123

        // An toàn, không trùng, và không vượt quá MAX_SAFE_INTEGER
        const orderCode = Math.floor(Date.now() / 1000);


        const paymentData = {
            orderCode: orderCode,
            amount: invoice.totalAmount,
            description: `Pay ${invoice.invoiceNumber} for ${invoice.profileId.name}`,
            items: (invoice.services || []).map(service => ({
                name: service.name || 'Dịch vụ y tế',
                quantity: 1,
                price: invoice.totalAmount // có thể là service.price nếu cần chi tiết hơn
            })),
            returnUrl: `http://localhost:5173/payment/success?paymentId=${payment._id}`,
            cancelUrl: `http://localhost:5173/payment/fail?reason=cancelled`
        };

        const paymentLink = await payos.createPaymentLink(paymentData);

        res.status(200).json({
            success: true,
            data: {
                checkoutUrl: paymentLink.checkoutUrl,
                orderCode: paymentLink.orderCode,
                paymentId: payment._id
            }
        });
    } catch (error) {
        console.error('Error creating payment link:', error?.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error?.response?.data?.message || error.message
        });
    }
};



// Xử lý webhook từ PayOS
exports.handleWebhook = async (req, res) => {
    try {
        const webhookData = req.body;

        // Xác minh chữ ký
        const receivedSignature = req.headers['x-payos-signature'];
        const checksumKey = process.env.PAYOS_CHECKSUM_KEY;
        const rawBody = JSON.stringify(webhookData);
        const expectedSignature = crypto
            .createHmac('sha256', checksumKey)
            .update(rawBody)
            .digest('hex');

        if (receivedSignature !== expectedSignature) {
            return res.status(400).json({
                success: false,
                message: 'Chữ ký không hợp lệ'
            });
        }

        const { code, data } = webhookData;
        const { orderCode, paymentLinkId, transactionDateTime, code: paymentCode } = data;

        // Tìm hóa đơn
        const invoice = await Invoice.findOne({ invoiceNumber: `INV-${orderCode}` });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy hóa đơn'
            });
        }

        // Tìm bản ghi thanh toán
        const payment = await Payment.findOne({ invoiceId: invoice._id, status: 'Pending' });
        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy giao dịch thanh toán đang chờ'
            });
        }

        // Cập nhật theo kết quả thanh toán
        if (code === '00' && paymentCode === '00') {
            console.log("call");
            payment.status = 'Completed';
            payment.transactionId = paymentLinkId;
            payment.paymentDate = new Date(transactionDateTime);
            invoice.status = 'Paid';
        } else {
            console.log("nôb");
            payment.status = 'Failed';
            payment.transactionId = paymentLinkId || null;
            invoice.status = 'Canceled';
        }

        await payment.save();
        await invoice.save();

        return res.status(200).json({
            success: true,
            message: 'Webhook xử lý thành công'
        });
    } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi server',
            error: error.message
        });
    }
};

exports.paymentSuccess = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId).populate('invoiceId');
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Giao dịch không tồn tại' });
        }
        payment.status = 'Completed';
        await payment.save();
        const invoice = payment.invoiceId;
        if (invoice) {
            invoice.status = 'Paid';
            await invoice.save();
        } else {
            return res.status(400).json({ success: false, message: 'Hóa đơn không tồn tại' });
        }
        res.status(200).json({ success: true, message: 'Thanh toán thành công', data: payment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};


// Trang hủy
exports.paymentCancel = async (req, res) => {
    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId).populate('invoiceId');
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Giao dịch không tồn tại' });
        }
        payment.status = 'Failed';
        await payment.save();
        res.status(200).json({ success: true, message: 'Thanh toán đã hủy', data: payment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
};
// thanh toan tien mat
// Thanh toán tiền mặt
exports.paidServices = async (req, res) => {
    const invoiceId = req.params.invoiceId;
    const { method } = req.body;

    try {
        const invoice = await Invoice.findByIdAndUpdate(
            invoiceId,
            { method: method },
            { new: true }
        );

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.status(200).json({ invoice });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
exports.deleteInvoice = async (req, res) => {
    const invoiceId = req.params.invoiceId;

    try {
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        res.status(200).json({ message: "Invoice deleted successfully", invoice: deletedInvoice });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
