const express = require('express');
const staffService = require('../../controller/staff/staffService');
const staffRouter = express.Router();

staffRouter.post('/medicines', staffService.createMedicine);
staffRouter.get('/medicines', staffService.getAllMedicines);
staffRouter.get('/medicines/:id', staffService.getMedicineById);
staffRouter.put('/medicines/:id', staffService.updateMedicine);
staffRouter.delete('/medicines/:id', staffService.deleteMedicine);

module.exports = staffRouter;