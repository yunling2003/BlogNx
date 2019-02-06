const express = require('express')
const router = express.Router()
const weixin = require('../controllers/weixin.controller.js')

router.get('/getShare', weixin.getShareObj)

module.exports = router