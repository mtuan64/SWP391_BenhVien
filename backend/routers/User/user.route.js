const express = require('express');
const { DoctorInfo } = require('../../controller/user/userService');
const userRouter = express.Router();

userRouter.get('/:doctorId', DoctorInfo);

module.exports = userRouter;