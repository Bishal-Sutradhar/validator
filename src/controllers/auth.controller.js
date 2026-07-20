const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async (req, res) => {

    const { username, email, password } = req.body
    const hashedPassword = bcrypt.hash(
        password,
        10
    )
    
    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    })

    res.status(201).json({
        message: "User registered successfully!"
    })

}

module.exports = { register }
