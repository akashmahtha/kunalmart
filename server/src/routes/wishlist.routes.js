import express from "express";

import {
    addToWishlist,
    getWishlist,
    removeFromWishlist,
} from "../controllers/wishlist.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ===============================
// Wishlist Routes
// ===============================

// Add Product to Wishlist
router.post("/", protect, addToWishlist);

// Get User Wishlist
router.get("/", protect, getWishlist);

// Remove Product from Wishlist
router.delete("/:productId", protect, removeFromWishlist);

export default router;