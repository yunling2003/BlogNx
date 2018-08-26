const User = require('../models/user.model.js')
const ck = require('../constkeys.js')
const svgCaptcha = require('svg-captcha')
const jwt = require('jsonwebtoken')

exports.signIn = (req, res) => {
    const userName = req.body.userName
    const password = req.body.password
    User.findOne({ 'userName': userName, 'password': password }).then(user => {
        if(user) {
            const token = jwt.sign({ user: user.userName }, ck.secretKey, { expiresIn: '1h' })
            res.status(200).send({ 
                code: 'success',
                authToken: token 
            })
        } else {
            res.status(403).send({
                code: 'error',
                message: 'Authenticate failed'
            })
        }
    })
}

exports.checkDuplicate = (req, res) => {
    const userName = req.query.userName
    User.find({ 'userName': userName }).then(user => {
        res.send({duplicate: user.length > 0 ? true : false})
    })
}

exports.register = (req, res) => {        
    new User({
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
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