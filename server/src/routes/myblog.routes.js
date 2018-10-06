module.exports = (app) => {
    const myBlog = require('../controllers/myblog.controller.js')

    function authenticate(req, res, next) {
        const uid = req.query.uid || ''
        const sign = req.query.sign || ''
        myBlog.validateCredential(uid, sign).then(valid => {
            if(valid) {
                myBlog.refreshToken(uid).then(token => {
                    res.header('AuthToken', token)
                    next()
                })
            } else {
                res.status(401).send({
                    code: 'error',
                    message: 'Authentication failed'
                })
            }
        }).catch(err => {
            res.status(401).send({
                code: 'error',
                message: err
            })
        })        
    }    

    app.get('/myblog/articles', authenticate, myBlog.findAllArticles)
    app.post('/myblog/article/publish', authenticate, myBlog.publishArticle)
    app.post('/myblog/article/edit', authenticate, myBlog.editArticle)
    app.post('/myblog/article/delete', authenticate, myBlog.deleteArticle)
    app.post('/myblog/article/uploadImage', myBlog.uploadImage)
}