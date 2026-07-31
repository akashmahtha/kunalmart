import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        // ==========================
        // Basic Details
        // ==========================

        name: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            unique: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        brand: {
            type: String,
            default: "",
            trim: true,
        },

        // ==========================
        // Images
        // ==========================

        images: [
            {
                public_id: {
                    type: String,
                    default: "",
                },
                url: {
                    type: String,
                    default: "",
                },
            },
        ],

        // ==========================
        // Pricing
        // ==========================

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discountPrice: {
            type: Number,
            default: 0,
            min: 0,
        },

        offerPercentage: {
            type: Number,
            default: 0,
        },

        offerLabel: {
            type: String,
            default: "",
        },

        // ==========================
        // Pack Size
        // ==========================

        packSize: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },

        unit: {
            type: String,
            enum: [
                "kg",
                "gm",
                "L",
                "ml",
                "pcs",
                "pack",
                "box",
                "dozen",
                "tray",
                "bottle",
            ],
            default: "pcs",
        },

        // ==========================
        // Inventory
        // ==========================

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0,
        },

        sold: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================
        // Reviews
        // ==========================

        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },

        numReviews: {
            type: Number,
            default: 0,
            min: 0,
        },

        // ==========================
        // Badge
        // ==========================

        badge: {
            type: String,
            enum: [
                "",
                "New",
                "Best Seller",
                "Trending",
                "Limited Stock",
            ],
            default: "",
        },

        // ==========================
        // Homepage Sections
        // ==========================

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

        // ==========================
        // Status
        // ==========================

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// =====================================
// Auto Generate Offer Percentage
// =====================================

productSchema.pre("save", function () {
    const price = Number(this.price || 0);
    const discount = Number(this.discountPrice || 0);

    if (discount > 0 && discount < price) {
        this.offerPercentage = Math.round(
            ((price - discount) / price) * 100
        );

        this.offerLabel = `${this.offerPercentage}% OFF`;
    } else {
        this.offerPercentage = 0;
        this.offerLabel = "";
    }
});

// =====================================
// Auto Update Offer on findOneAndUpdate
// =====================================

productSchema.pre("findOneAndUpdate", function () {
    const update = this.getUpdate();

    if (!update) return;

    const price = Number(update.price ?? 0);
    const discount = Number(update.discountPrice ?? 0);

    if (price > 0 && discount > 0 && discount < price) {
        update.offerPercentage = Math.round(
            ((price - discount) / price) * 100
        );

        update.offerLabel = `${update.offerPercentage}% OFF`;
    } else {
        update.offerPercentage = 0;
        update.offerLabel = "";
    }

    this.setUpdate(update);
});

const Product = mongoose.model("Product", productSchema);

export default Product;