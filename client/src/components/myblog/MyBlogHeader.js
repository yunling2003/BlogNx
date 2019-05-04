import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu, Icon, Row, Col, Avatar } from 'antd'
import { signOut } from '../../actions/auth'
import CSSModules from 'react-css-modules'
import styles from './MyBlogHeader.css'
import logo from '../../../assets/images/logo.png'

class MyBlogHeader extends Component {
    handleClick = (e) => {
        switch(e.key) {
            case '.$logout':
                this.props.signOut()
                this.props.history.push('/login')
                break
            case '.$home':
                this.props.history.push('/') 
                break           
            default:
                return
        }
    }

    render() {
        const { user } = this.props
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
                                <Menu.Item key="home" style={{ padding: '0 10px', borderBottom: '0' }}>
                                    <Icon type="home" />首页
                                </Menu.Item>                                                          
                                <Menu.Item key="welcome" style={{ padding: '0 5px', borderBottom: '0' }}>
                                    {user.profile.portrait != null ?
                                        <Avatar size="small" src={user.profile.portrait} />
                                        : <Avatar size="small">U</Avatar>
                                    } { user.userName }                                  
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

MyBlogHeader.propTypes = {
    user: PropTypes.shape({
        userName: PropTypes.string,
        isLoggingIn: PropTypes.bool.isRequired,        
        token: PropTypes.string
    }).isRequired
}

function mapStateToProps(state) {
    return {
        user: state.currentUser
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
)(withRouter(CSSModules(MyBlogHeader, styles)))