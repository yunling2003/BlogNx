import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './LoginHeader.css'
import logo from '../../assets/images/logo.png'

class LoginHeader extends Component {
    handleClick = (e) => {
        switch(e.key) {
            case '.$home':
                this.props.history.push('/')
                break
            case '.$login':
                this.props.history.push('/login')
                break
            case '.$register':
                this.props.history.push('/register')
                break
            default:
                return
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
                                <Menu.Item key="register" style={{ padding: '0 5px', borderBottom: '0', 
                                    display: this.props.page === 'register' ? 'none' : 'block' }}>
                                    <Icon type="play-circle-o" />注册
                                </Menu.Item>
                                <Menu.Item key="login" style={{ padding: '0 5px', borderBottom: '0',
                                    display: this.props.page === 'login' ? 'none' : 'block' }}>
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