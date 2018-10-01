const mongoose = require('mongoose')

const ArticleSchema = mongoose.Schema({    
    title: String,
    author: String,
    publishDate: Date,
    content: String,
    selected: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', ArticleSchema, 'article')