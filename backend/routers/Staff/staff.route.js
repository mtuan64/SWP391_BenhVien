const express = require("express");
const {
  getNotifications,
  createNotification,
  markUrgent,
  deleteNotification,
} = require("../../controller/staff/staffService");
const staffRouter = express.Router();

staffRouter.get("/getNoti", getNotifications);
staffRouter.post("/createNoti", createNotification);
staffRouter.put("/urgent/:id", markUrgent);
staffRouter.delete("/deleteNoti/:id", deleteNotification);

module.exports = staffRouter;
