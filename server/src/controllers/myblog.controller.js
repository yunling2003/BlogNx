const User = require('../models/user.model.js')
const Article = require('../models/article.model.js')
const tokenHelper = require('../tokenHelper.js')
const signHelper = require('../signHelper.js')
const multer = require('multer')
const path = require('path')
const configKeys = require('../constkeys.js')

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
    const sortCol = 'publishDate'
    const sortSeq = -1    
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    Article.find({ author: uid }).sort(sortObj).then(articles => {        
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

exports.publishArticle = (req, res) => {
    const uid = req.query.uid
    const articleObj = req.body.article

    const article = new Article({
        title: articleObj.title,
        author: uid,
        publishDate: Date.now().toString(),
        content: articleObj.content,
        selected: false
    })

    article.save().then(result => {
        res.send({
            status: 'success'
        })
    }).catch(err => {
        console.error(err)
        res.status(500).send({
            status: 'fail',
            message: err.message || 'Error occurs when pubilsh article'
        })
    })
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {      
      cb(null, path.join(__dirname, "../../resource/image"))
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname.split('.')[0] + Date.now() + '.' + file.originalname.split('.')[1])
    }
  })

const upload = multer({ storage : storage}).single('file')

exports.uploadImage = (req, res) => {
    upload(req, res, function(err) {
        if(err) {
            console.error(err)
            res.status(500).send('upload image failed!')            
        } else {
            let imgFile = req.file                
            res.send({
                data: {
                    link: `http://${configKeys.host}:${configKeys.port}/image/${imgFile.filename}`
                }                
            })
        }        
    })        
}