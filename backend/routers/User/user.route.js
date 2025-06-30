const express = require('express');
const userRouter = express.Router();
const {
  createAppointment,
  getAppointmentsByUser,
  cancelAppointment
} = require("../../controller/user/userService");
const { authMiddleware } = require("../../middleware/auth.middleware");

userRouter.get('/', (req, res) => {
  res.send("User route is working!");
});

userRouter.post('/create', authMiddleware, createAppointment);
userRouter.get('/user', authMiddleware, getAppointmentsByUser);
userRouter.post('/cancel/:id', authMiddleware, cancelAppointment);

module.exports = userRouter;
