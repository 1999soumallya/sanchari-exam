const { body, param } = require("express-validator");
const userModel = require("../models/userModel");

exports.registrationValidation = [
    body('name').notEmpty({ ignore_whitespace: true }).withMessage('Provide your name for create your account'),
    body('email').notEmpty({ ignore_whitespace: true }).withMessage('Provide your email id for create your account').isEmail().withMessage('Provide valid email id for create your account').custom(value => {
        return userModel.findOne({ email: value }).then(result => {
            if (result) {
                return Promise.reject("Email Id already exists provide valid username");
            }
            return Promise.resolve(true);
        });
    }),
    body('password').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for create your account').isLength({ min: 8 }).withMessage('Provide valid password for create your account').custom((value, { req }) => {
        if (value != req.body.confirmPassword) {
            return Promise.reject("Password must be same as confirm password");
        } else {
            return Promise.resolve(true);
        }
    }),
    body('confirmPassword').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for create your account').isLength({ min: 8 }).withMessage('Provide valid password for create your account').custom((value, { req }) => {
        if (value != req.body.password) {
            return Promise.reject("Confirm password must be same as password");
        } else {
            return Promise.resolve(true);
        }
    }),
]

exports.loginValidation = [
    body('email').notEmpty({ ignore_whitespace: true }).withMessage('Provide your email id for login'),
    body('password').notEmpty({ ignore_whitespace: true }).withMessage('Provide your password for login').isLength({ min: 8 }).withMessage('Provide valid password for login'),
]

exports.updateCouponCode = [
    param('code').notEmpty({ ignore_whitespace: true }).withMessage('Provide valid coupon id').isMongoId().withMessage('Provide valid coupon code id'),
]