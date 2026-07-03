const express = require('express');

const incomeRouter = express.Router();
const Income = require('../models/income');
const { authUser } = require('../middlewares/authUser');


incomeRouter.post("/income", authUser, async (req, res) => {
    try {
        const { source, amount, incomeDate, notes, recurring, currency } = req.body;
        if (!source || !amount) {
            return res.status(400).json({
                message: "Source and amount are required"
            });
        }

        const newIncome = new Income({
            source,
            amount,
            incomeDate,
            notes,
            recurring,
            currency,
            userId: req.user._id
        });
        await newIncome.save();
        res.status(201).json({
            message: "Income added successfully",
            data: newIncome
        });

    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

incomeRouter.get('/income', authUser, async (req, res) => {
    try {
        const incomes = await Income.find({
            userId: req.user._id
        }).sort({ createdAt: -1 });
        res.status(200).json({ message: "All income entries", data: incomes });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

incomeRouter.get("/income/total", authUser, async (req, res) => {
    try {
        const incomes = await Income.find({
            userId: req.user._id
        });

        let totalAmount = 0;

        incomes.forEach((income) => {
            totalAmount = totalAmount + income.amount;
        });
        console.log(totalAmount);
        res.status(201).json({ message: "Total Income", data: totalAmount })
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


incomeRouter.get('/income/monthly-summary', authUser, async (req, res) => {
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

        const incomes = await Income.find({
            userId: req.user._id
        });

        const summary = [];

        for (let i = 0; i < 12; i++) {
            let total = 0;
            incomes.forEach((income) => {
                if (income.incomeDate.getMonth() == i && income.incomeDate.getFullYear() == currentYear) {
                    total += income.amount;
                }
            });
            summary.push({
                month: months[i],
                amount: total
            });
        };

        res.status(200).json({
            message: "Monthly incomes summary",
            data: summary
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


incomeRouter.get('/income/:id', authUser, async (req, res) => {
    try {
        const income = await Income.findOne({
            _id: req.params.id,
            userId: req.user._id
        });

        if(!income){
            return res.status(404).json({
                message: "Income not found"
            });
        };

        res.status(200).json({
            message: "Get Income",
            data: income
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

incomeRouter.patch('/income/:id', authUser, async (req, res) => {
    try {
        const allowedFields = [
            "source",
            "amount",
            "incomeDate",
            "currency",
            "notes",
            "recurring"
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

        const updateIncome = await Income.findOneAndUpdate({
            _id: req.params.id,
            userId: req.user._id
        }, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            message: "Income Update",
            data: updateIncome
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


incomeRouter.delete("/income/:id", authUser, async (req, res) => {
    try {
        const incomeId = req.params.id;

        const deletedIncome = await Income.findOneAndDelete({
            _id: incomeId,
            userId: req.user._id
        });

        if (!deletedIncome) {
            return res.status(404).json({
                message: "Income not found"
            });
        }

        res.status(200).json({
            message: "Income deleted successfully"
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


module.exports = {
    incomeRouter
}