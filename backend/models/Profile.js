const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  identityNumber: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  diagnose: {
    type: String,
    trim: true
  },
  note: {
    type: String,
    trim: true
  },
  issues: {
    type: String,
    trim: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    default: null
  },
  medicine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine',
    default: null
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    default: null
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);