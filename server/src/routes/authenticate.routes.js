module.exports = (app) => {
    const authentication = require('../controllers/authenticate.controller')

    app.post('/signin', authentication.signIn)
    app.post('/register', authentication.register)
    app.get('/register/checkDuplicate', authentication.checkDuplicate)
    app.get('/recaptcha', authentication.captcha)
}