const Article = require('../models/article.model.js')
const pageSize = 7

exports.create = (req, res) => {

}

exports.findAll = (req, res) => {
    let pageNum = +req.query.page || 0
    pageNum = pageNum < 0 ? 0 : pageNum
    const sortCol = req.query.sortCol || 'id'
    const sortSeq = req.query.sortSeq || -1
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    Article.find().sort(sortObj).skip(pageNum * pageSize).limit(pageSize).then(articles => {
        res.send(articles)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occurs when retrieving articles"
        })
    })
}

exports.findOne = (req, res) => {

}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}