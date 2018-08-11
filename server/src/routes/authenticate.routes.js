module.exports = (app) => {
    const authentication = require('../controllers/authenticate.controller')

    app.get('/recaptcha', authentication.captcha)
}