const jwt = require('jsonwebtoken')
const ck = require('./constkeys.js')

exports.createToken = (uid) => {
    return jwt.sign({ user: uid }, ck.secretKey, { expiresIn: '1h' })
}

exports.verifyToken = (token) => {
    return jwt.verify(token, ck.secretKey)
}