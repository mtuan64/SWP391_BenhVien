const express = require("express");
const staffRouter = express.Router();
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const Employee = require("../../models/Employee");

staffRouter.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();

    // Lấy tất cả doctorId và userId duy nhất từ danh sách lịch hẹn
    const doctorIds = [...new Set(appointments.map(a => a.doctorId?.toString()))];
    const userIds = [...new Set(appointments.map(a => a.userId?.toString()))];

    // Truy vấn tên bác sĩ và người dùng từ ID
    const doctors = await Employee.find({ _id: { $in: doctorIds } }, { _id: 1, name: 1 });
    const users = await User.find({ _id: { $in: userIds } }, { _id: 1, name: 1 });

    // Map lại ID -> name để dễ tra cứu
    const doctorMap = doctors.reduce((acc, doc) => {
      acc[doc._id.toString()] = doc.name;
      return acc;
    }, {});

    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user.name;
      return acc;
    }, {});

    // Gắn tên vào từng appointment
    const enrichedAppointments = appointments.map(a => ({
      ...a._doc,
      doctorName: doctorMap[a.doctorId?.toString()] || "Unknown Doctor",
      userName: userMap[a.userId?.toString()] || "Unknown User"
    }));

    res.status(200).json(enrichedAppointments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

// Cập nhật một cuộc hẹn theo ID appointment
staffRouter.put("/:id", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// POST tạo mới appointment
staffRouter.post("/", async (req, res) => {
  try {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
// DELETE xóa một appointment theo ID
staffRouter.delete("/:id", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = staffRouter;
