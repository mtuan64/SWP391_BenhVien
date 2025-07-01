const express = require("express");
const { authMiddleware } = require("../../middleware/auth.middleware");
const userRouter = express.Router();

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

module.exports = userRouter;
