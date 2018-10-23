const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticleSchema = mongoose.Schema({     
    title: String,
    author: String,
    publishDate: Date,
    content: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    selected: Boolean
}, {
    timestamps: true
})

module.exports = mongoose.model('Article', ArticleSchema, 'article')