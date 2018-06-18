import React  from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import Article from './Article'
import CSSModules from 'react-css-modules'
import styles from './ArticleList.css'

const ArticleList = ({ articles }) => (
    <div>
        <Row>
            <Col span={24}> 
                <ul styleName='list'>
                    {articles.map(article =>
                        <Article
                            key={article.id}
                            {...article}/>
                    )}
                </ul>
            </Col>
        </Row>
    </div>    
)

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            selected: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired
        }).isRequired
    ).isRequired    
}

export default CSSModules(ArticleList, styles)