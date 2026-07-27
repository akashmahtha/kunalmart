import express from "express";

import {
    addReview,
    getProductReviews,
    updateReview,
    deleteReview,
} from "../controllers/review.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ================================
// Review Routes
// ================================

// Add Review
router.post("/", protect, addReview);

// Get Reviews of Product
router.get("/product/:productId", getProductReviews);

// Update Review
router.put("/:id", protect, updateReview);

// Delete Review
router.delete("/:id", protect, deleteReview);

export default router;