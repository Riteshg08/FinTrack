const express = require('express');

const authRouter = express.Router();

const { validateSignUpData } = require('../utils/validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');


authRouter.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(400).send("User already exists!");
        }

        validateSignUpData(req);

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        const savedUser = await newUser.save();
        const token = await savedUser.generateAuthToken();

        res.cookie("token", token, { expires: new Date(Date.now() + 3600000), httpOnly: true });
        res.json({ message: "User is registered successfully!", data: savedUser });
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

authRouter.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send("User does not found!");
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).send("Enter appropriate credentials!");
        }
        else {
            const token = await user.generateAuthToken();
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "None",
                expires: new Date(Date.now() + 3600000),
            });
            res.json({ message: "User signed in successfully!", data: user });
        }
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});


authRouter.post("/logout", async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            expires: new Date(0),
        });
        res.send("User signed out successfully!");
    }
    catch (err) {
        res.status(400).send({ message: err.message });
    }
});

module.exports = { authRouter };

