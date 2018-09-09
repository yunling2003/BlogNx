module.exports = (app) => {
    const myBlog = require('../controllers/myblog.controller.js')

    app.all('/myblog/*', (req, res, next) => {
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
    })

    app.get('/myblog/articles', myBlog.findAllArticles)
}