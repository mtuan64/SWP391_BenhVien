const express = require('express');
const appointmentRouter = express.Router();
const apmServices = require('../../controller/appointment/apmServices');

// Appointment-related routes
appointmentRouter.get('/appointments', apmServices.getAllAppointments);

// Bác sĩ
appointmentRouter.get('/doctors', apmServices.getAllDoctors);
appointmentRouter.post('/search', apmServices.searchDoctorsByName);
appointmentRouter.get('/paginated', apmServices.getDoctorsPaginated);

// Hồ sơ
appointmentRouter.get('/:userId/profiles', apmServices.getProfilesByUserId);

module.exports = appointmentRouter;
