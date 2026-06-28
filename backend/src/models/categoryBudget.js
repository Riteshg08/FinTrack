const mongoose = require('mongoose');

const categoryBudgetSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category_budget: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            enum: ["INR", "USD", "EUR"],
            default: "INR",
        },
        category: {
            type: String,
            enum: [
                "Food",
                "Transport",
                "Entertainment",
                "Utilities",
                "Education",
                "Housing",
                "Travel",
                "Shopping",
                "Health",
                "Other",
            ],
            default: "Other",
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

const categoryBudget = mongoose.model("categoryBudget", categoryBudgetSchema);

module.exports = categoryBudget;
