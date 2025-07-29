const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const MedicalRecord = require("../../models/MedicalRecord");

router.get("/danhsachprofile/:userId", async (req, res) => {
  try {
    const profiles = await Profile.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách hồ sơ", error: err.message });
  }
});
// routes/medicalRecord.js


router.get("/hosobenhan/:profileId", async (req, res) => {
  try {
    const records = await MedicalRecord.find({ profileId: req.params.profileId })
      .populate("doctorId", "name")
      .populate("procedureRequests")
      .populate("prescriptions")
      .sort({ createdAt: -1 });

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi lấy bản ghi bệnh án", error: err.message });
  }
});

router.put("/capnhatprofile/:id", async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ message: "Không tìm thấy hồ sơ" });
    res.status(200).json(updatedProfile);
  } catch (err) {
    res.status(500).json({ message: "Lỗi khi cập nhật hồ sơ", error: err.message });
  }
});


module.exports = router;