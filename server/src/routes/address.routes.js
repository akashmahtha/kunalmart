import express from "express";

import {
    addAddress,
    getAddresses,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../controllers/address.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// ===============================
// Address Routes
// ===============================

// Add Address
router.post("/", protect, addAddress);

// Get All Addresses
router.get("/", protect, getAddresses);

// Update Address
router.put("/:id", protect, updateAddress);

// Delete Address
router.delete("/:id", protect, deleteAddress);

// Set Default Address
router.patch("/default/:id", protect, setDefaultAddress);

export default router;