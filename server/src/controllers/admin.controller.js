import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";


// ======================================
// Dashboard Statistics
// ======================================

export const dashboard = async (req, res) => {
    try {
        // Counts
        const totalUsers = await User.countDocuments();
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        const totalOrders = await Order.countDocuments();

        // Order Status
        const pendingOrders = await Order.countDocuments({
            orderStatus: "Pending",
        });

        const deliveredOrders = await Order.countDocuments({
            orderStatus: "Delivered",
        });

        const cancelledOrders = await Order.countDocuments({
            orderStatus: "Cancelled",
        });

        // Revenue
        const revenue = await Order.aggregate([
            {
                $match: {
                    paymentStatus: "Paid",
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: "$finalAmount",
                    },
                },
            },
        ]);

        const totalRevenue =
            revenue.length > 0 ? revenue[0].totalRevenue : 0;

        // Today's Orders
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayOrders = await Order.countDocuments({
            createdAt: {
                $gte: today,
            },
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalUsers,
                totalProducts,
                totalCategories,
                totalOrders,
                totalRevenue,
                todayOrders,
                pendingOrders,
                deliveredOrders,
                cancelledOrders,
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
// Recent Orders
// ======================================

export const getRecentOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: orders.length,
            orders,
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
                $lte: 10,
            },
        }).sort({
            stock: 1,
        });

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
// Top Selling Products
// ======================================

export const getTopProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({
                sold: -1,
            })
            .limit(10);

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
// Get All Users
// ======================================

export const getAllUsers = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {};

        if (search) {
            query.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query)
            .select("-password")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(totalUsers / limit),
            totalUsers,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Get User Details
// ======================================

export const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ======================================
// Block User
// ======================================

export const blockUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isBlocked = true;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User blocked successfully",
            user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Unblock User
// ======================================

export const unblockUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        user.isBlocked = false;

        await user.save();

        res.status(200).json({
            success: true,
            message: "User unblocked successfully",
            user,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ======================================
// Delete User
// ======================================

export const deleteUser = async (req, res) => {
    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.deleteOne();

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getAllReviews = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {};

        if (search) {
            query.$or = [
                { comment: { $regex: search, $options: "i" } },
            ];
        }

        const totalReviews = await Review.countDocuments(query);

        const reviews = await Review.find(query)
            .populate("user", "name email")
            .populate("product", "name images")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            reviews,
            page,
            pages: Math.ceil(totalReviews / limit),
            totalReviews,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const getReviewDetails = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id)
            .populate("user", "name email")
            .populate("product", "name images");

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        res.status(200).json({
            success: true,
            review,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const deleteReviewByAdmin = async (req, res) => {

    try {

        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        const productId = review.product;

        await review.deleteOne();

        const reviews = await Review.find({
            product: productId,
        });

        const numReviews = reviews.length;

        const rating =
            numReviews > 0
                ? reviews.reduce((sum, item) => sum + item.rating, 0) / numReviews
                : 0;

        await Product.findByIdAndUpdate(productId, {
            rating,
            numReviews,
        });

        res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};