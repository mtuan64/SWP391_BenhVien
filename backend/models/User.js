const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  profiles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
