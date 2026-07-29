import express from "express";

import {
    placeOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus,
} from "../controllers/order.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

// =====================================
// User Routes
// =====================================

// Place Order
router.post("/", protect, placeOrder);

// My Orders
router.get("/", protect, getMyOrders);

// Single Order
router.get("/:id", protect, getOrderById);

// Cancel Order
router.patch("/cancel/:id", protect, cancelOrder);

// =====================================
// Admin Routes
// =====================================

// All Orders
router.get("/admin/all", protect, adminOnly, getAllOrders);

// Update Status
router.patch(
    "/admin/status/:id",
    protect,
    adminOnly,
    updateOrderStatus
);

router.patch(
    "/admin/status/:id",
    protect,
    adminOnly,
    updateOrderStatus
);

export default router;