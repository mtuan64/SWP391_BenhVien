const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  role: { type: String, enum: ['Doctor', 'Staff', 'Admin'], required: true },
  degree: { type: String, required: true },
  expYear: { type: String },
  department: { type: String },
  specialization: { type: String },
  phone: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }], 
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Services' }],
}, { timestamps: true });

employeeSchema.index({ role: 1, status: 1 }); // Index for doctor queries

module.exports = mongoose.model('Employee', employeeSchema);
