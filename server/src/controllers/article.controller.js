const Article = require('../models/article.model.js')
const defaultPageSize = 7

exports.create = (req, res) => {

}

exports.findAll = (req, res) => {
    const pageNum = +req.query.page || 0
    if(pageNum < 0) {
        res.status(404).send({
            message: 'Invalid request'
        })
    }

    const sortCol = req.query.sortCol || 'id'
    const sortSeq = req.query.sortSeq || -1    
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    const pageSize = +req.query.pageSize || defaultPageSize
    const findPromise = Article.find().sort(sortObj).skip(pageNum * pageSize).limit(pageSize)
    const countPromise = Article.count()

    Promise.all([findPromise, countPromise]).then(result => {        
        res.send({ 
            totalCount: result[1], 
            articles: result[0] 
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Error occurs when retrieving articles'
        })
    })
}

exports.findOne = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}