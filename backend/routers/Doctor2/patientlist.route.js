const express = require('express');
const router = express.Router();
const { getProcedureRequestsForDoctor2 } = require('../../controller/doctor2/patientlistController');
const { authDoctor2Middleware } = require('../../middleware/auth.middleware');

// Get all procedure requests assigned to the authenticated Doctor2
router.get('/procedure-requests', authDoctor2Middleware, getProcedureRequestsForDoctor2);

module.exports = router;