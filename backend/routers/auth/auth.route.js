const express = require('express');
const authRouter = express.Router();
const { Login } = require('../../controller/auth/authServices');

authRouter.post('/login', Login);

module.exports = authRouter;