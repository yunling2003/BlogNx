const User = require('../models/user.model.js')
const tokenHelper = require('../utils/tokenHelper.js')
const signHelper = require('../utils/signHelper.js')
const svgCaptcha = require('svg-captcha')

exports.signOut = (req, res) => {
    //todo: sign out logic
}

exports.signIn = (req, res) => {
    const userName = req.body.userName
    const password = req.body.password

    User.findOne({ 'userName': userName })
    .then(user => {
        if(user) {               
            if(user.password !== signHelper.genMd5Sign(password + user.salt)) {
                throw 'User name or password not match'
            }            
            user.token = tokenHelper.createToken(user.userName)
            return user.save()  
        } else {
            throw 'User name or password not match'
        }
    }).then(user => {
        res.send({ 
            code: 'success',
            authToken: user.token,
            profile: {
                portrait: user.portrait
            }
        })
    }).catch(err => {
        res.status(403).send({
            code: 'error',
            message: err || 'Authenticate failed!'
        })
    })
}

exports.checkDuplicate = (req, res) => {
    const userName = req.query.userName

    User.find({ 'userName': userName })
    .then(user => {
        res.send({
            duplicate: user.length > 0 ? true : false
        })
    }).catch(err => {
        res.status(500).send({
            code: 'error',
            message: err || 'Error occurs when check duplicate'
        })
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
    }).save()
    .then(user => {
        res.send({
            code: 'success',
            message: `User ${user.userName} saved`
        })            
    }).catch(err => {
        res.status(500).send({
            code: 'error',
            message: err || 'Error occurs when register'
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