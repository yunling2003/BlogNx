import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './MyBlogHeader.css'
import logo from '../../../assets/images/logo.png'

class MyBlogHeader extends Component {
    handleClick = (e) => {
        switch(e.key) {
            case '.$logout':
                this.props.history.push('/login')
                break            
            default:
                return
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Row>
                        <Col xs={5} sm={11} md={15} offset={1}>
                            <img src={logo} width='45px' height='45px' alt='logo'/>
                        </Col>                        
                        <Col xs={18} sm={12} md={8}>
                            <Menu mode="horizontal" onClick={this.handleClick}
                            style={{ lineHeight: '64px', color: '#1890ff', border: '1px' }}>                                                            
                                <Menu.Item key="welcome" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    <Icon type="user" />ling
                                </Menu.Item>
                                <Menu.Item key="logout" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    <Icon type="logout" />注销
                                </Menu.Item>
                            </Menu>
                        </Col>                        
                    </Row>
                </div>  
                <div styleName='layout'></div>              
            </div>
        )
    }
}

export default withRouter(CSSModules(MyBlogHeader, styles))