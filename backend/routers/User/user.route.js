const express = require('express');
const userRouter = express.Router();

const {
  createAppointment,
  getAppointments,
  cancelAppointment,
  rescheduleAppointment,
  getAppointmentHistory,
  sendReminders
} = require("../../controller/user/userService");

userRouter.post("/create", createAppointment);
userRouter.get("/appointments", getAppointments);
userRouter.put("/appointments/:id/cancel", cancelAppointment);
userRouter.put("/appointments/:id/reschedule", rescheduleAppointment);
userRouter.get("/appointments/history", getAppointmentHistory);
userRouter.post("/appointments/reminders/send", sendReminders);
userRouter.get('/', (req, res) => {
  res.send("User route is working!");
});


module.exports = userRouter;