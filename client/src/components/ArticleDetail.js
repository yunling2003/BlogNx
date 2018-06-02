import React, { Component } from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './ArticleDetail.css'

const ArticleDetail = ({ article }) => (
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
                <div styleName='content' dangerouslySetInnerHTML={{__html: article.content}}>                    
                </div>
            </Col>
        </Row>
    </div>
)

ArticleDetail.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number.isRequired,
        selected: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired
    }).isRequired            
}

export default CSSModules(ArticleDetail, styles)