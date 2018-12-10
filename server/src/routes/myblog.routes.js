module.exports = (app) => {
    const myBlog = require('../controllers/myblog.controller.js')
    const auth = require('./auth.middleware.js')

    app.get('/myblog/articles', auth.authenticate, myBlog.findAllArticles)
    app.post('/myblog/article/publish', auth.authenticate, myBlog.publishArticle)
    app.post('/myblog/article/edit', auth.authenticate, myBlog.editArticle)
    app.post('/myblog/article/delete', auth.authenticate, myBlog.deleteArticle)
    app.post('/myblog/article/uploadImage', myBlog.uploadImage)
}