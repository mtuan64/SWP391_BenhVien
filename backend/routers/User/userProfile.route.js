const express = require("express");
const userProfileRouter = express.Router();
const {
    createProfile,
    getMyProfiles,
    getProfileById,
    updateProfile,
    deleteProfile
} = require("../../controller/user/userProfileService");
const { authMiddleware } = require("../../middleware/auth.middleware");

userProfileRouter.use(authMiddleware); // bảo vệ tất cả routes dưới đây

userProfileRouter.post("/create", createProfile);
userProfileRouter.get("/profile", getMyProfiles);
userProfileRouter.get("/profile/:id", getProfileById);
userProfileRouter.put("/profile/:id/update", updateProfile);
userProfileRouter.delete("/profile/:id/delete", deleteProfile);

module.exports = userProfileRouter;
