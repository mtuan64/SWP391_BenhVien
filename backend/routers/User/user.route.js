const express = require('express');
const userRouter = express.Router();
const userService = require("../../controller/user/userService");

userRouter.get('/doctr', userService.getAllDoctors);
userRouter.get('/doctr/:doctorId', userService.getDoctorById);
userRouter.get('/service', userService.getAllServices);
userRouter.get('/service/:serviceId', userService.getServiceById);
userRouter.get('/department', userService.getAllDepartment);
userRouter.get('/department/:departmentId', userService.getDepartmentById);
userRouter.get('/medicines', userService.getAllMedicines);
userRouter.get('/medicines/:medicineId', userService.getMedicineById);

module.exports = userRouter;
