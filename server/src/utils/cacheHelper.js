const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 7000, checkperiod: 7100 })

exports.get = function(key) {
    return cache.get(key)
}

exports.set = function(key, value) {
    cache.set(key, value)
}