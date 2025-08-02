const Attendance = require("../../models/Attendance");
const Employee = require("../../models/Employee");
const dayjs = require("dayjs");

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

    const enrichedRecords = records.map((rec) => {
      let workingDuration = null;

      if (rec.checkInTime && rec.checkOutTime) {
        const inTime = dayjs(rec.checkInTime, "HH:mm");
        const outTime = dayjs(rec.checkOutTime, "HH:mm");

        const minutes = outTime.diff(inTime, "minute");
        if (minutes > 0) {
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;
          workingDuration = `${hours}h ${mins}m`;
        }
      }

      return {
        ...rec._doc,
        workingDuration,
      };
    });

    res.json({ status: "SUCCESS", data: enrichedRecords });
  } catch (err) {
    res.status(500).json({ status: "ERROR", message: err.message });
    console.log(err);
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { note } = req.body;
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    attendance.notes = note;
    await attendance.save();

    res.json({ status: "SUCCESS", message: "Note updated", data: attendance });
  } catch (err) {
    res.status(500).json({ status: "ERROR", message: err.message });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    const { employeeId, checkInTime, date } = req.body;

    const checkInDate = dayjs(date).startOf("day");
    const actualCheckIn = dayjs(checkInTime);
    const existing = await Attendance.findOne({
      employeeId,
      date: checkInDate.toDate(),
    });

    const config = await AttendanceConfig.findOne();
    const deadlineTimeStr = config?.checkInDeadline || "08:30";
    const deadlineTime = dayjs(
      `${checkInDate.format("YYYY-MM-DD")}T${deadlineTimeStr}`
    );

    let status = "Present";
    let notes = "";

    if (actualCheckIn.isAfter(deadlineTime)) {
      const lateMinutes = actualCheckIn.diff(deadlineTime, "minute");
      notes = `Late check-in by ${lateMinutes} minutes`;
    }

    if (existing) {
      existing.checkInTime = actualCheckIn.toDate();
      existing.status = status;
      existing.notes = notes;
      await existing.save();
      return res.json({ message: "Check-in updated", data: existing });
    } else {
      const record = await Attendance.create({
        employeeId,
        checkInTime: actualCheckIn.toDate(),
        date: checkInDate.toDate(),
        status,
        notes,
      });

      return res
        .status(201)
        .json({ message: "Check-in recorded", data: record });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.getAttendConfig = async (req, res) => {
  try {
    const config = await AttendConfig.findOne();
    if (!config) return res.status(404).json({ message: "Config not found" });
    res.status(200).json({ data: config });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

exports.updateAttendConfig = async (req, res) => {
  try {
    const { deadlineTime } = req.body;
    let config = await AttendConfig.findOne();

    if (!config) {
      config = new AttendConfig({ deadlineTime });
    } else {
      config.deadlineTime = deadlineTime;
    }

    await config.save();
    res.status(200).json({ message: "Updated successfully", data: config });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.startAttendance = async (req, res) => {
  try {
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    // Bước 1: Lấy tất cả nhân viên không phải Admin
    const employees = await Employee.find({
      role: { $ne: "Admin" },
      status: "active",
    });

    if (employees.length === 0) {
      return res
        .status(404)
        .json({ message: "Không có nhân viên để điểm danh." });
    }

    // Bước 2: Kiểm tra nhân viên nào hôm nay chưa có bản ghi điểm danh
    const existingAttendance = await Attendance.find({
      date: { $gte: todayStart, $lte: todayEnd },
    }).select("employeeId");

    const attendedIds = new Set(
      existingAttendance.map((a) => a.employeeId.toString())
    );

    // Bước 3: Tạo bản ghi "Absent" cho những nhân viên chưa có điểm danh
    const toCreate = employees
      .filter((emp) => !attendedIds.has(emp._id.toString()))
      .map((emp) => ({
        employeeId: emp._id,
        date: new Date(),
        status: "Absent",
        checkInTime: null,
        notes: "",
      }));

    if (toCreate.length === 0) {
      return res
        .status(200)
        .json({ message: "Tất cả nhân viên đã có điểm danh hôm nay." });
    }

    await Attendance.insertMany(toCreate);

    res
      .status(200)
      .json({ message: `Đã tạo điểm danh cho ${toCreate.length} nhân viên.` });
  } catch (err) {
    console.error("Lỗi khi tạo điểm danh:", err);
    res.status(500).json({ message: "Lỗi server khi khởi tạo điểm danh." });
  }
};

exports.checkIn = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "Chưa khởi tạo điểm danh cho nhân viên này." });
    }

    if (attendance.status === "Present") {
      return res.status(400).json({ message: "Bạn đã check-in rồi." });
    }

    attendance.status = "Present";
    attendance.checkInTime = new Date();
    await attendance.save();

    res.status(200).json({ message: "Check-in thành công." });
  } catch (err) {
    console.error("Check-in Error:", err);
    res.status(500).json({ message: "Lỗi server khi check-in." });
  }
};

exports.checkOut = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    if (!attendance) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy bản ghi điểm danh hôm nay." });
    }

    if (!attendance.checkInTime) {
      return res
        .status(400)
        .json({ message: "Bạn chưa check-in nên không thể check-out." });
    }

    attendance.checkOutTime = new Date();
    await attendance.save();

    res.status(200).json({ message: "Check-out thành công." });
  } catch (err) {
    console.error("Check-out Error:", err);
    res.status(500).json({ message: "Lỗi server khi check-out." });
  }
};

exports.getTodayStatus = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const todayStart = dayjs().startOf("day").toDate();
    const todayEnd = dayjs().endOf("day").toDate();

    const attendance = await Attendance.findOne({
      employeeId,
      date: { $gte: todayStart, $lte: todayEnd },
    });

    if (!attendance) {
      return res.status(200).json({ status: "Absent", checkInTime: null, checkOutTime: null });
    }

    res.status(200).json({
      status: attendance.status,
      checkInTime: attendance.checkInTime || null,
      checkOutTime: attendance.checkOutTime || null,
    });
  } catch (err) {
    console.error("Get Today Status Error:", err);
    res.status(500).json({ message: "Lỗi server khi lấy trạng thái điểm danh." });
  }
};
