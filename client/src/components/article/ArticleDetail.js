import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './ArticleDetail.css'
import CommentList from './CommentList'
import PublishComment from './PublishComment'
import { getArticleById } from '../../actions/article'
import Share from './Share'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Tag, Tooltip, BackTop } from 'antd'

export class ArticleDetail extends Component {
    static asyncData(store, params) {        
        return store.dispatch(getArticleById(params.id))
    }

    componentDidMount() {
        this.props.retrieveArticleById(this.props.computedMatch.params.id)
    }

    render() {
        const { article } = this.props
        if(article) {
            return (            
                <div>                
                    <div styleName='main'>
                        <BackTop />
                        <Row>
                            <Col span={24}>
                                <div styleName='title'>
                                    {article.title}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div styleName='subTitle'>
                                    <div styleName='subItem'>{dayjs(article.publishDate).locale('zh-cn').format('YYYY-MMM-DD')}</div>
                                    <div styleName='subItem'>{article.author}</div>                                             
                                    {article.tags.map((tag, index) => {
                                        const isLongTag = tag.length > 10
                                        const tagElem = (
                                            <Tag key={tag} color="#108ee9" style={{fontSize: '9px', borderRadius: '5px'}} closable={false}>
                                                {isLongTag ? `${tag.slice(0, 10)}...` : tag}                   
                                            </Tag>
                                        )
                                        return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
                                    })}
                                </div>
                            </Col>
                        </Row>                  
                        <Row>
                            <Col span={24}>
                                <div styleName='content' dangerouslySetInnerHTML={{__html: article.content}}>                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Share content={{
                                    title: 'blognx.com',
                                    desc: article.title,
                                    url: location.href
                                }}></Share>
                            </Col>
                        </Row>
                    </div>
                    <div styleName='comments'>
                        <PublishComment articleId={article._id} />
                    </div>
                    <div styleName='comments'>
                        <CommentList articleId={article._id} />
                    </div>                    
                </div> 
            )
        }
        return (<div></div>)                                
    }
}

ArticleDetail.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string,        
        title: PropTypes.string,
        publishDate: PropTypes.string,
        author: PropTypes.string,
        content: PropTypes.string,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string,
                article: PropTypes.string,
                reviewer: PropTypes.string,
                content: PropTypes.string,
                commentDate: PropTypes.string
            })
        )
    })        
}

const getSelectedArticle = (articles, selectedId) => {
    return articles.items.find(a => a._id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    article: getSelectedArticle(state.articles, ownProps.computedMatch.params.id)
})

function mapDispatchToProps(dispatch) {
    return {
        retrieveArticleById: (articleId) => dispatch(getArticleById(articleId))        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CSSModules(ArticleDetail, styles))