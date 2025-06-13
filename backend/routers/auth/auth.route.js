const express = require('express');
const authRouter = express.Router();
const { Login,Signup,check  } = require('../../controller/auth/authServices');
const {authMiddleware,ismeomeo } = require('../../middleware/auth.middleware');

authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
authRouter.post('/authMiddleware', authMiddleware,ismeomeo,check);

module.exports = authRouter;