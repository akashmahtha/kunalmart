import express from "express";

import {
    dashboard,
    getRecentOrders,
    getLowStockProducts,
    getTopProducts,
    getAllUsers,
    getUserDetails,
    blockUser,
    unblockUser,
    deleteUser,
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

// ======================================
// All Admin Routes
// ======================================

// Dashboard Statistics
router.get(
    "/dashboard",
    protect,
    adminOnly,
    dashboard
);

// Recent Orders
router.get(
    "/recent-orders",
    protect,
    adminOnly,
    getRecentOrders
);

// Low Stock Products
router.get(
    "/low-stock",
    protect,
    adminOnly,
    getLowStockProducts
);

// Top Selling Products
router.get(
    "/top-products",
    protect,
    adminOnly,
    getTopProducts
);


// ======================================
// User Management
// ======================================

// Get All Users
router.get(
    "/users",
    protect,
    adminOnly,
    getAllUsers
);

// Get User Details
router.get(
    "/users/:id",
    protect,
    adminOnly,
    getUserDetails
);

// Block User
router.patch(
    "/users/block/:id",
    protect,
    adminOnly,
    blockUser
);

// Unblock User
router.patch(
    "/users/unblock/:id",
    protect,
    adminOnly,
    unblockUser
);

// Delete User
router.delete(
    "/users/:id",
    protect,
    adminOnly,
    deleteUser
);

export default router;