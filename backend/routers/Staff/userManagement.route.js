const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// Lấy tất cả người dùng (HIỂN THỊ CẢ PASSWORD)
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Không dùng .select('-password')
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Lấy người dùng theo ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Sửa tên biến
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Tạo người dùng mới
router.post('/', async (req, res) => {
  try {
    const { email, password, name, phone, status } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại' });
    }

    const newUser = new User({ email, password, name, phone, status });
    await newUser.save();

    res.status(201).json({ message: 'Tạo người dùng thành công', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Cập nhật người dùng (GIỮ password nếu không thay đổi)
router.put('/:id', async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Nếu password không được gửi từ frontend, giữ nguyên password cũ
    if (!updateData.password) {
      delete updateData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ); // KHÔNG select('-password')

    if (!updatedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Xoá người dùng
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    res.status(200).json({ message: 'Xóa người dùng thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;