const express = require("express");
const { authMiddleware } = require("../../middleware/auth.middleware");
const userRouter = express.Router();

userRouter.get(
  "/getNoti",
  authMiddleware,
  require("../../controller/staff/staffService").getUserNotifications
);
userRouter.put(
  "/markRead/:id",
  authMiddleware,
  require("../../controller/staff/staffService").markAsRead
);

module.exports = userRouter;
