const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },

    amount: {
        type: Number,
        required: true,
        min: 0.01,
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
            "Other"
        ],
        default: "Other",
    },

    paymentMethod: {
        type: String,
        enum: [
            "Cash",
            "Card",
            "UPI",
            "Net Banking",
            "Other"
        ],
        default: "Other",
    },

    expenseDate: {
        type: Date,
        default: Date.now,
    },

    notes: {
        type: String,
        trim: true,
        maxlength: 250,
    }
},
{
    timestamps: true,
}
);

expenseSchema.index({
    userId: 1,
    expenseDate: -1
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;