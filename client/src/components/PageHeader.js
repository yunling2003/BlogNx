import React, { Component } from 'react'
import { Menu, Icon, Row, Col } from 'antd'
import throttle from 'lodash.throttle'
import CSSModules from 'react-css-modules'
import styles from './PageHeader.css'

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

    render() {
        if (this.state.viewportWidth <= this.mobileBreakPoint) {
            return (
                <div>
                    <div styleName='layout'>
                        <Row>
                            <Col span={6} offset={2}>
                                <h1 styleName='head'>Header</h1>
                            </Col>
                            <Col span={14}></Col>
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
                    <Col span={4} offset={2}>
                        <h1 styleName='head'>Header</h1>
                    </Col>
                    <Col span={14}>
                        <Menu theme="light" 
                            mode="horizontal" 
                            defaultSelectedKeys={['home']} 
                            style={{ marginTop: '8px' }}>
                            <Menu.Item key="home" style={{ padding: '0 10px' }}><Icon type="home" />首页</Menu.Item>
                            <Menu.Item key="recommend" style={{ padding: '0 10px' }}><Icon type="star-o" />推荐</Menu.Item>
                            <Menu.Item key="latest" style={{ padding: '0 10px' }}><Icon type="exclamation-circle-o" />最新</Menu.Item>
                            <Menu.Item key="news" style={{ padding: '0 10px' }}><Icon type="book" />新闻</Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}></Col>
                </Row>
            </div>
        )
    }
}

export default CSSModules(PageHeader, styles)