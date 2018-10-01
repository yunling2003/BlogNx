import { connect } from 'react-redux'
import ArticleDetail from './ArticleDetail'


const getSelectedArticle = (articles, selectedId) => {
    return articles.items.find(a => a._id === selectedId)
}

const mapStateToProps = (state, ownProps) => ({
    article: getSelectedArticle(state.articles, ownProps.computedMatch.params.id)
})

export default connect(
    mapStateToProps
)(ArticleDetail)