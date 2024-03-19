const express = require('express');
const router = express.Router();


const { registerUser, loginUser, updateCoupon, getUserDetails } = require('../controller/userController');
const { registrationValidation, loginValidation, updateCouponCode } = require('../validation/userValidation');
const { validateRequest, isAuthorized } = require('../middleware');

router.post('/registration', [registrationValidation, validateRequest], registerUser);
router.post('/login', [loginValidation, validateRequest], loginUser)

router.patch('/update-user-coupon-code/:code', isAuthorized, [updateCouponCode, validateRequest], updateCoupon)
router.get('/get-user-details', isAuthorized, getUserDetails)

module.exports = router;
