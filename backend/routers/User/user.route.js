const express = require('express');
const { DoctorInfo } = require('../../controller/user/userService');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send("User route is working!");
});


module.exports = userRouter;