const voucher_codes = require('voucher-code-generator');
const couponModel = require('../models/couponModel');

exports.createCoupon = async (req, res) => {
    try {
        const voucher = await voucher_codes.generate({
            length: 6,
            count: 1,
        })

        console.log(voucher)

        const coupon = await couponModel.findOne({ code: voucher[0] })

        if (coupon) {
            res.status(401).json({ message: 'Invalid code', success: false })
        }

        couponModel.create({ code: voucher[0] }).then((details) => {
            res.status(200).json({ message: 'Coupon successfully created', success: true, coupon: details })
        }).catch(err => {
            res.status(400).json({ message: 'Coupon creation process failed', success: false, error: err.stack })
        })

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}

exports.getAllVoucher = async (req, res) => {
    try {
        couponModel.find({}).then(coupons => {
            res.status(200).json({ message: 'Voucher successfully retrieved', success: true, coupons })
        }).catch(err => {
            res.status(400).json({ message: 'Voucher retrieval process failed', success: false, error: err.stack })
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}

exports.deleteVoucher = async (req, res) => {
    try {
        const { code } = req.params

        couponModel.findByIdAndDelete(code).then(() => {
            res.status(200).json({ message: 'Voucher successfully deleted', success: true })
        }).catch(err => {
            res.status(400).json({ message: 'Voucher deletion process failed', success: false, error: err.stack })
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}

exports.toggleVoucher = async (req, res) => {
    try {
        const { code } = req.params

        const coupon = await couponModel.findById(code)

        if (!coupon) {
            res.status(401).json({ message: 'Invalid code', success: false })
        }

        couponModel.findByIdAndUpdate(code, { isActive: !coupon.isActive }).then(() => {
            res.status(200).json({ message: 'Voucher successfully toggled', success: true })
        }).catch(err => {
            res.status(400).json({ message: 'Voucher toggle process failed', success: false, error: err.stack })
        })
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false, error: error.stack })
    }
}