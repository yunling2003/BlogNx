import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import { requestFetchArticles } from '../../actions/myblog'
import Article from './Article'
import CSSModules from 'react-css-modules'
import styles from './ArticleList.css'

export class ArticleList extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getArticles()
    }    

    render() {
        const { articles } = this.props
        return (
            <div styleName='list'>
                <Row>
                    <Col span={23} offset={1}>
                        <p>共{articles.totalCount}条</p>
                    </Col>
                </Row>                                                     
                <Row>
                    <Col span={24}> 
                        <ul>
                            {articles.items.map(article =>
                                <Article
                                    key={article.id}
                                    {...article} />
                            )}
                        </ul>
                    </Col>
                </Row>                
            </div>
        )
    }
}

ArticleList.propTypes = {
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
        articles: state.myArticles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: () => dispatch(requestFetchArticles())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CSSModules(ArticleList, styles))