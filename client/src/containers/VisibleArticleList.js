import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchArticlesIfNeeded, setArticleFilters, invalidateArticles } from '../actions'
import Article from '../components/Article'
import { Row, Col, Pagination } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './VisibleArticleList.css'

class VisibleArticleList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.dispatch(fetchArticlesIfNeeded())
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.articles !== this.props.articles) {
            nextProps.dispatch(fetchArticlesIfNeeded())
        }
    }

    onChange = (pageNumber) => {
        this.props.dispatch(setArticleFilters({page: pageNumber - 1}))
        this.props.dispatch(invalidateArticles())
        this.props.dispatch(fetchArticlesIfNeeded())
    }

    render() {
        const { articles, filters } = this.props
        return (
            <div styleName='list'>
                <Row>
                    <Col span={24}> 
                        <ul>
                            {articles.items.map(article =>
                                <Article
                                    key={article.id}
                                    {...article}/>
                            )}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign:'right'}}>
                        <div styleName='pager'>
                            <Pagination size='small' defaultCurrent={1}
                                current={filters.page + 1}
                                pageSize={7} 
                                onChange={this.onChange}
                                total={articles.totalCount} 
                                showTotal={total => `共${total}条`}/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
    
}

VisibleArticleList.propTypes = {
    filters: PropTypes.shape({
        page: PropTypes.number.isRequired
    }).isRequired,  
    articles: PropTypes.shape({ 
        totalCount: PropTypes.number.isRequired,       
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                selected: PropTypes.bool.isRequired,
                title: PropTypes.string.isRequired,
                content: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }).isRequired    
}

function mapStateToProps(state) {
    return {
        filters: state.articleFilters,
        articles: state.articles
    }
}

export default connect(
    mapStateToProps    
)(CSSModules(VisibleArticleList, styles))