const mongoose = require('mongoose');

const connectDB = async () =>{
    try{
        await mongoose.connect(
            "mongodb+srv://riteshg08:expenseTracker@expensecluster.fmlz1co.mongodb.net/Finance_app"
        )
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectDB;