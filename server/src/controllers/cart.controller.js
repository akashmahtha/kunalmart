import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// ===============================
// Add To Cart
// ===============================

// ===============================
// Add To Cart
// ===============================

export const addToCart = async (req, res) => {

    try {

        const { productId, quantity } = req.body;

        // Validation
        if (!productId || !quantity) {

            return res.status(400).json({
                success: false,
                message: "Product ID and Quantity are required",
            });

        }

        if (Number(quantity) <= 0) {

            return res.status(400).json({
                success: false,
                message: "Quantity must be greater than zero",
            });

        }

        // Find Product
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }

        // Stock Check
        if (product.stock < Number(quantity)) {

            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} item(s) available in stock`,
            });

        }

        // Find User Cart
        let cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {

            cart = new Cart({
                user: req.user._id,
                items: [],
                totalPrice: 0,
            });

        }

        // Existing Item Check
        const existingItem = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (existingItem) {

            const newQuantity =
                existingItem.quantity + Number(quantity);

            if (newQuantity > product.stock) {

                return res.status(400).json({
                    success: false,
                    message: `Maximum available stock is ${product.stock}`,
                });

            }

            existingItem.quantity = newQuantity;

        } else {

            cart.items.push({
                product: product._id,
                quantity: Number(quantity),
                price: product.discountPrice || product.price,
            });

        }

        // Calculate Total Price
        cart.totalPrice = cart.items.reduce((total, item) => {

            return total + item.price * item.quantity;

        }, 0);

        await cart.save();

        // Populate Products
        await cart.populate("items.product");

        return res.status(200).json({

            success: true,
            message: "Product added to cart successfully",

            cart,

        });

    } catch (error) {

        console.error("Add To Cart Error:", error);

        return res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ===============================
// Get User Cart
// ===============================

// ===============================
// Get User Cart
// ===============================

export const getCart = async (req, res) => {

    try {

        let cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.product");

        // If cart doesn't exist
        if (!cart) {

            return res.status(200).json({
                success: true,
                cart: {
                    items: [],
                    totalPrice: 0,
                },
            });

        }

        // ===============================
        // Remove deleted/null products
        // ===============================

        cart.items = cart.items.filter(
            (item) => item.product
        );

        // ===============================
        // Recalculate total price
        // ===============================

        cart.totalPrice = cart.items.reduce((total, item) => {

            const product = item.product;

            const price =
                product.discountPrice > 0
                    ? product.discountPrice
                    : product.price;

            return total + price * item.quantity;

        }, 0);

        // Save updated cart
        await cart.save();

        // Populate again after save
        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            cart,
        });

    } catch (error) {

        console.error("Get Cart Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// ===============================
// Update Cart Quantity
// ===============================

export const updateCart = async (req, res) => {
    try {

        const { quantity } = req.body;
        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Product not found in cart",
            });
        }

        // ============================
        // STOCK CHECK
        // ============================

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (Number(quantity) > product.stock) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.stock} item(s) available in stock`,
            });
        }

        item.quantity = Number(quantity);

        if (item.quantity <= 0) {
            cart.items = cart.items.filter(
                (item) => item.product.toString() !== productId
            );
        }

        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        await cart.save();

        await cart.populate("items.product");

        res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ===============================
// Remove Product From Cart
// ===============================

export const removeCartItem = async (req, res) => {
    try {

        const { productId } = req.params;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Product removed successfully",
            cart,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ===============================
// Clear Cart
// ===============================

export const clearCart = async (req, res) => {
    try {

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Cart cleared successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};