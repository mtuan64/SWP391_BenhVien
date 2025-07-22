const express = require("express");
const staffRouter = express.Router();
const Appointment = require("../../models/Appointment");
const User = require("../../models/User");
const Employee = require("../../models/Employee");
const Schedule = require('../../models/Schedule');
const Profile = require('../../models/Profile');
const Department = require("../../models/Department");
const mongoose = require("mongoose");


// Lấy danh sách lịch hẹn có kèm tên bác sĩ, người dùng, số điện thoại và user_code với phân trang
exports.getAllAppointments = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, status, department, startDate, endDate } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    let query = {};
    if (status) {
      query.status = status;
    }
    if (department) {
      query.department = department;
    }
    if (startDate || endDate) {
      query.appointmentDate = {};
      if (startDate && !isNaN(new Date(startDate).getTime())) {
        query.appointmentDate.$gte = new Date(startDate);
      }
      if (endDate && !isNaN(new Date(endDate).getTime())) {
        query.appointmentDate.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
      }
    }

    const totalAppointments = await Appointment.countDocuments(query);
    const appointments = await Appointment.find(query).populate("profileId", "name").skip(skip).limit(limitNum);

    const doctorIds = [...new Set(appointments.map(a => a.doctorId?.toString()))];
    const userIds = [...new Set(appointments.map(a => a.userId?.toString()))];

    const doctors = await Employee.find({ _id: { $in: doctorIds } }, { _id: 1, name: 1 });
    const users = await User.find({ _id: { $in: userIds } }, { _id: 1, name: 1, phone: 1, user_code: 1 });

    const doctorMap = doctors.reduce((acc, doc) => {
      acc[doc._id.toString()] = doc.name;
      return acc;
    }, {});
    const userMap = users.reduce((acc, user) => {
      acc[user._id.toString()] = { name: user.name, phone: user.phone || "N/A", user_code: user.user_code || "N/A" };
      return acc;
    }, {});

    let enrichedAppointments = appointments.map(a => ({
    ...a._doc,
    doctorName: doctorMap[a.doctorId?.toString()] || "Unknown Doctor",
    userName: userMap[a.userId?.toString()]?.name || "Unknown User",
    userPhone: userMap[a.userId?.toString()]?.phone || "N/A",
    userCode: userMap[a.userId?.toString()]?.user_code || "N/A",
    profileName: a.profileId?.name || "N/A"
  }));


    if (search.trim() !== "") {
      const searchLower = search.toLowerCase();
      enrichedAppointments = enrichedAppointments.filter(a =>
        (a.doctorName && a.doctorName.toLowerCase().includes(searchLower)) ||
        (a.userName && a.userName.toLowerCase().includes(searchLower)) ||
        (a.userPhone && a.userPhone.toLowerCase().includes(searchLower)) ||
        (a.userCode && a.userCode.toLowerCase().includes(searchLower)) ||
        (a.department && a.department.toLowerCase().includes(searchLower)) ||
        (a.status && a.status.toLowerCase().includes(searchLower))
      );
    } else if (startDate || endDate) {
      enrichedAppointments = enrichedAppointments.filter(a => {
        const appointmentDate = new Date(a.appointmentDate);
        let matchesDateRange = true;
        if (startDate && appointmentDate < new Date(startDate)) {
          matchesDateRange = false;
        }
        if (endDate && appointmentDate > new Date(new Date(endDate).setHours(23, 59, 59, 999))) {
          matchesDateRange = false;
        }
        return matchesDateRange;
      });
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
    console.error("Error in getAllAppointments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// Tạo cuộc hẹn mới
exports.createAppointment = async (req, res) => {
  try {
    const data = { ...req.body };

    // Kiểm tra bắt buộc phải có profileId
    if (!data.profileId || data.profileId === "null" || data.profileId === "") {
      return res.status(400).json({ message: "Missing profileId. Please resolve profile by identity number first." });
    }

    // (Tuỳ chọn) Kiểm tra profile có tồn tại không
    const profileExists = await Profile.findById(data.profileId);
    if (!profileExists) {
      return res.status(404).json({ message: "Profile not found with provided profileId." });
    }

    // Tạo cuộc hẹn mới
    const newAppointment = new Appointment({
      appointmentDate: data.appointmentDate,
      department: data.department,
      doctorId: data.doctorId,
      timeSlot: data.timeSlot,
      type: data.type || "Offline",
      status: data.status || "Booked",
      reminderSent: data.reminderSent || false,
      profileId: data.profileId,
    });

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
    const query = { role: "Doctor", status: "active" };

    // ✅ Lọc theo khoa (ObjectId)
    if (department) {
      if (!mongoose.Types.ObjectId.isValid(department)) {
        return res.status(400).json({ message: "Invalid department ID" });
      }
      query.department = new mongoose.Types.ObjectId(department);
    }

    // Nếu có ngày -> tìm lịch có slot Available
if (date) {
  const targetDate = new Date(date);
  if (isNaN(targetDate.getTime())) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));

  const scheduleQuery = {
    date: { $gte: startOfDay, $lte: endOfDay },
    timeSlots: { $elemMatch: { status: "Available" } },
  };

  // ⚠️ Nếu có department => lọc thêm ở Schedule luôn
  if (department) {
    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }
    scheduleQuery.department = new mongoose.Types.ObjectId(department);
    query.department = scheduleQuery.department; // lọc ở employee luôn
  }

  const schedules = await Schedule.find(scheduleQuery);
  const availableDoctorIds = schedules
    .map((s) => s.employeeId?.toString())
    .filter(Boolean);

  if (availableDoctorIds.length === 0) {
    return res.status(200).json([]);
  }

  query._id = { $in: availableDoctorIds };
}


    const doctors = await Employee.find(query, {
      _id: 1,
      name: 1,
      department: 1,
    }).populate("department", "name"); // (tuỳ chọn) nếu bạn muốn trả cả tên khoa

    res.status(200).json(doctors);
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Lấy danh sách tất cả department (không trùng)
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({}, { _id: 1, name: 1 });
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Lấy danh sách tất cả user
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1, phone: 1, user_code: 1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy profiles theo userId
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
exports.getProfilesByUser2 = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profiles = await Profile.find({ identityNumber: userId });
    console.log(profiles.length);
    let userIdOfProfile = "";
    if (profiles.length > 0) {
      userIdOfProfile = profiles[0].userId;
    } else {
      console.log("Không tìm thấy profile nào.");
    }
    res.status(200).json({ profiles: profiles, uid: userIdOfProfile });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Lấy schedules theo doctorId
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

// Tạo profile mới
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

exports.getProfileByIdentity = async (req, res) => {
  try {
    const { identityNumber } = req.query;
    if (!identityNumber) {
      return res.status(400).json({ message: "Missing identityNumber" });
    }

    const profiles = await Profile.find({ identityNumber });

    if (profiles.length === 0) {
      return res.status(404).json({ message: "No profiles found" });
    }

    res.status(200).json(profiles);
  } catch (err) {
    console.error("Error fetching profiles:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getProfilesByUser2 = async (req, res) => {
  try {
    const userId = req.params.userId;
    const profiles = await Profile.find({ identityNumber: userId });
    console.log(profiles.length);
    let userIdOfProfile = "";
    if (profiles.length > 0) {
      userIdOfProfile = profiles[0].userId;
    } else {
      console.log("Không tìm thấy profile nào.");
    }
    res.status(200).json({ profiles: profiles, uid: userIdOfProfile });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};