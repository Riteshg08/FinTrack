const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.");
            }
        }
    },
}, {
    timestamps: true,
});


userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({userId: user._id}, process.env.JWT_SECRET , {expiresIn: "7d"});
    return token;
}

const User = mongoose.model('User', userSchema);
module.exports = User;