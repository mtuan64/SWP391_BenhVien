const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const Employee = require('../../models/Employee');
const bcrypt = require('bcrypt');
const Counter = require('../../models/Counter');

require('dotenv').config();
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const employee = await Employee.findOne({ email });

    if (!user && !employee) {
      return res.status(400).json({ message: "Invalid email" });
    }

    // So sánh mật khẩu
    const target = user || employee;
    const isMatch = await bcrypt.compare(password, target.password);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Payload
    const payload = {
      id: target._id,
      email: target.email,
      name: target.name,
      role: target.role || "patient", // optional
    };

    // Tạo JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      message: "OK",
      token,
      user: target,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


const Signup = async (req, res) => {

  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
  const { email, password, name, phone } = req.body;
  try {
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email da ton tai' });
    }
const salt = await bcrypt.genSalt(10); // tạo salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password:hashedPassword,
      name,
      phone,
      status: 'active',
      emailVerificationCode: null, // Lưu code reset
      verificationExpires: null, // Thời gian hết hạn
    });
    console.log(newUser);
    await newUser.save();
    console.log("User saved:", await User.findOne({ email }));

    res.status(200).json({ message: "Dang ky thanh cong" });
  } catch (error) {

    
res.status(500).json({ message: "Lỗi máy chủ", error: error.message });

  }
};
const check = async (req, res) => {
  res.status(200).json({ message: "API hoat dong" });
};



const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email và mật khẩu mới là bắt buộc" });
    }

    // Tìm trong bảng User
    let user = await User.findOne({ email });

    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return res.status(200).json({ message: "Đổi mật khẩu thành công (user)" });
    }

    // Nếu không tìm thấy trong User, thử Employee
    let employee = await Employee.findOne({ email });

    if (employee) {
      employee.password = await bcrypt.hash(newPassword, 10);
      await employee.save();
      return res.status(200).json({ message: "Đổi mật khẩu thành công (employee)" });
    }

    return res.status(404).json({ message: "Không tìm thấy người dùng hoặc nhân viên" });
  } catch (error) {
    console.error("Lỗi trong changePassword:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

module.exports = changePassword;

// Cấu hình Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Hàm tạo OTP (từ câu hỏi trước)
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    const otp = generateVerificationCode();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

    // Tìm trong User trước
    let user = await User.findOne({ email });
    if (user) {
      user.emailVerificationCode = otp;
      user.verificationExpires = expirationTime;
      await user.save();
    } else {
      // Nếu không có trong User, tìm trong Employee
      let employee = await Employee.findOne({ email });
      if (!employee) {
        return res.status(404).json({ message: 'Email not registered' });
      }
      employee.emailVerificationCode = otp;
      employee.verificationExpires = expirationTime;
      await employee.save();
    }

    // Gửi email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Mã xác minh đặt lại mật khẩu',
      html: `
        <h3>Mã xác minh</h3>
        <p>Mã xác minh của bạn là: <strong>${otp}</strong></p>
        <p>Mã này có hiệu lực trong 15 phút.</p>
        <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: 'Email, code, and new password are required' });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Tìm trong User trước
    let user = await User.findOne({
      email,
      emailVerificationCode: code,
      verificationExpires: { $gt: Date.now() },
    });

    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      user.emailVerificationCode = null;
      user.verificationExpires = null;
      await user.save();
      return res.status(200).json({ message: 'Password reset successfully (user)' });
    }

    // Nếu không có trong User, tìm trong Employee
    let employee = await Employee.findOne({
      email,
      emailVerificationCode: code,
      verificationExpires: { $gt: Date.now() },
    });

    if (!employee) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    employee.emailVerificationCode = null;
    employee.verificationExpires = null;
    await employee.save();

    return res.status(200).json({ message: 'Password reset successfully (employee)' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};



module.exports = {
  Login, Signup, check, changePassword, forgotPassword, resetPassword
}