const { param } = require("express-validator");

exports.commonValidation = [
    param('code').notEmpty().withMessage('Provide valid coupon id').isMongoId().withMessage('Provide valid coupon code id'),
]