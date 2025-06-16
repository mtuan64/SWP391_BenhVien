const express = require('express');
const appointmentRouter = express.Router();
const { getAll } = require('../../controller/appointment/apmServices');

appointmentRouter.get("/all", getAll);

module.exports = appointmentRouter;