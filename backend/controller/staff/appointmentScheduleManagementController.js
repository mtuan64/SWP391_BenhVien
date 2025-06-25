const express = require("express");
const staffRouter = express.Router();
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const Employee = require("../../models/Employee");
const Schedule = require('../../models/Schedule');
const Profile = require('../../models/Profile');

// Lấy danh sách lịch hẹn có kèm tên bác sĩ và người dùng với phân trang
exports.getAllAppointments = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, status, department } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // Xây dựng query để lọc
    let query = {};
    if (status) {
      query.status = status;
    }
    if (department) {
      query.department = department;
    }

    const totalAppointments = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query).skip(skip).limit(limitNum);

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
        (a.userName && a.userName.toLowerCase().includes(searchLower)) ||
        (a.department && a.department.toLowerCase().includes(searchLower)) ||
        (a.status && a.status.toLowerCase().includes(searchLower))
      );
    }

    const response = {
      appointments: enrichedAppointments,
      pagination: {
        total: totalAppointments,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalAppointments / limitNum)
      }
    };
    res.status(200).json(response);
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

// Lấy tất cả bác sĩ có role = 'Doctor' và thêm department, lọc theo department và ngày nếu có
exports.getAllDoctors = async (req, res) => {
  try {
    const { department, date } = req.query;
    let query = { role: "Doctor" };
    if (department) {
      query.department = department;
    }
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      const schedules = await Schedule.find({
        date: { $gte: new Date(formattedDate), $lt: new Date(formattedDate + "T23:59:59.999Z") },
        timeSlots: { $elemMatch: { status: "Available" } }
      });
      const doctorIds = schedules.map(s => s.employeeId);
      query._id = { $in: doctorIds };
    }
    const doctors = await Employee.find(query, { _id: 1, name: 1, department: 1 });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách tất cả department (không trùng)
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Appointment.distinct("department");
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1 });
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
    const { date } = req.query;
    let query = { employeeId: doctorId };
    if (date) {
      const formattedDate = new Date(date).toISOString().split("T")[0];
      query.date = { $gte: new Date(formattedDate), $lt: new Date(formattedDate + "T23:59:59.999Z") };
    }
    const schedules = await Schedule.find(query);
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
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Error creating profile", error: error.message });
  }
};