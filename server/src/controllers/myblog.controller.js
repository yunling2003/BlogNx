const User = require('../models/user.model.js')
const Article = require('../models/article.model.js')
const tokenHelper = require('../tokenHelper.js')
const signHelper = require('../signHelper.js')

exports.validateCredential = (uid, sign) => {
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

exports.refreshToken = (uid) => {
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

exports.findAllArticles = (req, res) => {
    const uid = req.query.uid
    Article.find({ author: uid }).then(articles => {        
        res.send({             
            articles
        })
    }).catch(err => {
        console.error(err)
        res.status(500).send({
            message: err.message || 'Error occurs when retrieving articles'
        })
    })
    
}