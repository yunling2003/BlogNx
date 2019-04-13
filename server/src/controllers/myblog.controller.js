const Article = require('../models/article.model.js')
const User = require('../models/user.model.js')
const multer = require('multer')
const path = require('path')
const configKeys = require('../constkeys.js')

exports.findAllArticles = (req, res) => {
    const uid = req.query.uid
    const sortCol = 'publishDate'
    const sortSeq = -1    
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    Article.find({ author: uid }, 'title tags author content publishDate')
            .sort(sortObj)
            .then(articles => {        
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
        tags: articleObj.tags,
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

exports.editArticle = (req, res) => {
    const articleObj = req.body.article
    Article.findById({ _id: articleObj.id }).then(article => {
        if(article) {
            article.title = articleObj.title
            article.tags = articleObj.tags
            article.content = articleObj.content
            article.save().then(result => {
                res.send({
                    status: 'success'
                })
            }).catch(err => {
                console.error(err)
                res.status(500).send({
                    status: 'fail',
                    message: err.message || 'Error occurs when edit article'
                })
            })
        } else {
            res.status(500).send({
                status: 'fail',
                message: 'Article does not exists'
            })
        }    
    })    
}

exports.deleteArticle = (req, res) => {
    const id = req.body.id
    Article.findById(id).then(article => {
        article.remove().then(result => {
            res.send({
                status: 'success'
            })
        })        
    }).catch(err => {
        res.status(500).send({
            status: 'fail',
            message: err.message || 'Error occurs when delete article'
        })
    })
}

exports.getProfile = (req, res) => {
    const user = req.query.uid
    User.findOne({ userName: user }).then(user => {
        res.send({ user })
    }).catch(err => {
        res.status(500).send({
            status: 'fail',
            message: err.message || 'Error occurs when get profile'
        })
    })
}

exports.saveProfile = (req, res) => {
    const profileObj = req.body.profile
    User.findOne({ userName: profileObj.user }).then(user => {
        if(user) {
            user.email = profileObj.email
            user.chineseName = profileObj.chineseName
            user.mobilePhone = profileObj.mobilePhone
            user.save().then(result => {
                res.send({
                    status: 'success'
                })
            }).catch(err => {
                console.log(err)
                res.status(500).send({
                    status: 'fail',
                    message: err.message || 'Error occurs when save user profile'
                })
            })
        } else {
            res.status(500).send({
                status: 'fail',
                message: 'User does not exists'                
            })
        }
    }).catch(err => {
        res.status(500).send({
            status: 'fail',
            message: err.message || 'Error occurs when save profile'
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
                    link: `${configKeys.url}/image/${imgFile.filename}`
                }                
            })
        }        
    })        
}