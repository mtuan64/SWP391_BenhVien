const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true, index: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  date: { type: Date, required: true, index: true },
  timeSlots: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TimeSlot'
  }]
}, { timestamps: true });

scheduleSchema.index({ employeeId: 1, date: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);