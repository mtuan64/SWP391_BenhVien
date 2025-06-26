const express = require("express");
const router = express.Router();
const serviceController = require("../../controller/staff/serviceManagement");

router.get("/", serviceController.getAllServices);
router.get("/doctors", serviceController.getDoctors); // Moved before /:id
router.get("/:id", serviceController.getServiceById);
router.post("/", serviceController.createService);
router.put("/:id", serviceController.updateService);
router.delete("/:id", serviceController.deleteService);

module.exports = router;