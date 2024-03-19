const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    couponCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupons'
    }
}, { timestamps: true })

module.exports = mongoose.model('users', userSchema);