const express = require('express');
const userRouter = express.Router();
const User = require('../../models/User'); // đường dẫn đúng đến file User.js
const { verifyToken } = require('../../middleware/tokencheck');
const Employee = require('../../models/Employee');
const { getMyProfiles, sendQA, getAllQAUser } = require('../../controller/user/userService');
// Update user by ID
userRouter.put('/update', async (req, res) => {
  try {
    const { email, name, phone, status, department, specialization } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Chuẩn bị field chung cần cập nhật
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (phone !== undefined) updateFields.phone = phone;
    if (status !== undefined) updateFields.status = status;

    // Thử cập nhật trong User trước
    let updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: updateFields },
      { new: true }
    );

    // Nếu không có trong User thì kiểm tra trong Employee
    if (!updatedUser) {
      const employee = await Employee.findOne({ email });

      if (!employee) {
        return res.status(404).json({ message: 'User or employee not found with this email' });
      }

      // Nếu là Doctor, cho phép cập nhật thêm department và specialization
      if (employee.role === 'Doctor') {
        if (department !== undefined) updateFields.department = department;
        if (specialization !== undefined) updateFields.specialization = specialization;
      }

      updatedUser = await Employee.findOneAndUpdate(
        { email },
        { $set: updateFields },
        { new: true }
      );
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});



userRouter.get('/profile/my-records', verifyToken, getMyProfiles);
userRouter.post('/qa', sendQA);
userRouter.get('/qahistory', getAllQAUser);

module.exports = userRouter;