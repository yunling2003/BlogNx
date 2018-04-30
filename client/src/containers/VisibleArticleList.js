import { connect } from 'react-redux'
import { selectArticle } from '../actions'
import ArticleList from '../components/ArticleList'

const getVisibleArticles = (articles, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
        default:
            return articles
    }
}

const mapStateToProps = state => ({
    articles: getVisibleArticles(state.articles, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
    selectArticle: id => dispatch(selectArticle(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList)