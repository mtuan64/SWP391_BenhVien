const { authMiddleware } = require("../../middleware/auth.middleware");
const express = require("express");
const verifyToken = require("../../middleware/verifyToken");
const userRouter = express.Router();
const {
  createPaymentLinkEmbedded,
} = require("../../controller/staff/PaymentController");
const {
  getAllInvoices4User,
  CompletedInvoices,
} = require("../../controller/staff/InvoiceController");
const {
  createAppointment,
  getAppointmentsByUser,
  cancelAppointment,
} = require("../../controller/user/userService");

userRouter.get(
  "/getNoti",
  authMiddleware,
  require("../../controller/staff/notificationService").getUserNotifications
);
userRouter.put(
  "/markRead/:id",
  authMiddleware,
  require("../../controller/staff/notificationService").markAsRead
);

userRouter.get("/invoices", verifyToken, getAllInvoices4User);
userRouter.post("/create-link", createPaymentLinkEmbedded);
userRouter.put("/pay/success", CompletedInvoices);

userRouter.get("/", (req, res) => {
  res.send("User route is working!");
});

userRouter.post("/create", authMiddleware, createAppointment);
userRouter.get("/user", authMiddleware, getAppointmentsByUser);
userRouter.post("/cancel/:id", authMiddleware, cancelAppointment);

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
