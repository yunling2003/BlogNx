const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({    
    email: String,
    userName: String,
    password: String,
    salt: String,
    chineseName: String,
    mobilePhone: String
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema, 'user')