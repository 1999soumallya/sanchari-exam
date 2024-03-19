const bcryptjs = require('bcryptjs');

exports.encryptPassword = async (password) => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt)
}

exports.comparePassword = async (password, hash) => {
    return await bcryptjs.compare(password, hash)
}

const JsonWebToken = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');
const TOKEN_SECRET = "iugiwugvwivbsfgweuifgweiuvbaligwaeuikgvwsdkvbdvsvbisuegfgiweuubcdsvvsuif"

exports.generateToken = (data) => {
    return new Promise((resolve, reject) => {
        tokenModel.create({ token: JsonWebToken.sign({ data }, TOKEN_SECRET), user: data }).then((result) => {
            resolve(result.token)
        }).catch((err) => {
            reject(err)
        });
    })
}

exports.decodeToken = (token) => {
    return JsonWebToken.decode(token)
}

exports.verifyToken = (token) => {
    return JsonWebToken.verify(token, TOKEN_SECRET)
}