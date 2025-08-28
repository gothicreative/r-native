import express from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import { followUser, updateProfile, getUserProfile, syncUser, getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username",getUserProfile); 

router.put("/profile",protectRoute, updateProfile);
router.post("/sync",protectRoute, syncUser);
router.post("/me",protectRoute, getCurrentUser);
router.post("/follow/:targetUserId",protectRoute, followUser);




export default router;