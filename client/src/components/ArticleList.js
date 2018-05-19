import React  from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import CSSModules from 'react-css-modules'
import styles from './ArticleList.css'

const ArticleList = ({ articles, selectArticle }) => (    
    <ul styleName='list'>
        {articles.map(article =>
            <Article
                key={article.id}
                {...article}
                onClick={() => selectArticle(article.id)}
            />
        )}
    </ul>    
)

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            selected: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    selectArticle: PropTypes.func.isRequired
}

export default CSSModules(ArticleList, styles)