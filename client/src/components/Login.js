import React, {Component}  from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './Login.css'

export class Login extends Component {
    constructor(props) {
        super(props)
    }

    render() {        
        return (
            <div styleName='list'>                                                             
                <Row>
                    <Col span={24}> 
                        <div>Login Form</div>
                    </Col>
                </Row>                
            </div>
        )
    }
}

export default CSSModules(Login, styles)