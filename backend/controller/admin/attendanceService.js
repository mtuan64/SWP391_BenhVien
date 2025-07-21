const Attendance = require("../../models/Attendance");
const Employee = require("../../models/Employee");
const Schedule = require("../../models/Schedule");
const AttendanceConfig = require('../../models/AttendanceConfig');
const dayjs = require("dayjs");

// GET /api/attendance
exports.getAllAttendance = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, status } = req.query;
    const query = {};

    if (employeeId) query.employeeId = employeeId;
    if (status) query.status = status;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Attendance.find(query)
      .populate("employeeId", "name email")
      .sort({ date: -1 });

    res.json({ status: "SUCCESS", data: records });
  } catch (err) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
};

// GET /api/attendance/:id
exports.getAttendanceById = async (req, res) => {
  try {
    const record = await Attendance.findById(req.params.id).populate(
      "employeeId"
    );
    if (!record) return res.status(404).json({ message: "Not found" });

    res.json({ status: "SUCCESS", data: record });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/attendance
exports.createAttendance = async (req, res) => {
  try {
    const { employeeId, checkInTime, date } = req.body;

    const checkInDate = dayjs(date).startOf("day");
    const deadlineTime = dayjs(`${checkInDate.format("YYYY-MM-DD")}T08:30`);

    const existing = await Attendance.findOne({
      employeeId,
      date: checkInDate.toDate(),
    });

    const actualCheckIn = new Date(checkInTime);
    let status = "Present";
    let notes = "";

    if (dayjs(actualCheckIn).isAfter(deadlineTime)) {
      const lateMinutes = dayjs(actualCheckIn).diff(deadlineTime, "minute");
      notes = `Late check-in by ${lateMinutes} minutes`;
    }

    if (existing) {
      // Nếu trước đó là Absent → cập nhật thành Present
      existing.checkInTime = checkInTime;
      existing.status = status;
      existing.notes = notes;
      await existing.save();
      return res.json({ message: "Check-in updated", data: existing });
    } else {
      // Chưa có bản ghi nào → tạo mới
      const record = await Attendance.create({
        employeeId,
        checkInTime,
        date: checkInDate.toDate(),
        status,
        notes,
      });

      return res
        .status(201)
        .json({ message: "Check-in recorded", data: record });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PUT /api/attendance/:id
exports.updateAttendance = async (req, res) => {
  try {
    const updated = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ status: "SUCCESS", data: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/attendance/:id
exports.deleteAttendance = async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.json({ status: "SUCCESS", message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/attendance/stats/summary
exports.getAttendanceSummary = async (req, res) => {
  try {
    const { employeeId, month } = req.query;
    const start = dayjs(month).startOf("month").toDate();
    const end = dayjs(month).endOf("month").toDate();

    const query = { date: { $gte: start, $lte: end } };
    if (employeeId) query.employeeId = employeeId;

    const records = await Attendance.find(query);

    const summary = {
      present: 0,
      absent: 0,
      onLeave: 0,
      totalWorkHours: 0,
    };

    for (const rec of records) {
      if (rec.status === "Present") {
        summary.present++;
        if (rec.checkInTime && rec.checkOutTime) {
          summary.totalWorkHours +=
            (new Date(rec.checkOutTime) - new Date(rec.checkInTime)) /
            (1000 * 60 * 60);
        }
      } else if (rec.status === "Absent") {
        summary.absent++;
      } else {
        summary.onLeave++;
      }
    }

    res.json({ status: "SUCCESS", data: summary });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getConfig = async (req, res) => {
  try {
    let config = await AttendanceConfig.findOne();
    if (!config) {
      config = await AttendanceConfig.create({ checkInDeadline: "08:30" });
    }
    res.status(200).json({ config });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

// Cập nhật deadline
exports.updateConfig = async (req, res) => {
  try {
    const { checkInDeadline } = req.body;

    if (!checkInDeadline || !/^\d{2}:\d{2}$/.test(checkInDeadline)) {
      return res.status(400).json({ message: "Định dạng giờ không hợp lệ (HH:mm)" });
    }

    let config = await AttendanceConfig.findOne();
    if (!config) {
      config = await AttendanceConfig.create({ checkInDeadline });
    } else {
      config.checkInDeadline = checkInDeadline;
      await config.save();
    }

    res.status(200).json({ message: "Cập nhật thành công", config });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
