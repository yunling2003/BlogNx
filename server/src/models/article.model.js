const mongoose = require('mongoose')
const Comment = require('./comment.model.js')
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

ArticleSchema.pre('remove', function(next) {    
    console.log('pre test')
    Comment.remove({ article: this._id }).exec();    
    next();
});

module.exports = mongoose.model('Article', ArticleSchema, 'article')