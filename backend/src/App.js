const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const { authRouter } = require('./routes/auth');
const { expenseRouter } = require('./routes/expense');
const { budgetRouter } = require('./routes/budget');
const {incomeRouter} = require('./routes/income');
const { dashboardRouter } = require('./routes/dashboard');
const { profileRouter } = require('./routes/profile');

app.use(express.json());
app.use(cookieParser());

// app.use('/',(req,res)=>{
//     res.send("Welcome to Expense Tracker API!");
// });

app.use('/', authRouter);
app.use('/', expenseRouter);
app.use('/', budgetRouter);
app.use('/', incomeRouter);
app.use('/',dashboardRouter);
app.use('/',profileRouter);
const port = 7777;

connectDB()
    .then(() => {
        console.log("Database is connected successfully!");
        app.listen(7777, () => {
            console.log("Server is created successfully!");
        });
    })
    .catch((err) => {
        console.error("Error in connecting to database", err);
    });
