const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  price: { type: Number, required: true, min: 0 }
}, { timestamps: true });

serviceSchema.index({ name: 1 });

module.exports = mongoose.model('Service', serviceSchema);