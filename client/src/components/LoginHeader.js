import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './LoginHeader.css'
import logo from '../../assets/images/logo.png'

class LoginHeader extends Component {
    handleClick = (e) => {
        if(e.key === '.$home') {
            this.props.history.push('/')
        }
    }
    
    render() {        
        return (
            <div>
                <div styleName='layout'>
                    <Row>
                        <Col span={7} offset={1}>
                            <img src={logo} width='45px' height='45px' alt='logo'/>
                        </Col>
                        <Col span={4}></Col>
                        <Col span={12}>
                            <Menu mode="horizontal" onClick={this.handleClick}
                            style={{ lineHeight: '64px', backgroundColor: '#1890ff', color: '#fff', border: '1px' }}>
                                <Menu.Item key="home" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    <Icon type="home" />首页
                                </Menu.Item>                                
                                <Menu.Item key="register" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    <Icon type="play-circle-o" />注册
                                </Menu.Item>
                                <Menu.Item key="login" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    <Icon type="login" />登录
                                </Menu.Item>
                            </Menu>
                        </Col>                        
                    </Row>
                </div>                
            </div>
        )
    }            
}

export default withRouter(CSSModules(LoginHeader, styles))