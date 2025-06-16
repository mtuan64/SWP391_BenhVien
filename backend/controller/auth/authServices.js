const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email và mật khẩu là bắt buộc" });
    }

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
    }


    // Tạo JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // hoặc '7d' nếu muốn lâu hơn
    );

    return res.status(200).json({
      message: "Đăng nhập thành công",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("⚠️ Lỗi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
