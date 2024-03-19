const express = require('express');
const router = express.Router();

const { createCoupon, getAllVoucher, deleteVoucher, toggleVoucher } = require('../controller/couponController');
const { commonValidation } = require('../validation/couponValidation');
const { validateRequest } = require('../middleware');


router.post('/generate-coupon', createCoupon)
router.get('/get-all-coupons', getAllVoucher)
router.delete('/delete-coupons/:code', [commonValidation, validateRequest], deleteVoucher)
router.patch('/toggle-coupons/:code', [commonValidation, validateRequest], toggleVoucher)

module.exports = router;
