const express = require('express');

const budgetRouter = express.Router();
const Budget = require('../models/budget.js');
const categoryBudget = require('../models/categoryBudget.js');
const Expense = require('../models/expense.js');
const { authUser } = require('../middlewares/authUser');


budgetRouter.post('/monthly-budget', authUser, async (req, res) => {
    try {
        const { budgetAmount, currency } = req.body;
        const userId = req.user._id;

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        // One budget document per user (unique index on userId)
        const existingBudget = await Budget.findOne({ userId });

        if (existingBudget) {
            existingBudget.budgetAmount = budgetAmount;
            if (currency) existingBudget.currency = currency;
            existingBudget.month = currentMonth;
            existingBudget.year = currentYear;
            await existingBudget.save();
            return res.status(200).json({
                message: "Budget updated successfully!",
                data: existingBudget,
            });
        }

        const newBudget = new Budget({
            budgetAmount,
            currency,
            userId,
            month: currentMonth,
            year: currentYear,
        });
        await newBudget.save();
        res.status(201).send({ message: "Budget set successfully!", data: newBudget });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


budgetRouter.post('/category-budget', authUser, async (req, res) => {
    try {
        const { category, category_budget, currency } = req.body;
        const userId = req.user._id;

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();

        const existingCategoryBudget =
            await categoryBudget.findOne({
                userId,
                category,
                month: currentMonth,
                year: currentYear,
            });

        if (existingCategoryBudget) {
            return res.status(400).json({
                message:
                    "Budget for this category already exists.",
            });
        }

        const monthlyBudget = await Budget.findOne({
            userId,
            month: currentMonth,
            year: currentYear,
        });

        if (!monthlyBudget) {
            return res.status(400).json({
                message: "Please set your monthly budget first.",
            });
        }

        const existingAllocations = await categoryBudget.find({
            userId,
            month: currentMonth,
            year: currentYear,
        });

        const allocatedTotal = existingAllocations.reduce(
            (sum, b) => sum + b.category_budget,
            0
        );

        if (allocatedTotal + category_budget > monthlyBudget.budgetAmount) {
            return res.status(400).json({
                message: "Category budget is exceeding the overall budget",
            });
        }

        const newBudget = new categoryBudget({
            category,
            category_budget,
            currency,
            userId
        });
        await newBudget.save();
        res.status(201).send({ message: "Budget set successfully!", data: newBudget });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});



budgetRouter.get('/budget/category', authUser, async (req, res) => {
    try {
        const category_Budget = await categoryBudget.find({
            userId: req.user._id
        });

        res.status(200).json({
            message: "All budgets",
            data: category_Budget
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

budgetRouter.get('/budget/status', authUser, async (req, res) => {
    try {

        const currentDate = new Date();

        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const budget = await Budget.findOne({
            userId: req.user._id,
            month: {
                $eq: currentMonth + 1
            },
            year: {
                $eq: currentYear
            }
        });

        let totalBudget = budget?.budgetAmount || 0;
        console.log(totalBudget);

        const expenses = await Expense.find({
            userId: req.user._id
        });

        let totalSpent = 0;

        expenses.forEach((expense) => {
            const expenseMonth = expense.expenseDate.getMonth();
            const expenseYear = expense.expenseDate.getFullYear();

            if (expenseMonth === currentMonth && expenseYear === currentYear) {
                totalSpent += expense.amount;
            }
        });

        const remaining = totalBudget - totalSpent;

        const percentageUsed = totalBudget > 0 ? Number(((totalSpent / totalBudget) * 100).toFixed(2)) : 0;

        res.status(200).json({
            message: "Current Month Budget Summary",
            data: {
                totalBudget,
                totalSpent,
                remaining,
                percentageUsed,
                isOverBudget: totalSpent > totalBudget
            }
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

budgetRouter.get('/budget/category-status', authUser, async (req, res) => {
    try {
        const currentDate = new Date();

        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

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

        const allBudget = await categoryBudget.find({
            userId: req.user._id,
            month: {
                $eq: currentMonth + 1
            },
            year: {
                $eq: currentYear
            }
        });

        const expenses = await Expense.find({
            userId: req.user._id
        }).sort({ createdAt: 1 });

        const categorySummary = [];
        categories.forEach((category) => {

            let totalBudget = 0;
            allBudget.forEach((budget) => {
                if (budget.category === category) {
                    totalBudget += budget.category_budget;
                }
            });

            let totalSpent = 0;
            expenses.forEach((exp) => {
                const expenseMonth = exp.expenseDate.getMonth();
                const expenseYear = exp.expenseDate.getFullYear();

                if (exp.category === category && expenseMonth === currentMonth && expenseYear === currentYear) {
                    totalSpent += exp.amount;
                }
            });

            categorySummary.push({
                category,
                budget: totalBudget,
                spent: totalSpent,
                remaining: totalBudget - totalSpent,
                percentageUsed:
                    totalBudget > 0 ? Number(((totalSpent / totalBudget) * 100).toFixed(2)) : 0,
                isOverBudget: totalSpent > totalBudget
            });
        });

        res.status(200).json({
            message: "Category wise budget summary",
            data: categorySummary
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


budgetRouter.patch('/budget', authUser, async (req, res) => {
    try {
        const allowedFields = [
            "budgetAmount",
            "currency"
        ];

        const updates = Object.keys(req.body);

        const isValidOperation = updates.every((field) => {
            return allowedFields.includes(field);
        });

        if (!isValidOperation) {
            return res.status(400).json({
                message: "Invalid Operation"
            });
        };

        const updatePayload = { ...req.body };

        // Keep month/year in sync when amount changes so /budget/status finds it
        if (updatePayload.budgetAmount !== undefined) {
            updatePayload.month = new Date().getMonth() + 1;
            updatePayload.year = new Date().getFullYear();
        }

        const updateBudget = await Budget.findOneAndUpdate({
            userId: req.user._id
        }, updatePayload, {
            new: true,
            runValidators: true
        });

        if (!updateBudget) {
            return res.status(404).json({ message: "No budget found for this user" });
        }

        res.status(200).json({
            message: "Updated Budget",
            data: updateBudget
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


budgetRouter.patch('/budget/category/:id', authUser, async (req, res) => {
    try {

        const allowedFields = [
            "category",
            "category_budget",
            "currency"
        ];

        const budget = await categoryBudget.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        const updates = Object.keys(req.body);

        const isValidOperation = updates.every((field) => {
            return allowedFields.includes(field);
        });

        if (!isValidOperation) {
            return res.status(400).json({
                message: "Invalid Operation"
            });
        };

        const updateBudget = await categoryBudget.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id,
        }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message: "Updated Budget",
            data: updateBudget
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});



budgetRouter.delete('/budget/:id', authUser, async (req, res) => {
    try {

        const deletedBudget = await categoryBudget.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id
        });

        if (!deletedBudget) {
            return res.status(404).json({
                message: "Budget not found"
            });
        }

        res.status(200).json({
            message: "Budget deleted successfully",
            data: deletedBudget
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = {
    budgetRouter
}