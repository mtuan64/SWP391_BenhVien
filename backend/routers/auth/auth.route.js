const express = require('express');
const router = express.Router();

const controller = require('../../controller/auth/login'); 
router.post('/login', controller.login);

module.exports = router;