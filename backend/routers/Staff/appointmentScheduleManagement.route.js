const express = require("express");
const router = express.Router();
const appointmentController = require("../../controller/staff/appointmentScheduleManagementController");

router.get("/", appointmentController.getAllAppointments);
router.post("/", appointmentController.createAppointment);
router.put("/:id", appointmentController.updateAppointment);
router.delete("/:id", appointmentController.deleteAppointment);

router.get("/doctors", appointmentController.getAllDoctors);
router.get("/departments", appointmentController.getAllDepartments);
router.get("/users", appointmentController.getAllUsers);
router.get("/profiles/:userId", appointmentController.getProfilesByUser);

module.exports = router;
