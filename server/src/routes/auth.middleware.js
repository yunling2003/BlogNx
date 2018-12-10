const User = require('../models/user.model.js')
const signHelper = require('../signHelper.js')
const tokenHelper = require('../tokenHelper.js')

exports.authenticate = (req, res, next) => {
    const uid = req.query.uid || ''
    const sign = req.query.sign || ''
    validateCredential(uid, sign).then(valid => {
        if(valid) {
            refreshToken(uid).then(token => {
                res.header('AuthToken', token)
                next()
            })
        } else {
            res.status(401).send({
                code: 'error',
                message: 'Authentication failed'
            })
        }
    }).catch(err => {
        res.status(401).send({
            code: 'error',
            message: err
        })
    })        
}    

function validateCredential(uid, sign) {
    return new Promise(resolve => {
        User.findOne({ 'userName': uid }).then(user => {
            if(user) {
                if(sign === signHelper.genSha256Sign(uid + user.token)) {
                    if(tokenHelper.verifyToken(user.token).user === uid) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }                    
                } else {
                    resolve(false)
                }
            } else {
                resolve(false)
            }
        }).catch(err => {
            console.error(err)
            resolve(false)
        })
    })
}

function refreshToken(uid) {
    return new Promise((resolve, reject) => {
        User.findOne({ 'userName': uid }).then(user => {
            if(user) {
                const token = tokenHelper.createToken(uid)
                user.token = token
                user.save().then(user => {
                    resolve(token)
                })                
            } else {                
                reject('Authentication failed')
            }
        })
    })
}