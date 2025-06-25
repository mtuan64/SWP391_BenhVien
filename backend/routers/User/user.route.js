const express = require('express');
const userRouter = express.Router();
const userController = require("../../controller/user/userService");

userRouter.get('/doctr', userController.getAllDoctors);
userRouter.get('/doctr/:doctorId', userController.getDoctorById);

module.exports = userRouter;
