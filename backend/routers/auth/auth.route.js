const express = require('express');
const authRouter = express.Router();
<<<<<<< HEAD
const { Login, registerUser } = require('../../controller/auth/authServices');

authRouter.post('/login', Login);
// authRouter.post('/register', registerUser);
=======
const { Login,Signup,check ,changePassword, forgotPassword, resetPassword} = require('../../controller/auth/authServices');
const {authMiddleware,ismeomeo } = require('../../middleware/auth.middleware');

authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
authRouter.post('/updatePassword',changePassword);
authRouter.post('/authMiddleware', authMiddleware,ismeomeo,check);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword);
>>>>>>> origin/test

module.exports = authRouter;