const express = require("express");
const router = express.Router();
const userController = require("../../controller/staff/userManagementController");

// Chỉ định route → gọi controller xử lý
router.get("/", userController.getAllUsers);
router.get("/identity/:identityNumber", userController.getUserByIdentityNumber);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
