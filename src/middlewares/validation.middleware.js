const { body, validationResult } = require("express-validator")
const { validate } = require("../models/user.model")

const validateResult = async (req, res, next) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    next()

}

const registerValidationRules = [
    body("username")
        .isString()
        .withMessage("username must be string")
        .isLength({min:3, max:20})
        .withMessage("username length must between 3 and 20 characters"),

    body("email")
        .isEmail()
        .withMessage("invalid email address"),
    
    body("password")
        .isLength({min:6})
        .withMessage("password must be atleast 6 characters long"),

    validateResult
]

module.exports = { registerValidationRules }