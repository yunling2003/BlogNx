const User = require('../models/user.model.js')
const signHelper = require('../utils/signHelper.js')
const tokenHelper = require('../utils/tokenHelper.js')

exports.authenticate = (req, res, next) => {
    const uid = req.query.uid || ''
    const sign = req.query.sign || ''

    validateCredential(uid, sign)
    .then(valid => {
        if(valid) {
            return refreshToken(uid)
        } else {
            throw 'Credential invalid'            
        }
    }).then(token => {
        res.header('AuthToken', token)
        next()
    }).catch(err => {
        res.status(401).send({
            code: 'error',
            message: err || 'Validate failed!'
        })
    })        
}    

function validateCredential(uid, sign) {
    return new Promise(resolve => {
        User.findOne({ 'userName': uid })
        .then(user => {
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
        User.findOne({ 'userName': uid })
        .then(user => {
            if(user) {
                const token = tokenHelper.createToken(uid)
                user.token = token                
                user.save().then(result => {
                    resolve(token)
                })                  
            } else {                
                reject('User not exists')
            }
        }).catch(err => {
            reject(`Refresh token failed! ${err}`)            
        })       
    })
}