const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 7777;
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const { authRouter } = require('./routes/auth');
const { expenseRouter } = require('./routes/expense');
const { budgetRouter } = require('./routes/budget');
const {incomeRouter} = require('./routes/income');
const { dashboardRouter } = require('./routes/dashboard');
const { profileRouter } = require('./routes/profile');
const cors = require('cors');

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter);
app.use('/', expenseRouter);
app.use('/', budgetRouter);
app.use('/', incomeRouter);
app.use('/',dashboardRouter);
app.use('/',profileRouter);


connectDB()
    .then(() => {
        console.log("Database is connected successfully!");
        app.listen(PORT, () => {
            console.log("Server is created successfully!");
        });
    })
    .catch((err) => {
        console.error("Error in connecting to database", err);
    });
