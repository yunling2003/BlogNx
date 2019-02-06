const http = require('../utils/http.js')
const cache = require('../utils/cacheHelper.js')
const crypt = require('../utils/signHelper')
const ck = require('../constkeys.js')

function createNonceStr() {
    return Math.random().toString(36).substr(2, 15)
}
  
function createTimestamp() {
    return parseInt(new Date().getTime() / 1000) + ''
}

function raw(args) {    
    var newArgs = {}
    var argStr = ''
    
    Object.keys(args).sort().forEach(key => {
        newArgs[key.toLowerCase()] = args[key]
    })
    
    Object.keys(newArgs).forEach(k => {
        argStr += '&' + k + '=' + newArgs[k]
    })

    argStr = argStr.substr(1)    
    return argStr
}

async function getAccessToken() {
    var token = cache.get('token')
    if(!token) {
        var tokenRes = await http.get(ck.weixin_tokenurl, {
            params: {
                grant_type: 'client_credential',
                appid: ck.weixin_appid,
                secret: ck.weixin_appsecret
            }
        })
        if(tokenRes.status === 200) {
            token = tokenRes.data.access_token
        }        
        cache.set('token', token)        
    }
    return token
}

exports.getJsapiTicket = async () => {
    var ticket = cache.get('ticket')
    if(!ticket) {
        var token = await getAccessToken();
        var ticketRes = await http.get(ck.weixin_ticketurl, {
            params: {
                type: 'jsapi',
                access_token: token
            }
        })
        if(ticketRes.status === 200) {
            ticket = ticketRes.data.ticket
        }        
        cache.set('ticket', ticket)        
    }
    return ticket
}

exports.createSignature = (jsapi_ticket, url) => {
    var ret = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    }
    var retStr = raw(ret);    
    ret.signature = crypt.genSha1Sign(retStr);
    return ret
}