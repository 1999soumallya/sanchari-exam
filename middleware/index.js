const { validationResult: validate } = require('express-validator')

exports.validateRequest = async (req, res, next) => {
    if (validate(req).isEmpty()) {
        return next()
    }

    return res.status(400).json({
        message: 'Provide all mediatory fields',
        success: false,
        errors: validate.array()
    })
}