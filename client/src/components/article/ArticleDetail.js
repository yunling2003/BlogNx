import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './ArticleDetail.css'
import CommentList from './CommentList'
import PublishComment from './PublishComment'
import { getFormatDate } from '../../utils/date'


const ArticleDetail = ({ article }) => (
    <div>
        <div styleName='main'>
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
                        <span styleName='subItem'>{getFormatDate(article.publishDate)}</span><span styleName='subItem'>{article.author}</span>
                    </div>
                </Col>
            </Row>        
            <Row>
                <Col span={24}>
                    <div styleName='content' dangerouslySetInnerHTML={{__html: article.content}}>                    
                    </div>
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

ArticleDetail.propTypes = {
    article: PropTypes.shape({
        _id: PropTypes.string.isRequired,        
        title: PropTypes.string.isRequired,
        publishDate: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        comments: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,
                article: PropTypes.string.isRequired,
                reviewer: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired,
                commentDate: PropTypes.string.isRequired
            })
        )
    }).isRequired            
}

export default CSSModules(ArticleDetail, styles)