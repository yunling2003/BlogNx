module.exports = (app) => {
    const articles = require('../controllers/article.controller.js')
    const auth = require('./auth.middleware.js')
    
    app.get('/articles', articles.findAll)  
    app.get('/article/comments/count', articles.getCommentsCount)
    app.get('/article/comments/load', articles.loadComments)          
    app.post('/article/comment/add', auth.authenticate, articles.createComment)
}