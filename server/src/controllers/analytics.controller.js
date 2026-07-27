import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

// ======================================
// Dashboard Summary
// ======================================

export const dashboardSummary = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalProducts = await Product.countDocuments();

        const totalOrders = await Order.countDocuments();

        const deliveredOrders = await Order.find({
            orderStatus: "Delivered",
        });

        const totalRevenue = deliveredOrders.reduce(
            (sum, order) => sum + order.totalPrice,
            0
        );

        res.status(200).json({
            success: true,
            summary: {
                totalUsers,
                totalProducts,
                totalOrders,
                totalRevenue,
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
// Order Status Analytics
// ======================================

export const orderStatusAnalytics = async (req, res) => {
    try {

        const pending = await Order.countDocuments({
            orderStatus: "Pending",
        });

        const confirmed = await Order.countDocuments({
            orderStatus: "Confirmed",
        });

        const shipped = await Order.countDocuments({
            orderStatus: "Shipped",
        });

        const delivered = await Order.countDocuments({
            orderStatus: "Delivered",
        });

        const cancelled = await Order.countDocuments({
            orderStatus: "Cancelled",
        });

        res.status(200).json({
            success: true,
            analytics: {
                pending,
                confirmed,
                shipped,
                delivered,
                cancelled,
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
// Daily Sales
// ======================================

export const dailySales = async (req, res) => {
    try {
        const sales = await Order.aggregate([
            {
                $match: {
                    orderStatus: "Delivered",
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    totalSales: {
                        $sum: "$totalPrice",
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            sales,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// ======================================
// Monthly Sales
// ======================================

export const monthlySales = async (req, res) => {
    try {

        const sales = await Order.aggregate([
            {
                $match: {
                    orderStatus: "Delivered",
                },
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                        month: {
                            $month: "$createdAt",
                        },
                    },
                    revenue: {
                        $sum: "$totalPrice",
                    },
                    orders: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            sales,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Yearly Sales
// ======================================

export const yearlySales = async (req, res) => {
    try {

        const sales = await Order.aggregate([
            {
                $match: {
                    orderStatus: "Delivered",
                },
            },
            {
                $group: {
                    _id: {
                        year: {
                            $year: "$createdAt",
                        },
                    },
                    revenue: {
                        $sum: "$totalPrice",
                    },
                    orders: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                },
            },
        ]);

        res.status(200).json({
            success: true,
            sales,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Top Customers
// ======================================

export const topCustomers = async (req, res) => {
    try {

        const customers = await Order.aggregate([
            {
                $match: {
                    orderStatus: "Delivered",
                },
            },
            {
                $group: {
                    _id: "$user",
                    totalSpent: {
                        $sum: "$totalPrice",
                    },
                    totalOrders: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    totalSpent: -1,
                },
            },
            {
                $limit: 10,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "customer",
                },
            },
            {
                $unwind: "$customer",
            },
        ]);

        res.status(200).json({
            success: true,
            customers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};