const express = require('express');
const { createLabTest, getAll, findById } = require('../../controller/labtest/labTestServices');

const labTestRouter = express.Router();

labTestRouter.post('/create', createLabTest);
labTestRouter.get('/all', getAll);
labTestRouter.get('/all/:testId', findById);

module.exports = labTestRouter;