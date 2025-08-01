const express = require('express');
const router = express.Router();
const { getProcedureRequestsForDoctor2 } = require('../../controller/doctor2/patientlistController');

// Get all procedure requests assigned to a specific Doctor2 by ID
router.get('/procedure-requests/:doctorId2', getProcedureRequestsForDoctor2);

module.exports = router;