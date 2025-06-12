const express = require('express');
const authRouter = express.Router();
const { Login, SignUp, Middleware } = require('../../controller/auth/authServices');
const { authMiddleware, adminMiddleware } = require('../../middleware/authMiddleWare');

authRouter.post('/login', Login);
authRouter.post('/signup', SignUp);
authRouter.get('/middleware', authMiddleware, SignUp);

module.exports = authRouter;