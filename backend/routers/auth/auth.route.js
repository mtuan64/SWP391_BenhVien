const express = require('express');
const authRouter = express.Router();
const { Login,Signup } = require('../../controller/auth/authServices');

authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
module.exports = authRouter;