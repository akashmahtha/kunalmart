import Product from "../models/Product.js";
import Inventory from "../models/Inventory.js";


// ======================================
// Restock Product
// ======================================

export const restockProduct = async (req, res) => {
    try {
        const { quantity, reason } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid quantity",
            });
        }

        const oldStock = product.stock;

        product.stock += Number(quantity);

        await product.save();

        await Inventory.create({
            product: product._id,
            oldStock,
            newStock: product.stock,
            quantity,
            type: "IN",
            reason: reason || "Restocked",
            updatedBy: req.user._id,
        });

        res.status(200).json({
            success: true,
            message: "Product restocked successfully",
            product,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Get Inventory History
// ======================================

export const getInventoryHistory = async (req, res) => {
    try {
        const history = await Inventory.find({
            product: req.params.id,
        })
            .populate("updatedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: history.length,
            history,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Low Stock Products
// ======================================

export const getLowStockProducts = async (req, res) => {
    try {

        const products = await Product.find({
            stock: {
                $gt: 0,
                $lte: 10,
            },
        })
            .populate("category", "name")
            .sort({ stock: 1 });

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Out Of Stock Products
// ======================================

export const getOutOfStockProducts = async (req, res) => {
    try {

        const products = await Product.find({
            stock: 0,
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Inventory Dashboard
// ======================================

export const inventoryDashboard = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const lowStock = await Product.countDocuments({
            stock: {
                $gt: 0,
                $lte: 10,
            },
        });

        const outOfStock = await Product.countDocuments({
            stock: 0,
        });

        const inventoryValue = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalValue: {
                        $sum: {
                            $multiply: ["$stock", "$price"],
                        },
                    },
                },
            },
        ]);

        const totalInventoryValue =
            inventoryValue.length > 0
                ? inventoryValue[0].totalValue
                : 0;

        res.status(200).json({
            success: true,
            dashboard: {
                totalProducts,
                lowStock,
                outOfStock,
                totalInventoryValue,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Recently Restocked Products
// ======================================

export const recentRestocks = async (req, res) => {
    try {

        const history = await Inventory.find({
            type: "IN",
        })
            .populate("product", "name stock")
            .populate("updatedBy", "name")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: history.length,
            history,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Top Restocked Products
// ======================================

export const topRestockedProducts = async (req, res) => {
    try {

        const products = await Inventory.aggregate([
            {
                $match: {
                    type: "IN",
                },
            },
            {
                $group: {
                    _id: "$product",
                    totalRestocked: {
                        $sum: "$quantity",
                    },
                },
            },
            {
                $sort: {
                    totalRestocked: -1,
                },
            },
            {
                $limit: 10,
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: "$product",
            },
        ]);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};