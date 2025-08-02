const mongoose = require("mongoose");

const attendanceSessionSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true, index: true },
  isActive: { type: Boolean, default: false },
  startTime: { type: Date }, 
  endTime: { type: Date }, 
}, { timestamps: true });

module.exports = mongoose.model("AttendanceSession", attendanceSessionSchema);

