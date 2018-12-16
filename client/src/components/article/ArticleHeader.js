import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu, Popover, Icon, Row, Col } from 'antd'
import { signOut } from '../../actions/auth'
import throttle from 'lodash.throttle'
import CSSModules from 'react-css-modules'
import styles from './ArticleHeader.css'
import logo from '../../../assets/images/logo.png'

class ArticleHeader extends Component {    
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

    handleAuthClick = (e) => {
        switch(e.key) {
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

    handleMenuClick = (e) => {
        switch(e.key) {
            case '.$home':
                this.props.history.push('/')
                break
            default:
                return
        }
    }

    handleUserAreaClick = (e) => {
        switch(e.key) {
            case '.$myblog':
                this.props.history.push('/myblog/article/list')
                break
            case '.$logout':
                this.props.signOut()
                this.props.history.push('/login')
                break
            default:
                return
        }
    }

    render() {
        const { currentUser } = this.props

        const userArea = (
            <Menu theme="light" mode="vertical" onClick={this.handleUserAreaClick}>
                <Menu.Item style={{ backgroundColor: '#e6f7ff', margin: '0' }} key="myblog">
                    <Icon type="file" />我的博客
                </Menu.Item>
                <Menu.Item style={{ backgroundColor: '#bae7ff', margin: '0' }} key="logout">
                    <Icon type="logout" />注销
                </Menu.Item>                
            </Menu>
        )

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
                                {currentUser.userName ? 
                                    <Popover placement="bottomRight" content={userArea}>
                                        <Icon type="user" style={{ color: '#fff' }} />
                                        <span style={{ color: '#fff' }}>{ currentUser.userName }</span>
                                    </Popover>
                                    :  <Menu mode="horizontal" onClick={this.handleAuthClick}
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
                                }                                
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
                                <Menu theme="light" 
                                    mode="vertical"
                                    onClick={this.handleMenuClick}
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
                            onClick={this.handleMenuClick}
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
                        {currentUser.userName ?
                            <Popover placement="bottomRight" content={userArea}>
                                <Icon type="user" style={{ color: '#fff' }} />
                                <span style={{ color: '#fff' }}>{ currentUser.userName }</span>
                            </Popover> 
                            :   <Menu mode="horizontal" onClick={this.handleAuthClick}
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
                        }                        
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(CSSModules(ArticleHeader, styles)))