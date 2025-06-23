const express = require('express');
const userRouter = express.Router();
const User = require('../../models/User'); // đường dẫn đúng đến file User.js
const {verifyToken} = require('../../middleware/tokencheck');
const {getMyProfiles,sendQA,getAllQAUser} = require('../../controller/user/userService');
// Update user by ID
userRouter.put('/update', async (req, res) => {
  try {
    const { email, name, phone, status } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Chỉ cập nhật các trường được cho phép
    const updateFields = {};
    if (name !== undefined) updateFields.name = name;
    if (phone !== undefined) updateFields.phone = phone;
    if (status !== undefined) updateFields.status = status;

    const updatedUser = await User.findOneAndUpdate(
      { email }, // tìm theo email
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

userRouter.get('/profile/my-records',verifyToken,getMyProfiles);
userRouter.post('/qa',sendQA);
userRouter.get('/qahistory',getAllQAUser);

module.exports = userRouter;