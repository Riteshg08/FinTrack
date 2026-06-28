const validate = require('validator');


const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !email || !password) {
        throw new Error("All fields are required");
    }
    if (!validate.isEmail(email)) {
        throw new Error("Invalid email format");
    }
    if (!validate.isLength(password, { min: 6 })) {
        throw new Error("Password must be at least 6 characters long");
    }
};

module.exports = {
    validateSignUpData
};