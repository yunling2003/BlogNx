const User = require('../models/user.model.js')
const svgCaptcha = require('svg-captcha')

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
            message: `user ${user.userName} saved`
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