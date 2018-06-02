import { connect } from 'react-redux'
import ArticleDetail from '../components/ArticleDetail'


const getSelectedArticle = (articles, selectedId) => {
    return articles.find(a => a.id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    article: getSelectedArticle(state.articles, parseInt(ownProps.match.params.id))
})

export default connect(
    mapStateToProps
)(ArticleDetail)