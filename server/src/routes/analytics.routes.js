import express from "express";

import {
    dashboardSummary,
    orderStatusAnalytics,
    dailySales,
    monthlySales,
    yearlySales,
    topCustomers,
} from "../controllers/analytics.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";

const router = express.Router();

router.get(
    "/dashboard",
    protect,
    adminOnly,
    dashboardSummary
);

router.get(
    "/order-status",
    protect,
    adminOnly,
    orderStatusAnalytics
);
// Daily Sales
router.get(
    "/daily-sales",
    protect,
    adminOnly,
    dailySales
);

// Monthly Sales
router.get(
    "/monthly-sales",
    protect,
    adminOnly,
    monthlySales
);

// Yearly Sales
router.get(
    "/yearly-sales",
    protect,
    adminOnly,
    yearlySales
);

// Top Customers
router.get(
    "/top-customers",
    protect,
    adminOnly,
    topCustomers
);

export default router;