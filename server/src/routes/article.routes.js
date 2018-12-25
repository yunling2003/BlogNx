const express = require('express')
const router = express.Router()
const articles = require('../controllers/article.controller.js')
const auth = require('./auth.middleware.js')

router.get('/', articles.findAll)
router.get('/comments/count', articles.getCommentsCount)
router.get('/comments/load', articles.loadComments)          
router.post('/comment/add', auth.authenticate, articles.createComment)

module.exports = router