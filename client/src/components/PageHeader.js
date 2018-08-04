import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Row, Col } from 'antd'
import throttle from 'lodash.throttle'
import CSSModules from 'react-css-modules'
import styles from './PageHeader.css'
import logo from '../../assets/images/logo.png'

class PageHeader extends Component {    
    mobileBreakPoint = 576
    applyViewportChangeInterval = 250
    state = {
        viewportWidth: 0,
        menuVisible: true
    }  

    componentDidMount() {
        this.saveViewportDimensions()
        window.addEventListener('resize', this.saveViewportDimensions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.saveViewportDimensions)
    }

    saveViewportDimensions = throttle(() => {
        this.setState({
          viewportWidth: window.innerWidth,
        })
      }, this.applyViewportChange)

    handleMenuVisibility = (visible) => {
        this.setState({            
            menuVisible: visible
        })
    }    

    handleClick = (e) => {
        if(e.key === '.$login') {
            this.props.history.push('/login')
        }
    }

    render() {
        if (this.state.viewportWidth <= this.mobileBreakPoint) {
            return (
                <div>
                    <div styleName='layout'>
                        <Row>
                            <Col span={7} offset={1}>
                                <img src={logo} width='45px' height='45px' alt='logo'/>
                            </Col>
                            <Col span={8}></Col>
                            <Col span={6}>
                                <Menu mode="horizontal" onClick={this.handleClick}
                                style={{ lineHeight: '64px', backgroundColor: '#1890ff', color: '#fff', border: '1px' }}>
                                    <Menu.Item key="login" style={{ padding: '0 5px', borderBottom: '0' }}>
                                        登录
                                    </Menu.Item>
                                    <Menu.Item key="seperator" style={{ padding: '0', borderBottom: '0' }}>
                                        |
                                    </Menu.Item>
                                    <Menu.Item key="register" style={{ padding: '0 5px', borderBottom: '0' }}>
                                        注册
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={2}>
                                <Icon style={{ fontSize: '25px', cursor: 'pointer', color: 'white', verticalAlign: 'middle' }} 
                                    onClick={() => this.handleMenuVisibility(!this.state.menuVisible)}
                                    type="bars" />
                            </Col>
                        </Row>
                    </div>
                    <div styleName={this.state.menuVisible ? 'visible' : 'hide'}>
                        <Row>
                            <Col span={24}>
                                <Menu theme="light" mode="vertical"
                                     defaultSelectedKeys={['home']}>
                                    <Menu.Item style={{ backgroundColor: '#e6f7ff', margin: '0' }} key="home">
                                        <Icon type="home" />首页
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: '#bae7ff', margin: '0' }} key="recommend">
                                        <Icon type="star-o" />推荐
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: '#e6f7ff', margin: '0' }} key="latest">
                                        <Icon type="exclamation-circle-o" />最新
                                    </Menu.Item>
                                    <Menu.Item style={{ backgroundColor: '#bae7ff', margin: '0' }} key="news">
                                        <Icon type="book" />新闻
                                    </Menu.Item>
                                </Menu>
                            </Col>
                        </Row>
                    </div>
                </div>
            )
        }

        return (
            <div styleName='layout'>
                <Row>
                    <Col span={5} offset={1}>
                        <img src={logo} width='45px' height='45px' alt='logo'/>
                    </Col>
                    <Col span={14}>
                        <Menu mode="horizontal" 
                            defaultSelectedKeys={['home']} 
                            style={{ lineHeight: '64px', backgroundColor: '#1890ff', color: '#fff', border: '1px' }}>
                            <Menu.Item key="home" style={{ padding: '0 10px', borderBottom: '0' }}>
                                <Icon type="home" />首页
                            </Menu.Item>
                            <Menu.Item key="recommend" style={{ padding: '0 10px', borderBottom: '0' }}>
                                <Icon type="star-o" />推荐
                            </Menu.Item>
                            <Menu.Item key="latest" style={{ padding: '0 10px', borderBottom: '0' }}>
                                <Icon type="exclamation-circle-o" />最新
                            </Menu.Item>
                            <Menu.Item key="news" style={{ padding: '0 10px', borderBottom: '0' }}>
                                <Icon type="book" />新闻
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <Menu mode="horizontal" onClick={this.handleClick}
                            style={{ lineHeight: '64px', backgroundColor: '#1890ff', color: '#fff', border: '1px' }}>
                            <Menu.Item key="login" style={{ padding: '0 5px', borderBottom: '0' }}>
                                登录
                            </Menu.Item>
                            <Menu.Item key="seperator" style={{ padding: '0', borderBottom: '0' }}>
                                |
                            </Menu.Item>
                            <Menu.Item key="register" style={{ padding: '0 5px', borderBottom: '0' }}>
                                注册
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(CSSModules(PageHeader, styles))