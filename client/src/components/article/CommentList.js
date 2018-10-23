import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { getCommentsCount, loadComments } from '../../actions/article'
import CSSModules from 'react-css-modules'
import styles from './CommentList.css'

export class CommentList extends Component {    

    componentDidMount() {                  
        this.props.retrieveCommentsCount(this.props.articleId)
        this.props.retrieveComments(this.props.articleId, 0, 10)
    }

    render() {        
        const comments = this.props.comments || []
        const commentsCount = this.props.commentsCount || 0
        return (
            <div>
                <div><h3>所有评论:(共{commentsCount}条)</h3></div>
                <ul styleName='list'>
                    {comments.map(comment =>
                        <Comment
                            key={comment._id}
                            {...comment}/>
                    )}
                </ul>
            </div>
        )
    }
}

const getArticle = (articles, selectedId) => {
    return articles.items.find(a => a._id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    commentsCount: getArticle(state.articles, ownProps.articleId).commentsCount,
    comments: getArticle(state.articles, ownProps.articleId).comments
})

const mapDispatchToProps = (dispatch) => ({ 
    retrieveCommentsCount: (articleId) => dispatch(getCommentsCount(articleId)),   
    retrieveComments: (articleId, page, pageSize) => dispatch(loadComments(articleId, page, pageSize))            
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(CommentList, styles))