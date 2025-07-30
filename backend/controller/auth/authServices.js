const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const Employee = require("../../models/Employee");
const bcrypt = require("bcrypt");
const Counter = require("../../models/Counter");

require("dotenv").config();
const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const employee = await Employee.findOne({ email });

    if (!user && !employee) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const target = user || employee;
    const isMatch = await bcrypt.compare(password, target.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if (target.status === "inactive") {
      return res
        .status(403)
        .json({ message: "You are banned from the system" });
    }

    const payload = {
      id: target._id,
      email: target.email,
      name: target.name,
      role: target.role || "patient",
      status: target.status,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 🔍 Kiểm tra thông tin còn thiếu
    let incompleteProfile = false;
    let missingFields = [];

    if (employee) {
      if (employee.role === "Doctor") {
        const requiredFields = [
          "department",
          "avatar",
          "degree",
          "expYear",
          "specialization",
          "phone",
        ];
        missingFields = requiredFields.filter((field) => !employee[field]);
      } else if (employee.role === "Staff") {
        const requiredFields = ["avatar", "phone"];
        missingFields = requiredFields.filter((field) => !employee[field]);
      }
    }

    if (missingFields.length > 0) {
      incompleteProfile = true;
    }

    return res.status(200).json({
      message: "OK",
      token,
      user: target,
      incompleteProfile,
      missingFields,
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

  const { email, password, name, phone, recaptchaToken } = req.body;

  
  try {

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;

    const { data } = await axios.post(
      verifyUrl,
      new URLSearchParams({
        secret: secretKey,
        response: recaptchaToken,
      }),
    );

    if (!data.success) {
      return res.status(400).json({ message: "Xác minh reCAPTCHA thất bại" });
    }

    // 1) Kiểm tra email đã tồn tại chưa
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "Email da ton tai" });
    }
    const salt = await bcrypt.genSalt(10); // tạo salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3) Tạo user mới (user_code sẽ được middleware pre('save') sinh tự động)
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      phone,
      status: "active",
      emailVerificationCode: null,
      verificationExpires: null,
    });

    // 4) Lưu và lấy ra bản ghi đã lưu để chắc chắn có user_code
    const savedUser = await newUser.save();

    // 5) Trả kết quả về cho Postman (kèm user_code)
    return res.status(200).json({
      message: "Đăng ký thành công",
      user_code: savedUser.user_code,
      user: {
        _id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
        phone: savedUser.phone,
        status: savedUser.status,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi máy chủ", error: error.message });
  }
};

const check = async (req, res) => {
  res.status(200).json({ message: "API hoat dong" });
};

const oauthLogin = async (req, res) => {
  const { email, name, phone, provider } = req.body;

  if (!email || !provider) {
    return res.status(400).json({ message: "Thiếu thông tin OAuth" });
  }

  try {
    let user = await User.findOne({ email });

    if (!user) {
      // Nếu user chưa tồn tại, tạo mới
      user = new User({
        email,
        name,
        phone: phone || "N/A",
        status: "active",
        password: "OAUTH_PROVIDER",
        authProvider: provider.toLowerCase(),
        role: "patient",

      });
      await user.save();
    }

    if (user.status === "inactive") {
      return res
        .status(403)
        .json({ message: "Tài khoản của bạn đã bị khóa" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role || "patient",
      status: user.status,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
  console.log("OAuth login request received:", req.body);

};

const changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res
        .status(400)
        .json({ message: "Email và mật khẩu mới là bắt buộc" });
    }

    // Tìm trong bảng User
    let user = await User.findOne({ email });

    if (user) {
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
      return res
        .status(200)
        .json({ message: "Đổi mật khẩu thành công (user)" });
    }

    // Nếu không tìm thấy trong User, thử Employee
    let employee = await Employee.findOne({ email });

    if (employee) {
      employee.password = await bcrypt.hash(newPassword, 10);
      await employee.save();
      return res
        .status(200)
        .json({ message: "Đổi mật khẩu thành công (employee)" });
    }

    return res
      .status(404)
      .json({ message: "Không tìm thấy người dùng hoặc nhân viên" });
  } catch (error) {
    console.error("Lỗi trong changePassword:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};



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
      return res.status(400).json({ message: "Invalid email format" });
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
        return res.status(404).json({ message: "Email not registered" });
      }
      employee.emailVerificationCode = otp;
      employee.verificationExpires = expirationTime;
      await employee.save();
    }

    // Gửi email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Mã xác minh đặt lại mật khẩu",
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
      return res
        .status(200)
        .json({ message: "Password reset successfully (user)" });
    }

    // Nếu không có trong User, tìm trong Employee
    let employee = await Employee.findOne({
      email,
      emailVerificationCode: code,
      verificationExpires: { $gt: Date.now() },
    });

    if (!employee) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    employee.password = await bcrypt.hash(newPassword, 10);
    employee.emailVerificationCode = null;
    employee.verificationExpires = null;
    await employee.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully (employee)" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  Login,
  Signup,
  check,
  changePassword,
  forgotPassword,
  resetPassword,
  oauthLogin
};
const secretKey = process.env.RECAPTCHA_SECRET_KEY;
console.log("Recaptcha secret key:", secretKey);