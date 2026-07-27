import express from "express";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    featuredProducts,
    trendingProducts,
    bestSellerProducts,
    latestProducts,
    relatedProducts,
} from "../controllers/product.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();


// ===============================
// Public Routes
// ===============================

// Get all products
router.get("/", getProducts);

// Search + Filter + Pagination
router.get("/search", searchProducts);

// Featured Products
router.get("/featured", featuredProducts);

// Trending Products
router.get("/trending", trendingProducts);

// Best Seller Products
router.get("/bestseller", bestSellerProducts);

// Latest Products
router.get("/latest", latestProducts);

// Related Products
router.get("/related/:id", relatedProducts);

// Get Single Product
router.get("/:id", getProduct);


// ===============================
// Admin Routes
// ===============================

// Create Product
router.post(
    "/",
    protect,
    adminOnly,
    upload.array("images", 5),
    createProduct
);

// Update Product
router.put(
    "/:id",
    protect,
    adminOnly,
    upload.array("images", 5),
    updateProduct
);

// Delete Product
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteProduct
);

export default router;