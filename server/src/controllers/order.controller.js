import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";

// ==========================================
// Place Order
// ==========================================

export const placeOrder = async (req, res) => {
    try {
        const { addressId, paymentMethod } = req.body;

        // Check Address
        const address = await Address.findOne({
            _id: addressId,
            user: req.user._id,
        });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: "Address not found",
            });
        }

        // Get User Cart
        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        let orderItems = [];
        let totalAmount = 0;

        for (const item of cart.items) {

            // Check Product
            const product = await Product.findById(item.product._id);

            if (!product) continue;

            // Stock Check
            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `${product.name} is out of stock`,
                });
            }

            // Reduce Stock
            // product.stock -= item.quantity;

            product.stock -= item.quantity;
            product.sold += item.quantity;
            await product.save();

            orderItems.push({
                product: product._id,
                name: product.name,
                image:
                    product.images.length > 0
                        ? product.images[0].url
                        : "",
                quantity: item.quantity,
                price: item.price,
            });

            totalAmount += item.price * item.quantity;
        }

        // Delivery Charge
        const deliveryCharge = totalAmount >= 500 ? 0 : 40;

        const finalAmount = totalAmount + deliveryCharge;

        // Create Order
        const order = await Order.create({
            user: req.user._id,
            items: orderItems,
            shippingAddress: address._id,
            paymentMethod,
            totalAmount,
            deliveryCharge,
            finalAmount,
        });

        // Clear Cart
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==========================================
// Get My Orders
// ==========================================

export const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("shippingAddress")
            .sort({ createdAt: -1 });

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
// ==========================================
// Get Single Order
// ==========================================

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        })
            .populate("shippingAddress")
            .populate("items.product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Cancel Order
// ==========================================

export const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        if (
            order.orderStatus === "Delivered" ||
            order.orderStatus === "Cancelled"
        ) {
            return res.status(400).json({
                success: false,
                message: `Order already ${order.orderStatus}`,
            });
        }

        // Restore Product Stock
        for (const item of order.items) {
            const product = await Product.findById(item.product);

            if (product) {
                product.stock += item.quantity;
                await product.save();
            }
        }

        order.orderStatus = "Cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// Get All Orders (Admin)
// ==========================================

// ==========================================
// Get All Orders (Admin)
// ==========================================

export const getAllOrders = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        // Fetch all orders first
        let orders = await Order.find()
            .populate("user", "name email")
            .populate("shippingAddress")
            .sort({ createdAt: -1 });

        // Search by customer name, email, payment method or order status
        if (search) {

            const keyword = search.toLowerCase();

            orders = orders.filter((order) => {

                return (
                    order.user?.name
                        ?.toLowerCase()
                        .includes(keyword) ||

                    order.user?.email
                        ?.toLowerCase()
                        .includes(keyword) ||

                    order.orderStatus
                        ?.toLowerCase()
                        .includes(keyword) ||

                    order.paymentMethod
                        ?.toLowerCase()
                        .includes(keyword)
                );

            });

        }

        const totalOrders = orders.length;

        const paginatedOrders = orders.slice(
            skip,
            skip + limit
        );

        res.status(200).json({

            success: true,

            orders: paginatedOrders,

            page,

            pages: Math.ceil(totalOrders / limit),

            totalOrders,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};

// ==========================================
// Update Order Status (Admin)
// ==========================================

export const updateOrderStatus = async (req, res) => {
    try {

        const { id } = req.params;
        const { orderStatus } = req.body;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.orderStatus = orderStatus;

        // If Online Payment
        if (
            order.paymentMethod === "ONLINE" &&
            order.orderStatus === "Delivered"
        ) {
            order.paymentStatus = "Paid";
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};