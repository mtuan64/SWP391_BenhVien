const express = require('express');
const staffRouter = express.Router();
const staffController = require('../../controller/staff/staffService');


// Route test
staffRouter.get('/', (req, res) => {
  res.send("Staff route is working!");
});

// Checkup
staffRouter.post('/checkup', staffController.createCheckup);

// Schedule
staffRouter.post('/schedule', staffController.createSchedule);
staffRouter.get('/schedule', staffController.getSchedules);
staffRouter.put('/schedule/:id', staffController.updateSchedule);
staffRouter.delete('/schedule/:id', staffController.deleteSchedule);

module.exports = staffRouter;
