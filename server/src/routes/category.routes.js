import express from "express";
import upload from "../middleware/upload.middleware.js";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} from "../controllers/category.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get("/", getCategories);
router.get("/:id", getCategory);

// ✅ upload.single("image") MUST be here
router.post(
    "/",
    protect,
    adminOnly,
    upload.single("image"),
    createCategory
);

router.put(
    "/:id",
    protect,
    adminOnly,
    upload.single("image"),
    updateCategory
);

router.delete("/:id", protect, adminOnly, deleteCategory);

export default router;