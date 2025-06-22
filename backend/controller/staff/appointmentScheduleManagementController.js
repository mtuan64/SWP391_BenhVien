const express = require("express");
const staffRouter = express.Router();
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const Employee = require("../../models/Employee");
const Schedule = require('../../models/Schedule');
const Profile = require('../../models/Profile');

// Lấy danh sách lịch hẹn có kèm tên bác sĩ và người dùng
exports.getAllAppointments = async (req, res) => {
  try {
    const { search = "" } = req.query;

    const appointments = await Appointment.find();

    const doctorIds = [...new Set(appointments.map(a => a.doctorId?.toString()))];
    const userIds = [...new Set(appointments.map(a => a.userId?.toString()))];

    const doctors = await Employee.find({ _id: { $in: doctorIds } }, { _id: 1, name: 1 });
    const users = await User.find({ _id: { $in: userIds } }, { _id: 1, name: 1 });

    const doctorMap = doctors.reduce((acc, doc) => {
      acc[doc._id.toString()] = doc.name;
      return acc;
    }, {});

    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = user.name;
      return acc;
    }, {});

    let enrichedAppointments = appointments.map(a => ({
      ...a._doc,
      doctorName: doctorMap[a.doctorId?.toString()] || "Unknown Doctor",
      userName: userMap[a.userId?.toString()] || "Unknown User"
    }));

    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      enrichedAppointments = enrichedAppointments.filter(a =>
        (a.doctorName && a.doctorName.toLowerCase().includes(searchLower)) ||
        (a.userName && a.userName.toLowerCase().includes(searchLower))
      );
    }

    res.status(200).json(enrichedAppointments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// Tạo cuộc hẹn mới
exports.createAppointment = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.profileId || data.profileId === "null" || data.profileId === "") {
      delete data.profileId;
    }

    console.log("Dữ liệu tạo appointment:", data);

    const newAppointment = new Appointment(data);
    await newAppointment.save();

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error("Lỗi tạo appointment:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// Cập nhật lịch hẹn
exports.updateAppointment = async (req, res) => {
  try {
    const data = { ...req.body };

    if (!data.profileId || data.profileId === "null" || data.profileId.trim() === "") {
      delete data.profileId;
    }

    const updated = await Appointment.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: "Appointment not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// Xóa lịch hẹn
exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy tất cả bác sĩ có role = 'Doctor' và thêm department
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Employee.find(
      { role: "Doctor" },
      { _id: 1, name: 1, department: 1 } // 👈 lấy cả department
    );
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách tất cả department (không trùng)
exports.getAllDepartments = async (req, res) => {
  try {
    // Lấy tất cả giá trị department duy nhất trong bảng Appointment
    const departments = await Appointment.distinct("department");
    res.status(200).json(departments); // trả về mảng chuỗi tên department
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
// Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1 }); // chỉ lấy _id và name
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

exports.getProfilesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const profiles = await Profile.find({ userId });

    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// GET /api/appointmentScheduleManagement/schedules/:doctorId
exports.getDoctorSchedules = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const schedules = await Schedule.find({ employeeId: doctorId });
    res.status(200).json(schedules);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
exports.createProfile = async (req, res) => {
  try {
    let { userId, name, gender, dateOfBirth, diagnose, note, issues, doctorId, medicine } = req.body;

    if (!userId || !gender || !dateOfBirth) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Nếu không có name, tự lấy name từ user
    if (!name) {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      name = user.name;
    }

    const profile = new Profile({
      name,
      dateOfBirth,
      gender,
      diagnose: diagnose || "",
      note: note || "",
      issues: issues || "",
      doctorId: doctorId || null,
      medicine: medicine || null,
      userId
    });

    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    console.error("❌ Error creating profile:", error);
    res.status(500).json({ message: "Error creating profile", error: error.message });
  }
};