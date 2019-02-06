const weixin = require('../processor/weixin.share.js')

exports.getShareObj = async (req, res) => {
    const url = req.query.url
    var ticket = await weixin.getJsapiTicket()
    var shareObj = weixin.createSignature(ticket, url)
    res.send({ share: shareObj })
}