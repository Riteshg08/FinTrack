const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        budgetAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            enum: ["INR", "USD", "EUR"],
            default: "INR",
        },
        month: {
            type: Number,
            required: true,
            default: new Date().getMonth() + 1
        },
        year: {
            type: Number,
            required: true,
            default: new Date().getFullYear()
        }
    },
    {
        timestamps: true,
    }
);

budgetSchema.index(
    {
        userId: 1
    },
    {
        unique: true
    }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;