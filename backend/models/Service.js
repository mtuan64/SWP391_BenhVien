const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    // doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }], // References multiple doctors
    image: { type: String },
  },
  { timestamps: true }
);

serviceSchema.index({ name: 1 });

module.exports = mongoose.model("Service", serviceSchema);