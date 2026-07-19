const userModel = require("../models/user.model")

const register = async (req, res) => {

    const { username, email } = req.body

    const user = await userModel.create({
        username,
        email
    })

    res.status(201).json({
        message: "User registered successfully!"
    })

}

module.exports = { register }