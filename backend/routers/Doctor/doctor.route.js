// backend/routers/Doctor/doctor.route.js
const express = require("express");
const router = express.Router();

// Route mẫu
router.get("/", (req, res) => {
  res.send("Doctor route is working!");
}); 

module.exports = router;
