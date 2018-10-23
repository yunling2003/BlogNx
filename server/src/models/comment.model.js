const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema({
    article: { type: Schema.Types.ObjectId, ref: 'Article' },
    reviewer: String,
    content: String,
    commentDate: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', CommentSchema, 'comment')