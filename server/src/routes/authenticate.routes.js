const express = require('express')
const router = express.Router()
const authentication = require('../controllers/authenticate.controller')

router.post('/signin', authentication.signIn)
router.post('/register', authentication.register)
router.get('/register/checkDuplicate', authentication.checkDuplicate)
router.get('/recaptcha', authentication.captcha)

module.exports = router