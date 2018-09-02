import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './ArticleList.css'

export class ArticleList extends Component {
    render() {
        return (
            <div styleName='list'>                                                          
                <Row>
                    <Col span={24}> 
                        <p>My Article List</p>
                    </Col>
                </Row>                
            </div>
        )
    }
}

export default CSSModules(ArticleList, styles)