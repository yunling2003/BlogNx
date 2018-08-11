const svgCaptcha = require('svg-captcha')

exports.captcha = (req, res) => {
    const captcha = svgCaptcha.create({width: 90, height: 35})    
    
    res.type('svg')
    res.status(200).send({
        data: captcha.data,
        text: captcha.text
    })
}