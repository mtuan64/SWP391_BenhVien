// backend/routers/Doctor/doctor.route.js
const express = require("express");
const router = express.Router();
const {getAllDoctorsForApm} = require("../../controller/doctor/doctorService");

// Route mẫu
router.get("/", (req, res) => {
  res.send("Doctor route is working!");
}); 
router.get("/doctor", getAllDoctorsForApm);

module.exports = router;
