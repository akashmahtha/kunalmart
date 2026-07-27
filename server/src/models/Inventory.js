import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        oldStock: {
            type: Number,
            required: true,
        },

        newStock: {
            type: Number,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        type: {
            type: String,
            enum: ["IN", "OUT"],
            required: true,
        },

        reason: {
            type: String,
            default: "",
        },

        updatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Inventory", inventorySchema);