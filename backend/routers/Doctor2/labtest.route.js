const express = require('express');
const router = express.Router();
const procedureResultController = require('../../controller/doctor2/labtestController');

router.get('/parameters/:testType', (req, res, next) => {
  console.log(`Received GET request for /parameters/${req.params.testType}`);
  procedureResultController.getTestParameters(req, res, next);
});

router.post('/submit', (req, res, next) => {
  console.log('Received POST request for /submit');
  procedureResultController.submitTestResult(req, res, next);
});

router.get('/results/doctor/:doctorId2', (req, res, next) => {
  console.log(`Received GET request for /results/doctor/${req.params.doctorId2}`);
  procedureResultController.getAllProcedureResultByDoctorId2(req, res, next);
});

module.exports = router;