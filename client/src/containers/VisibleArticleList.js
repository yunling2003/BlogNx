import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchArticlesIfNeeded } from '../actions'
import Article from '../components/Article'
import { Row, Col } from 'antd'
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

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}> 
                        <ul styleName='list'>
                            {this.props.articles.items.map(article =>
                                <Article
                                    key={article.id}
                                    {...article}/>
                            )}
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
    
}

VisibleArticleList.propTypes = {
    articles: PropTypes.shape({        
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
        articles: state.articles
    }
}

export default connect(
    mapStateToProps    
)(CSSModules(VisibleArticleList, styles))