const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const register = async (req, res) => {

    const { username, email, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if(user) {
        console.log("User already exists!")

        return res.status(409).json({
            message: "User already exists!"
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(
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
    } catch(err) {
        console.error("User registration failed!")

        return res.status(400).json({
            message: "User registration failed!",
            error: err.message
        })
    }

    

}

module.exports = { register }
