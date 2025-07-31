const express = require('express');
const router = express.Router();
const procedureResultController = require('../../controller/doctor2/labtestController');

router.get('/parameters/:testType', (req, res, next) => {
  console.log(`Received GET request for /parameters/${req.params.testType}`);
  procedureResultController.getTestParameters(req, res, next);
});

router.post('/submit', procedureResultController.submitTestResult);

module.exports = router;