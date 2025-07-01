const express = require("express");
const router = express.Router();
const profileController = require("../../controller/user/userMedicalProfile.controller");

// Tạo hồ sơ mới
router.post("/", profileController.createProfile);

// Lấy tất cả hồ sơ
router.get("/", profileController.getAllProfiles);

// Lấy hồ sơ theo doctorId (mới thêm)
router.get("/all/:doctorId", profileController.getProfilesByDoctor);

// Lấy hồ sơ theo ID
router.get("/:profileId", profileController.getProfileById);

// Cập nhật hồ sơ theo ID
router.put("/:id", profileController.updateProfileById);

// Xoá hồ sơ theo ID
router.delete("/:id", profileController.deleteProfileById);

module.exports = router;
