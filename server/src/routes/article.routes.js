module.exports = (app) => {
    const articles = require('../controllers/article.controller.js')
    
    app.get('/articles', articles.findAll)  
    app.get('/article/comments/count', articles.getCommentsCount)
    app.get('/article/comments/load', articles.loadComments)          
    app.post('/article/comment/add', articles.createComment)
}