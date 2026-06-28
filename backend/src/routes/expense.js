const express = require('express');

const expenseRouter = express.Router();
const Expense = require('../models/expense');
const { authUser } = require('../middlewares/authUser');

expenseRouter.post("/add-expense", authUser, async (req, res) => {
    try {
        const { title, amount, expenseDate, category, currency, notes, paymentMethod } = req.body;
        const userId = req.user._id;

        const newExpense = new Expense({
            title,
            amount,
            expenseDate,
            category,
            currency,
            notes,
            paymentMethod,
            userId
        });
        await newExpense.save();
        res.status(201).send({ message: "Expense added successfully!", data: newExpense });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

expenseRouter.patch('/update-expense/:id', authUser, async (req, res) => {
    try {
        const allowedFields = [
            "title",
            "amount",
            "expenseDate",
            "currency",
            "category",
            "notes",
            "paymentMethod"
        ];

        const updates = Object.keys(req.body);

        const isValidOperation = updates.every((field) => {
            return allowedFields.includes(field);
        });

        if (!isValidOperation) {
            return res.status(400).json({
                message: "Invalid Update"
            });
        };

        const updateExpense = await Expense.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message: "Expense Update",
            data: updateExpense
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});




expenseRouter.get('/all-expense', authUser, async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });
        res.status(200).json({ message: "All expenses entries", data: expenses });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


expenseRouter.get('/get-expense/:id', authUser, async (req, res) => {
    try {
        const expense = await Expense.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        };

        res.status(200).json({
            message: "Get Expense",
            data: expense
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

expenseRouter.get("/total-expenses", authUser, async (req, res) => {
    try {
        const expenses = await Expense.find({
            userId: req.user._id
        });

        let totalAmount = 0;

        expenses.forEach((expense) => {
            totalAmount = totalAmount + expense.amount;
        });
        console.log(totalAmount);
        res.status(201).json({ message: "Total Expenses", data: totalAmount })
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


expenseRouter.get('/expense/category-summary', authUser, async (req, res) => {
    try {
        const categories = [
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
        ];

        const expenses = await Expense.find({
            userId: req.user._id
        });

        const summary = [];

        categories.forEach((category) => {
            let total = 0;
            expenses.forEach((exp) => {
                if (exp.category == category) {
                    total += exp.amount
                }
            });

            summary.push({
                category,
                total
            });
        });

        res.status(200).json({
            message: "Category Summary",
            data: summary
        })


    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

expenseRouter.get('/expense', authUser, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const expenses = await Expense.find({
            userId: req.user._id,
            expenseDate: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        res.status(200).json({
            message: "Expenses fetch",
            data: expenses
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


expenseRouter.get('/expense/monthly-summary', authUser, async (req, res) => {
    try {
        const months = ["January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const currentYear = new Date().getFullYear();

        const expenses = await Expense.find({
            userId: req.user._id
        });

        const summary = [];

        for (let i = 0; i < 12; i++) {
            let total = 0;
            expenses.forEach((exp) => {
                if (exp.expenseDate.getMonth() == i && exp.expenseDate.getFullYear() == currentYear) {
                    total += exp.amount;
                }
            });
            summary.push({
                month: months[i],
                amount: total
            });
        };

        res.status(200).json({
            message: "Monthly expenses summary",
            data: summary
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


expenseRouter.delete("/delete-expense/:id", authUser, async (req, res) => {
    try {
        const expenseId = req.params.id;

        await Expense.findOneAndDelete({
            _id: expenseId,
            userId: req.user._id
        });

        res.send("Expense deleted successfully");
    }
    catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
});

module.exports = {
    expenseRouter
}