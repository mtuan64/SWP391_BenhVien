const express = require("express");
const {
  getNotifications,
  createNotification,
  markUrgent,
  deleteNotification,
  getAllUserEmails,
} = require("../../controller/staff/notificationService");
const staffRouter = express.Router();

staffRouter.get("/getNoti", getNotifications);
staffRouter.post("/createNoti", createNotification);
staffRouter.put("/urgent/:id", markUrgent);
staffRouter.delete("/deleteNoti/:id", deleteNotification);
staffRouter.get("/getAllUserEmails", getAllUserEmails);

module.exports = staffRouter;
