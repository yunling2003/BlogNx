const sha256 = require('crypto-js/sha256')

exports.genSha256Sign = (val) => {
    return sha256(val).toString()
}