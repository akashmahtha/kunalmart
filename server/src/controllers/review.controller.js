import Review from "../models/Review.js";
import Product from "../models/Product.js";

const updateProductRating = async (productId) => {
    const reviews = await Review.find({ product: productId });

    const numReviews = reviews.length;

    const rating =
        numReviews > 0
            ? reviews.reduce((sum, review) => sum + review.rating, 0) / numReviews
            : 0;

    await Product.findByIdAndUpdate(productId, {
        rating,
        numReviews,
    });
};

// =====================================
// Add Review
// =====================================

export const addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const existingReview = await Review.findOne({
            user: req.user._id,
            product: productId,
        });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: "You have already reviewed this product.",
            });
        }

        const review = await Review.create({
            user: req.user._id,
            product: productId,
            rating,
            comment,
        });

        await updateProductRating(productId);

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =====================================
// Get Product Reviews
// =====================================

export const getProductReviews = async (req, res) => {
    try {

        const reviews = await Review.find({
            product: req.params.productId,
        })
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =====================================
// Update Review
// =====================================

export const updateReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;

        await review.save();

        await updateProductRating(review.product);

        res.status(200).json({
            success: true,
            message: "Review updated successfully",
            review,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// =====================================
// Delete Review
// =====================================

export const deleteReview = async (req, res) => {
    try {

        const review = await Review.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        const productId = review.product;

        await review.deleteOne();

        await updateProductRating(productId);

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