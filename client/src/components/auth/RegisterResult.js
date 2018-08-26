import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col } from 'antd'
import CSSModules from 'react-css-modules'
import styles from './RegisterResult.css'
import thankyou from '../../../assets/images/thankyou.png'
import error from '../../../assets/images/error.png'

export class RegisterResult extends Component {

    render() {        
        if(this.props.computedMatch.params.result === 'success') {
            return (
                <div styleName='container'>
                    <Row>
                        <Col xs={2} sm={4} md={6}>
                        </Col>                        
                        <Col xs={10} sm={8} md={6}>
                            <div styleName='left'>
                                <div styleName='imgContainer'>
                                    <img src={thankyou} styleName='imgLeft' alt='thankyou'/>
                                </div>
                            </div>                            
                        </Col>
                        <Col xs={10} sm={8} md={6}>
                            <div styleName='right'>
                                <Card title="注册成功" bordered={false}>
                                    <p>祝贺您已经注册成功！</p>
                                    <p>请点击<Link to={'/login'}>登录</Link>链接登录"我的博客",或者点击<Link to={'/'}>首页</Link>浏览所有博文.</p>
                                </Card>                                
                            </div>                            
                        </Col>
                        <Col xs={2} sm={4} md={6}>
                        </Col>
                    </Row>
                </div>                
              )
        }
        
        return (
            <div styleName='container'>
                <Row>
                    <Col xs={2} sm={4} md={6}>
                    </Col>                        
                    <Col xs={10} sm={8} md={6}>
                        <div styleName='left'>
                            <div styleName='imgContainer'>
                                <img src={error} styleName='imgLeft' alt='error'/>
                            </div>
                        </div>                            
                    </Col>
                    <Col xs={10} sm={8} md={6}>
                        <div styleName='right'>
                            <Card title="注册失败" bordered={false}>
                                <p>非常抱歉您的注册失败！</p>
                                <p>请联系本网站管理员进一步处理, 或者回到<Link to={'/'}>首页</Link>浏览博文.</p>
                            </Card>                                
                        </div>                            
                    </Col>
                    <Col xs={2} sm={4} md={6}>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default CSSModules(RegisterResult, styles)