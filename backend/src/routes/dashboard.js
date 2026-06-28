const express = require('express');

const Income = require('../models/income.js');
const Expense = require('../models/expense.js');
const Budget = require('../models/budget.js');
const { authUser } = require('../middlewares/authUser.js');


const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', authUser, async (req, res) => {
    try {

        const currentDate = new Date();

        const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        );

        const incomes = await Income.find({
            userId: req.user._id,
            incomeDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        });

        let total_income = 0;
        incomes.forEach((income) => {
            total_income += income.amount;

        });

        const expenses = await Expense.find({
            userId: req.user._id,
            expenseDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        });

        let total_expenses = 0;

        expenses.forEach((expense) => {
            total_expenses += expense.amount;

        });

        const budgets = await Budget.find({
            userId: req.user._id,
            budgetDate: {
                $gte: startOfMonth,
                $lt: startOfNextMonth
            }
        });

        let total_budget = 0;

        budgets.forEach((budget) => {
            total_budget += budget.budgetAmount; 
        });

        const balance = total_income - total_expenses;

        res.status(200).json({
            message: "Dashboard Summary",
            data: {
                totalIncome: total_income,
                totalExpenses: total_expenses,
                totalBudget: total_budget,
                balance,
                budgetRemaining: total_budget - total_expenses,
                budgetExceeded: total_expenses > total_budget
            }
        });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


dashboardRouter.get('/recent-transaction',authUser,async(req,res)=>{
    try{
         const expenses = await Expense.find({
            userId: req.user._id
         })
         .sort({createdAt:-1})
         .limit(5);

         res.status(200).json({message:"Last 5 transactions",
            data:expenses
         });
    }
    catch(err){
        res.status(400).send({message: err.message});
    }
});


module.exports = {
    dashboardRouter
}