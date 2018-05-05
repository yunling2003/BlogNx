import React  from 'react'
import PropTypes from 'prop-types'
import Article from './Article'

const ArticleList = ({ articles, selectArticle }) => (    
    <ul>
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

export default ArticleList