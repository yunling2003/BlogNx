const axios = require('axios')
const ck = require('../constkeys.js')

module.exports = axios.create({
    baseURL: ck.weixin_apiurl,
    timeout: 1000
})