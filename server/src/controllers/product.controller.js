import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ==============================
// Upload Image To Cloudinary
// ==============================

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "kunalmart/products",
            },
            (error, result) => {
                if (error) {
                    console.log("Cloudinary Error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        streamifier.createReadStream(buffer).pipe(stream);
    });
};

// ==============================
// Create Product
// ==============================

export const createProduct = async (req, res) => {
    try {

        console.log("Body:", req.body);
        console.log("Files:", req.files);

        const {
            name,
            description,
            category,
            brand,

            price,
            discountPrice,

            packSize,
            unit,

            stock,

            badge,

            isFeatured,
            isTrending,
            isBestSeller,
        } = req.body;

        // ==========================
        // Check Category
        // ==========================

        const categoryExists = await Category.findById(category);

        if (!categoryExists) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // ==========================
        // Upload Images
        // ==========================

        let images = [];

        if (req.files && req.files.length > 0) {

            for (const file of req.files) {

                const uploadedImage = await uploadToCloudinary(file.buffer);

                images.push({
                    public_id: uploadedImage.public_id,
                    url: uploadedImage.secure_url,
                });

            }

        }

        // ==========================
        // Auto Offer Percentage
        // ==========================

        let offerPercentage = 0;
        let offerLabel = "";

        if (
            Number(discountPrice) > 0 &&
            Number(discountPrice) < Number(price)
        ) {

            offerPercentage = Math.round(
                ((price - discountPrice) / price) * 100
            );

            offerLabel = `${offerPercentage}% OFF`;

        }

        // ==========================
        // Create Product
        // ==========================

        const product = await Product.create({

            name,

            slug: name
                .toLowerCase()
                .replace(/\s+/g, "-"),

            description,

            category,

            brand,

            images,

            price,

            discountPrice,

            offerPercentage,

            offerLabel,

            packSize,

            unit,

            stock,

            badge,

            isFeatured,

            isTrending,

            isBestSeller,

        });

        res.status(201).json({

            success: true,

            message: "Product created successfully",

            product,

        });

    } catch (error) {
        console.error("========== CREATE PRODUCT ERROR ==========");
        console.error(error);
        console.error(error.stack);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// Get All Products
// ==============================

// ==============================
// Get All Products (Admin Pagination)
// ==============================

export const getProducts = async (req, res) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const search = req.query.search || "";

        const skip = (page - 1) * limit;

        const query = {};

        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .populate("category", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            products,
            page,
            pages: Math.ceil(totalProducts / limit),
            totalProducts,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ==============================
// Get Single Product
// ==============================

export const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// ==============================
// Update Product
// ==============================

// ==============================
// Update Product
// ==============================

export const updateProduct = async (req, res) => {
    try {

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // ==========================
        // Check Category
        // ==========================

        if (req.body.category) {

            const categoryExists = await Category.findById(req.body.category);

            if (!categoryExists) {
                return res.status(404).json({
                    success: false,
                    message: "Category not found",
                });
            }

        }

        // ==========================
        // Upload New Images
        // ==========================

        if (req.files && req.files.length > 0) {

            // Delete Old Images
            for (const image of product.images) {
                if (image.public_id) {
                    await cloudinary.uploader.destroy(image.public_id);
                }
            }

            let images = [];

            for (const file of req.files) {

                const uploadedImage = await uploadToCloudinary(file.buffer);

                images.push({
                    public_id: uploadedImage.public_id,
                    url: uploadedImage.secure_url,
                });

            }

            req.body.images = images;

        }

        // ==========================
        // Update Slug
        // ==========================

        if (req.body.name) {

            req.body.slug = req.body.name
                .toLowerCase()
                .replace(/\s+/g, "-");

        }

        // ==========================
        // Auto Offer Calculation
        // ==========================

        const price = Number(
            req.body.price ?? product.price
        );

        const discountPrice = Number(
            req.body.discountPrice ?? product.discountPrice
        );

        if (
            discountPrice > 0 &&
            discountPrice < price
        ) {

            req.body.offerPercentage = Math.round(
                ((price - discountPrice) / price) * 100
            );

            req.body.offerLabel =
                `${req.body.offerPercentage}% OFF`;

        } else {

            req.body.offerPercentage = 0;
            req.body.offerLabel = "";

        }

        // ==========================
        // Update Product
        // ==========================

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        ).populate("category", "name");

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product: updatedProduct,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// ==============================
// Delete Product
// ==============================

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Delete Images From Cloudinary
        for (const image of product.images) {
            if (image.public_id) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==============================
// Search + Filter + Pagination
// ==============================

export const searchProducts = async (req, res) => {
    try {
        const {
            keyword,
            category,
            brand,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 10,
        } = req.query;

        let query = {};

        // Search by name
        if (keyword) {
            query.name = {
                $regex: keyword,
                $options: "i",
            };
        }

        // Category Filter
        if (category) {
            query.category = category;
        }

        // Brand Filter
        if (brand) {
            query.brand = brand;
        }

        // Price Filter
        if (minPrice || maxPrice) {
            query.price = {};

            if (minPrice) query.price.$gte = Number(minPrice);

            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOption = {};

        switch (sort) {
            case "priceLow":
                sortOption.price = 1;
                break;

            case "priceHigh":
                sortOption.price = -1;
                break;

            case "latest":
                sortOption.createdAt = -1;
                break;

            case "oldest":
                sortOption.createdAt = 1;
                break;

            case "name":
                sortOption.name = 1;
                break;

            default:
                sortOption.createdAt = -1;
        }

        const total = await Product.countDocuments(query);

        const products = await Product.find(query)
            .populate("category", "name")
            .sort(sortOption)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            currentPage: Number(page),
            totalPages: Math.ceil(total / limit),
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};


// ==============================
// Featured Products
// ==============================

export const featuredProducts = async (req, res) => {

    try {

        const products = await Product.find({
            isFeatured: true,
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==============================
// Trending Products
// ==============================

export const trendingProducts = async (req, res) => {

    try {

        const products = await Product.find({
            isTrending: true,
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==============================
// Best Seller Products
// ==============================

export const bestSellerProducts = async (req, res) => {

    try {

        const products = await Product.find({
            isBestSeller: true,
        }).populate("category", "name");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

// ==============================
// Latest Products
// ==============================

export const latestProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate("category", "name");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// ==============================
// Related Products
// ==============================

export const relatedProducts = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }

        const products = await Product.find({
            category: product.category,
            _id: { $ne: product._id },
        })
            .limit(8)
            .populate("category", "name");

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};


// ==============================
// Get Products By Category
// ==============================

export const getProductsByCategory = async (req, res) => {

    try {

        const { categoryId } = req.params;

        const products = await Product.find({
            category: categoryId,
        })
            .populate("category", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};