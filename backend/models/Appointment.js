const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, index: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  appointmentDate: { type: Date, required: true, index: true },
  type: { type: String, enum: ['Online', 'Offline'], required: true },
  status: { type: String, enum: ['Booked', 'In-Progress', 'Completed', 'Canceled'], default: 'Booked' },
  reminderSent: { type: Boolean, default: false }
}, { timestamps: true });

appointmentSchema.index({ doctorId: 1, appointmentDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);