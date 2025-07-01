const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Employee = require("../../models/Employee");
const bcrypt = require("bcrypt");
require("dotenv").config();
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
    // const isMatch = (password === target.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Payload
    const payload = {
      id: target._id,
      email: target.email,
      name: target.name,
      role: target.role || "patient", // optional
      status: target.status,
    };

    if (target.status === "inactive") {
      return res
        .status(403)
        .json({ message: "You are banned from the system" });
    }

    // Tạo JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

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
      return res.status(400).json({ message: "Email da ton tai" });
    }
    const salt = await bcrypt.genSalt(10); // tạo salt
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      status: "active",
      emailVerificationCode: null, // Lưu code reset
      verificationExpires: null, // Thời gian hết hạn
    });
    console.log(newUser);
    await newUser.save();
    console.log("User saved:", await User.findOne({ email }));

    res.status(200).json({ message: "Dang ky thanh cong" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
const check = async (req, res) => {
  res.status(200).json({ message: "API hoat dong" });
};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Kiểm tra thông tin đầu vào
    if (!email) {
      return res
        .status(400)
        .json({ message: "email and new password are required" });
    }

    // Kiểm tra xem email là email hay số điện thoại hợp lệ
    // const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // const isPhone = /^\+?[1-9]\d{1,14}$/.test(email);

    // if (!isEmail && !isPhone) {
    //     return res.status(400).json({ message: "Invalid email or phone number format" });
    // }

    // Tìm người dùng trong cơ sở dữ liệu
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // // Cập nhật mật khẩu mới và xóa OTP
    user.password = hashedPassword;
    // user.emailVerificationCode = null;
    // user.phoneVerificationCode = null;
    // user.isEmailVerified = false; // Reset trạng thái xác minh
    // user.isPhoneVerified = false;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error in changePassword:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//  const forgotPassword = async (req, res) => {
//     try {
//         const { email } = req.body;

//         // Kiểm tra nếu là email hợp lệ

//         if (!email) {
//             return res.status(400).json({ message: "Invalid email format" });
//         }

//         // Tìm người dùng theo email
//         const user = await User.findOne({ email: email });

//         if (!user) {
//             return res.status(404).json({ message: "Email not registered" });
//         }

//         // Generate OTP
//         const otp = generateVerificationCode();
//         const expirationTime = new Date(Date.now() + 15 * 60 * 1000); // OTP hết hạn sau 15 phút

//         // Cập nhật OTP vào người dùng
//         if (email) {
//             user.emailVerificationCode = otp;
//         } else {
//             user.phoneVerificationCode = otp;
//         }
//         user.verificationExpires = expirationTime;

//         // Lưu lại thay đổi trên cơ sở dữ liệu
//         await user.save();

//         // Gửi OTP qua email hoặc SMS
//         if (email) {
//             await email.sendVerificationEmail(contact, otp);
//         } else {
//             await sendVerificationSMS(contact, otp); // Sử dụng dịch vụ SMS
//         }

//         return res.status(200).json({ message: "OTP sent successfully" });
//     } catch (error) {
//         console.error("Error in forgotPassword: ", error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };
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

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Tìm user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not registered" });
    }

    // Tạo OTP
    const otp = generateVerificationCode();
    const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

    // Lưu OTP
    user.emailVerificationCode = otp;
    user.verificationExpires = expirationTime;
    await user.save();

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
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email, code, and new password are required" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({
      email,
      emailVerificationCode: code,
      verificationExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.emailVerificationCode = null;
    user.verificationExpires = null;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  Login, Signup, check, changePassword, forgotPassword, resetPassword
}
