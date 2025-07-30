const express = require('express');
const authRouter = express.Router();
const { Login, Signup, check, changePassword, forgotPassword, resetPassword , oauthLogin } = require('../../controller/auth/authServices');
const { authMiddleware, ismeomeo } = require('../../middleware/auth.middleware');
authRouter.post('/login', Login);
authRouter.post('/signup', Signup);
authRouter.post('/updatePassword', changePassword);
// authRouter.post('/authMiddleware', authMiddleware, ismeomeo, check);
authRouter.post('/forgotPassword', forgotPassword);
authRouter.post('/resetPassword', resetPassword);
authRouter.post("/oauth-login", oauthLogin);
console.log("✅ auth.route loaded");

authRouter.post("/oauth-login", (req, res) => {

  console.log("✅ /oauth-login route hit");
  res.json({ success: true });
});
module.exports = authRouter;