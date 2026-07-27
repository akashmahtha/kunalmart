import express from "express";
import {
    register, login, updateProfile,
    changePassword,
} from "../controllers/auth.controller.js";
import {
    validateRegister,
    validateLogin,
} from "../middleware/validation.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.put("/profile", protect, updateProfile);

router.put("/change-password", protect, changePassword);

export default router;