const mongoose = require("mongoose");


const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    diagnose: { type: String },
    note: { type: String },
    issues: { type: String },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
    }, userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false }
  },
  { timestamps: true }
);


profileSchema.index({ name: 1 });

module.exports = mongoose.model("Profile", profileSchema);
