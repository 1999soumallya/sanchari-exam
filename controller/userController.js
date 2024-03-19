const { encryptPassword, comparePassword, generateToken } = require("../helper/userHelper")
const couponModel = require("../models/couponModel")
const userModel = require("../models/userModel")
const moment = require("moment-timezone")

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

exports.updateCoupon = async (req, res) => {
    try {
        const { userDetails } = req
        const { code } = req.params

        const coupon = await couponModel.findOne({ _id: code, isActive: true })

        if (!coupon) {
            res.status(401).json({ message: 'Invalid code', success: false })
        }

        const user = await userModel.findById(userDetails._id)

        if (!user) {
            res.status(401).json({ message: 'Invalid user', success: false })
        }

        if (user.couponCode === coupon._id) {
            res.status(401).json({ message: 'User already has this coupon', success: false })
        }

        user.couponCode = coupon._id
        user.couponUpdate = moment().utc().format()

        user.save().then(() => {
            res.status(200).json({ message: 'Coupon successfully updated', success: true })
        }).catch(err => {
            res.status(500).json({ message: 'Coupon update process failed', success: false, error: err.stack })
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const { userDetails } = req

        const user = await userModel.findById(userDetails._id)

        if (!user) {
            res.status(401).json({ message: 'Invalid user', success: false })
        }

        let couponUpdated = moment.duration(moment().utc().diff(user.couponUpdate)).asMinutes()

        if (couponUpdated > 1440) {
            couponUpdated = Math.round(couponUpdated) / 24
        } else if (couponUpdated > 60 && couponUpdated < 1440) {
            couponUpdated = Math.round(couponUpdated) / 60
        }

        res.status(200).json({ message: 'User details successfully retrieved', success: true, user: user, updateAt: Math.round(couponUpdated) })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}