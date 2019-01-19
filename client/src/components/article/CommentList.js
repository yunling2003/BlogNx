import React, { Component } from 'react'
import { connect } from 'react-redux'
import Comment from './Comment'
import { getCommentsCount, loadComments, clearComments } from '../../actions/article'
import { Button } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './CommentList.css'

export class CommentList extends Component {        
    pageSize = 10    

    componentDidMount() {              
        this.props.emptyComments(this.props.articleId)
        this.props.retrieveCommentsCount(this.props.articleId)
        this.props.retrieveComments(this.props.articleId, 0, this.pageSize)
    }

    loadMoreComments = (e) => {        
        this.props.retrieveComments(this.props.articleId, this.props.commentPage + 1, this.pageSize)
    }

    displayLoadMoreButton() {
        const totalCommentsCount = this.props.commentsCount || 0
        const currentCommentsCount = (this.props.comments || []).length
        return totalCommentsCount > currentCommentsCount
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
                {this.displayLoadMoreButton() ?
                    <div styleName='loadMore'>
                        <Button type="primary" ghost onClick={this.loadMoreComments}>更多评论</Button>
                    </div>                                        
                    : null
                }
            </div>
        )
    }
}

const getArticle = (articles, selectedId) => {
    return articles.items.find(a => a._id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    commentsCount: getArticle(state.articles, ownProps.articleId).commentsCount,
    comments: getArticle(state.articles, ownProps.articleId).comments,
    commentPage: getArticle(state.articles, ownProps.articleId).commentPage || 0
})

const mapDispatchToProps = (dispatch) => ({ 
    emptyComments: (articleId) => dispatch(clearComments(articleId)),
    retrieveCommentsCount: (articleId) => dispatch(getCommentsCount(articleId)),   
    retrieveComments: (articleId, page, pageSize) => dispatch(loadComments(articleId, page, pageSize))            
})

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(CommentList, styles))