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
module.exports = userRouter;
