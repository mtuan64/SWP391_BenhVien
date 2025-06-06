const express = require('express');
const appointmentRouter = express.Router();
const { getDoctors, getDoctor, createDoctor, updateDoctor, deleteDoctor, } = require("../../controller/appointment/apmServices");

// doctor services
appointmentRouter.get("/doctors", getDoctors);
appointmentRouter.get("/doctors/:id", getDoctor)
appointmentRouter.post("/create-doctor", createDoctor)
appointmentRouter.put("/update-doctor/:id", updateDoctor);
appointmentRouter.delete("/delete-doctor/:id", deleteDoctor);
//

module.exports = appointmentRouter;