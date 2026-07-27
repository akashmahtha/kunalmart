import express from "express";
import {
    addToCart,
    getCart,
    updateCart,
    removeCartItem,
    clearCart,
} from "../controllers/cart.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ===============================
// Debug Route
// ===============================
router.post(
    "/",
    (req, res, next) => {
        console.log("BODY IN ROUTE:", req.body);
        console.log("HEADERS:", req.headers);
        next();
    },
    protect,
    addToCart
);

// ===============================
// Get Cart
// ===============================
router.get("/", protect, getCart);

// ===============================
// Update Cart
// ===============================
router.put("/:productId", protect, updateCart);

// ===============================
// Remove Item
// ===============================
router.delete("/:productId", protect, removeCartItem);

// ===============================
// Clear Cart
// ===============================
router.delete("/", protect, clearCart);

export default router;