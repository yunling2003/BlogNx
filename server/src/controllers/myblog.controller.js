const Article = require('../models/article.model.js')
const multer = require('multer')
const path = require('path')
const configKeys = require('../constkeys.js')

exports.findAllArticles = (req, res) => {
    const uid = req.query.uid
    const sortCol = 'publishDate'
    const sortSeq = -1    
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    Article.find({ author: uid }, 'title author content publishDate')
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