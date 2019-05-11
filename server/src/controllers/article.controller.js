const Article = require('../models/article.model.js')
const Comment = require('../models/comment.model.js')
const defaultPageSize = 7
const defaultCommentsPerPage = 10

exports.findAll = (req, res) => {
    const pageNum = +req.query.page || 0
    if(pageNum < 0) {
        res.status(404).send({
            message: 'Invalid request'
        })
    }

    const sortCol = req.query.sortCol || 'publishDate'
    const sortSeq = req.query.sortSeq || -1    
    const sortObj = JSON.parse("{ \"" + sortCol + "\": " + sortSeq + "}")
    const pageSize = +req.query.pageSize || defaultPageSize
    const findPromise = Article.find({}, 'title tags author content publishDate')                            
                            .sort(sortObj)
                            .skip(pageNum * pageSize)
                            .limit(pageSize)
    const countPromise = Article.count()    

    Promise.all([findPromise, countPromise])
    .then(result => {        
        res.send({ 
            totalCount: result[1], 
            articles: result[0] 
        })
    }).catch(err => {
        res.status(500).send({
            message: err || 'Error occurs when retrieving articles'
        })
    })
}

exports.findArticleById = (req, res) => {
    const articleId = req.query.id

    Article.findOne({ '_id': articleId }, 'title tags author content publishDate')
    .then(article => {
        res.send({
            article
        })
    }).catch(err => {
        res.status(500).send({
            message: err || 'Error occurs when find article'
        })
    })
}

exports.getCommentsCount = (req, res) => {
    const articleId = req.query.id

    Article.findOne({ '_id': articleId })
    .then(result => {
        res.send({
            count: result.comments.length
        })
    }).catch(err => {
        res.status(500).send({
            message: err || 'Error occurs when get comments count'
        })
    })
}

exports.loadComments = (req, res) => {
    const articleId = req.query.id
    const pageNum = +req.query.page || 0    
    const pageSize = +req.query.pageSize || defaultCommentsPerPage
    Article.findOne({ '_id': articleId })
    .populate({
        path: 'comments',
        options: { 
            sort: { commentDate: -1 },
            skip: pageNum * pageSize,
            limit: pageSize 
        }
    }).then(result => {
        res.send({
            comments: result.comments
        })
    }).catch(err => {
        res.status(500).send({
            message: err || 'Error occurs when load comments'
        })
    })
}

exports.createComment = (req, res) => {
    let comment = new Comment({
        article: req.body.articleId,
        reviewer: req.body.reviewer,
        content: req.body.content,
        commentDate: Date.now().toString()
    })
    
    comment.save()
    .then(newComment => {                
        return new Promise(resolve => {
            Article.findOne({'_id': newComment.article})
            .then(article => {
                resolve({
                    article,
                    newComment
                })
            })
        })
    }).then(acObj => {
        acObj.article.comments.push(acObj.newComment._id)
        return acObj.article.save()
    }).then(result => {
        res.send({ 
            status: 'success'
        })
    }).catch(err => {        
        res.status(500).send({
            status: 'fail',
            message: err || 'Error occurs when create comment'
        })
    })    
}