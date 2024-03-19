const { encryptPassword, comparePassword, generateToken } = require("../helper/userHelper")
const userModel = require("../models/userModel")

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        userModel.create({ email, password: await encryptPassword(password), name }).then(() => {
            res.status(200).json({ message: 'User successfully registered', success: true })
        }).catch(err => {
            res.status(500).json({ message: 'User registration process failed', success: false, error: err.stack })
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}

exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(401).json({ message: 'Invalid email or password', success: false })
        }

        const isMatch = await comparePassword(password, user.password)

        if (!isMatch) {
            res.status(401).json({ message: 'Invalid email or password', success: false })
        }

        res.status(200).json({ message: 'User successfully logged in', success: true, token: await generateToken(user._id) })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}