const express = require('express');
const router = express.Router();


const { registerUser, loginUser } = require('../controller/userController');
const { registrationValidation } = require('../validation/userValidation');
const { validateRequest } = require('../middleware');

router.post('/registration', [registrationValidation, validateRequest], registerUser);
router.post('/login', loginUser)

module.exports = router;
