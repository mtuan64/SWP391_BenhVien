const express = require('express');
const { createCheckup } = require('../../controller/checkup/checkUpServices');
const checkupRouter = express.Router();

checkupRouter.post('/create', createCheckup);

module.exports = checkupRouter;