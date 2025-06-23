const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }],
  emailVerificationCode: { type: String, default: null }, // Lưu code reset
  verificationExpires: { type: Date, default: null }, // Thời gian hết hạn

  // cac atribute cho them
//  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
// address: { type: String },
// dateOfBirth: { type: Date },
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
