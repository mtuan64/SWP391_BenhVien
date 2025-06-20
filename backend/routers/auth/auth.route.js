const express = require('express');
const authRouter = express.Router();
const { Login, registerUser } = require('../../controller/auth/authServices');

authRouter.post('/login', Login);
// authRouter.post('/register', registerUser);

module.exports = authRouter;