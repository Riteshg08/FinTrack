const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    source: {
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

    recurring: {
        type: Boolean,
        default: false,
    },

    incomeDate: {
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

incomeSchema.index({
    userId: 1,
    incomeDate: -1
});

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;