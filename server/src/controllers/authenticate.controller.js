const User = require('../models/user.model.js')
const tokenHelper = require('../utils/tokenHelper.js')
const signHelper = require('../utils/signHelper.js')
const svgCaptcha = require('svg-captcha')

exports.signOut = (req, res) => {

}

exports.signIn = (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    User.findOne({ 'userName': userName }).then(user => {
        if(user) {               
            if(user.password !== signHelper.genMd5Sign(password + user.salt)) {
                res.status(403).send({
                    code: 'error',
                    message: 'Authentication failed'
                })
                return
            }            
            user.token = tokenHelper.createToken(user.userName)
            user.save().then(user => {
                res.status(200).send({ 
                    code: 'success',
                    authToken: user.token 
                })
            })            
        } else {
            res.status(401).send({
                code: 'error',
                message: 'Authenticate failed'
            })
        }
    }).catch(err => {
        res.status(500).send({
            code: 'error',
            message: err
        })
    })
}

exports.checkDuplicate = (req, res) => {
    const userName = req.query.userName
    User.find({ 'userName': userName }).then(user => {
        res.send({duplicate: user.length > 0 ? true : false})
    })
}

exports.register = (req, res) => {
    const sVal = signHelper.genSalt()  
    new User({
        email: req.body.email,
        userName: req.body.userName,
        password: signHelper.genMd5Sign(req.body.password + sVal),
        salt: sVal,
        token: '',
        chineseName: req.body.chineseName,
        mobilePhone: req.body.mobilePhone
    }).save().then(user => {
        res.send({
            code: 'success',
            message: `User ${user.userName} saved`
        })            
    }).catch(err => {
        res.status(500).send({
            code: 'error',
            message: err.message || 'Error occurs when register'
        })
    })    
}

exports.captcha = (req, res) => {
    const captcha = svgCaptcha.create({width: 90, height: 35})    
    
    res.type('svg')
    res.send({
        data: captcha.data,
        text: captcha.text
    })
}