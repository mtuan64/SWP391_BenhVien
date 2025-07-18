const express = require('express');
const ProfileRouter = express.Router();

const {
  getAllProfile,
  createProfile,
  updateProfile,
  deleteProfile,
  getAllMedicines,
  getDoctors,
  searchUserByCode,
  getProfileByUserId
} = require("../../controller/staff/MedicalRecord");

const {
  authStaffMiddleware,
  authMiddleware,
  authUserMiddleware
} = require("../../middleware/auth.middleware");

// Profile Routes
ProfileRouter.get("/profiles", authStaffMiddleware, getAllProfile);
ProfileRouter.get("/user_search/:user_code", searchUserByCode);
ProfileRouter.get("/medicalrecord/:user_id", authUserMiddleware,getProfileByUserId);
ProfileRouter.get("/medicines", authStaffMiddleware, getAllMedicines);
ProfileRouter.get("/doctors", authStaffMiddleware, getDoctors);
ProfileRouter.post("/profiles", authStaffMiddleware, createProfile);
ProfileRouter.put("/profiles/:id", authStaffMiddleware, updateProfile);
ProfileRouter.delete("/profiles/:id", authStaffMiddleware, deleteProfile);

module.exports = ProfileRouter;