const User = require("../../models/User");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//[POST] /api/login
const Login = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  console.log(req.body);
  try {
    // tim nguoi dung trong db
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    // check mat khau ( ko dung bcrypt )
    if (userPassword !== user.password) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    // neu dang nhap OK
    // -> tao payload cho token
    const payLoad = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin
    };
    // -> tao token
    const token = jwt.sign(payLoad, "7d9f6c8e3b2a1f5d4e9c8b7a6f3d2e1b0c9a8f7e6d5b4a3c2e1f0d9b8a7c6e5f", {
      expiresIn: '1h' // token het han sau 1h
    });
    res.json({
      message: 'Đăng nhập thành công',
      token
    });

  } catch (error) {
    res.status(500).json({ message: 'loi server' });
  }
}

// Hàm đăng ký
const SignUp = async (req, res) => {
  const { email, password, name, phone } = req.body;

  try {
    // Kiểm tra email
    const emailExist = await User.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    // Thêm user mới (không mã hóa mật khẩu)
    const newUser = new User({
      email,
      password, // Lưu plain text (không an toàn)
      name,
      phone,
      status: 'active',
      isAdmin: false
    });
    await newUser.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error.message);
    res.status(500).json({ message: 'Lỗi máy chủ: ' + error.message });
  }
};

const Middleware = async (req, res) => {
  res.status(200).json({ message: 'checked OK' })
}

module.exports = {
  Login, SignUp, Middleware
}
