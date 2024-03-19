const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    }
}, { timestamps: true })

couponSchema.virtual("users", {
    localField: '_id',
    foreignField: 'couponCode',
    ref: 'users'
})

module.exports = mongoose.model('coupons', couponSchema);