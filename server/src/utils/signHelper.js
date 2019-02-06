const md5 = require('crypto-js/md5')
const rand = require('csprng')
const sha1 = require('crypto-js/sha1')
const sha256 = require('crypto-js/sha256')

exports.genMd5Sign = (val) => {
    return md5(val).toString()
}

exports.genSha1Sign = (val) => {
    return sha1(val).toString()
}

exports.genSha256Sign = (val) => {
    return sha256(val).toString()
}

exports.genSalt = () => {
    return rand(160, 36)
}