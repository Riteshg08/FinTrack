const express = require('express');

const profileRouter = express.Router();

const User = require('../models/user.js');
const {authUser} = require('../middlewares/authUser.js');
const bcrypt = require('bcrypt');


profileRouter.get('/profile', authUser, async (req, res) => {
    try {
        const user = req.user;

        res.status(200).json({
            message: "User Profile",
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                createdAt: user.createdAt
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});


profileRouter.patch('/profile/update', authUser, async (req, res) => {
    try {

        const allowedFields = [
            "firstName",
            "lastName",
            "email"
        ];

        const updates = Object.keys(req.body);

        const isValidOperation = updates.every((field) => {
            return allowedFields.includes(field);
        });

        if (!isValidOperation) {
            return res.status(400).json({
                message: "Invalid Updates"
            });
        }

        const user = req.user;

        updates.forEach((field) => {
            user[field] = req.body[field];
        });

        await user.save();

        res.status(200).json({
            message: "Profile Updated Successfully",
            data: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});



profileRouter.patch('/profile/password', authUser, async (req, res) => {
    try {

        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                message: "Both passwords are required"
            });
        }

        const user = req.user;

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Incorrect Old Password"
            });
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        user.password = passwordHash;

        await user.save();

        res.status(200).json({
            message: "Password Updated Successfully"
        });

    }
    catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

module.exports = {profileRouter};