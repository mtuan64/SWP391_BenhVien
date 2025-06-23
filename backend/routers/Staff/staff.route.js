const express = require('express');
const staffRouter = express.Router();
const {getAllQA,replyQA} = require('../../controller/staff/staffService');
staffRouter.get('/qa',getAllQA);
staffRouter.put('/qa/:id',replyQA);
module.exports = staffRouter;