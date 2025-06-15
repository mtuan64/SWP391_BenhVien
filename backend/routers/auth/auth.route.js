const express = require('express');
const authRouter = express.Router();
const { Login,Signup,check ,changePassword } = require('../../controller/auth/authServices');
const {authMiddleware,ismeomeo } = require('../../middleware/auth.middleware');

authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
authRouter.post('/updatePassword',changePassword);
authRouter.post('/authMiddleware', authMiddleware,ismeomeo,check);

module.exports = authRouter;