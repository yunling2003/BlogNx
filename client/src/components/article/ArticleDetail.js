import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './ArticleDetail.css'
import CommentList from './CommentList'
import PublishComment from './PublishComment'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Tag, Tooltip, BackTop } from 'antd'

const ArticleDetail = ({ article }) => (
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