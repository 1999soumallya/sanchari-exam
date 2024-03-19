const express = require('express');
const router = express.Router();


const { registerUser, loginUser } = require('../controller/userController');
const { registrationValidation, loginValidation } = require('../validation/userValidation');
const { validateRequest } = require('../middleware');

router.post('/registration', [registrationValidation, validateRequest], registerUser);
router.post('/login', [loginValidation, validateRequest], loginUser)

module.exports = router;
