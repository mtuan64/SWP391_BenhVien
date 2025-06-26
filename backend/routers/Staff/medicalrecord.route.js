const express = require('express');
const ProfileRouter = express.Router();

const {
  getAllProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getAllMedicines,
  getDoctors
} = require("../../controller/staff/MedicalRecord");

const {
  authStaffMiddleware
} = require("../../middleware/auth.middleware");

// Profile Routes
ProfileRouter.get("/profiles", getAllProfile);
ProfileRouter.get("/medicines", getAllMedicines);
ProfileRouter.get("/doctors", getDoctors);
ProfileRouter.post("/profiles", authStaffMiddleware, createProfile);
ProfileRouter.put("/profiles/:id", authStaffMiddleware, updateProfile);
ProfileRouter.delete("/profiles/:id", authStaffMiddleware, deleteProfile);

module.exports = ProfileRouter;