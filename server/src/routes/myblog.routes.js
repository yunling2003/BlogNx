const express = require('express')
const router = express.Router()
const myBlog = require('../controllers/myblog.controller.js')
const auth = require('./auth.middleware.js')

router.get('/articles', auth.authenticate, myBlog.findAllArticles)
router.post('/article/publish', auth.authenticate, myBlog.publishArticle)
router.post('/article/edit', auth.authenticate, myBlog.editArticle)
router.post('/article/delete', auth.authenticate, myBlog.deleteArticle)
router.post('/article/uploadImage', myBlog.uploadImage)

module.exports = router