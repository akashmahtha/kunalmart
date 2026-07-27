import mongoose from "mongoose";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brand: {
            type: String,
            default: "",
        },

        images: [
            {
                public_id: String,
                url: String,
            },
        ],

        price: {
            type: Number,
            required: true,
        },

        discountPrice: {
            type: Number,
            default: 0,
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
        },
        sold: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },

        numReviews: {
            type: Number,
            default: 0,
        },

        unit: {
            type: String,
            enum: ["kg", "gm", "L", "ml", "pcs"],
            default: "pcs",
        },

        isFeatured: {
            type: Boolean,
            default: false,
        },

        isTrending: {
            type: Boolean,
            default: false,
        },

        isBestSeller: {
            type: Boolean,
            default: false,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;