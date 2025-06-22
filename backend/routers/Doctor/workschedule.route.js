const express = require('express');
const appointmentRouter = express.Router();

const { getAll } = require('../../controller/doctor/workschedule');

appointmentRouter.get("/all", getAll);

module.exports = appointmentRouter;