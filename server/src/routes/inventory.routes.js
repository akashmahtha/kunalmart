import express from "express";

import {
    restockProduct,
    getInventoryHistory,
    getLowStockProducts,
    getOutOfStockProducts,
    inventoryDashboard,
    recentRestocks,
    topRestockedProducts,
} from "../controllers/inventory.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

// ======================================
// Inventory Routes
// ======================================

// Restock Product
router.patch(
    "/restock/:id",
    protect,
    adminOnly,
    restockProduct
);
// ======================================
// Inventory History
// ======================================

router.get(
    "/history/:id",
    protect,
    adminOnly,
    getInventoryHistory
);
// Inventory Dashboard
router.get(
    "/dashboard",
    protect,
    adminOnly,
    inventoryDashboard
);

// Recently Restocked
router.get(
    "/recent-restocks",
    protect,
    adminOnly,
    recentRestocks
);

// Top Restocked Products
router.get(
    "/top-restocked",
    protect,
    adminOnly,
    topRestockedProducts
);
// ======================================
// Low Stock Products
// ======================================

router.get(
    "/low-stock",
    protect,
    adminOnly,
    getLowStockProducts
);

// ======================================
// Out Of Stock Products
// ======================================

router.get(
    "/out-of-stock",
    protect,
    adminOnly,
    getOutOfStockProducts
);

export default router;