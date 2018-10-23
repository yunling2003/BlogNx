import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchArticlesIfNeeded, setArticleFilters, invalidateArticles } from '../../actions/article'
import Article from './Article'
import { Row, Col, Pagination, Icon } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './VisibleArticleList.css'

export class VisibleArticleList extends Component {
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

    onChange = (page) => {
        this.props.dispatch(setArticleFilters({page: page - 1}))
        this.props.dispatch(invalidateArticles())
        this.props.dispatch(fetchArticlesIfNeeded())
    }

    onShowSizeChange = (current, size) => {
        this.props.dispatch(setArticleFilters({page: 0, pageSize: size}))
        this.props.dispatch(invalidateArticles())
        this.props.dispatch(fetchArticlesIfNeeded())
    }

    refresh = () => {
        this.props.dispatch(invalidateArticles())
        this.props.dispatch(fetchArticlesIfNeeded())
    }
   
    render() {
        const { articles, filters } = this.props
        return (
            <div styleName='list'>                
                <Row>
                    <Col span={4} offset={20}>
                        <div styleName='action'>
                            <Icon type='reload' style={{ cursor: 'pointer' }} onClick={() => this.refresh()} />
                        </div>
                    </Col>
                </Row>                                
                <Row>
                    <Col span={24}> 
                        <ul>
                            {articles.items.map(article =>
                                <Article
                                    key={article._id}
                                    {...article}/>
                            )}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right'}}>
                        <div styleName='pager'>
                            <Pagination size='small' 
                                showQuickJumper
                                showSizeChanger
                                pageSizeOptions={['5','7','10']}
                                defaultCurrent={1}
                                current={filters.page + 1}
                                pageSize={filters.pageSize} 
                                onChange={this.onChange}
                                onShowSizeChange={this.onShowSizeChange}                            
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
        page: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired
    }).isRequired,  
    articles: PropTypes.shape({ 
        totalCount: PropTypes.number.isRequired,       
        items: PropTypes.arrayOf(
            PropTypes.shape({
                _id: PropTypes.string.isRequired,                
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