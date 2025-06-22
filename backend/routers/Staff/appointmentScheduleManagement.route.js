const express = require("express");
const router = express.Router();
const appointmentController = require("../../controller/staff/appointmentScheduleManagementController");

// Routes
router.get("/", appointmentController.getAllAppointments);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

// Route mới lấy danh sách bác sĩ
router.get("/doctors", appointmentController.getAllDoctors);
router.get("/departments", appointmentController.getAllDepartments);
module.exports = router;
