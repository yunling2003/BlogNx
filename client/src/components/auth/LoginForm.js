import React, {Component}  from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { signIn, clearError } from '../../actions/auth'
import { selectMenu } from '../../actions/myblog'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'

function validateField(value, message) {
    if(value) {
        return {
            validateStatus: 'success',
            errorMsg: null
        }
    }
    return {
        validateStatus: 'error',
        errorMsg: message
    }
}

export class LoginForm extends Component {
    state = {
        userName: {
            value: '',
        },
        password: {
            value: ''
        }
    }

    constructor(props) {
        super(props)
    }

    handleUserNameChange = (e) => {
        const value = e.target.value
        this.setState({
            userName: {
                ...validateField(value, '请输入用户名!'),
                value
            }
        })
    }

    handlePasswordChange = (e) => {
        const value = e.target.value
        this.setState({
            password: {
                ...validateField(value, '请输入密码!'),
                value
            }
        })
    }

    hasErrors = () => {
        return this.state.userName.validateStatus !== 'success' || this.state.password.validateStatus !== 'success'
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn({
            userName: this.state.userName,
            password: this.state.password
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser.userName && nextProps.currentUser.userName !== this.props.currentUser.userName) {
            this.props.selectMenu('article_list')
            this.props.history.push('/myblog/article/list')
        }
    }

    componentWillUnmount() {
        if(this.props.currentUser.logInMessage) {
            this.props.clearError()
        }        
    }

    render() {
        const userName = this.state.userName
        const password = this.state.password
        const { logInMessage } = this.props.currentUser   

        return (
            <div style={{margin: '0 1.5em', padding: '1.5em'}}>                                                             
                <Row>
                    <Col xs={4} sm={6} md={8}>                         
                    </Col>
                    <Col xs={16} sm={12} md={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Item                                 
                                hasFeedback                                
                                validateStatus={userName.validateStatus}
                                help={userName.errorMsg || ''}>
                                <Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,0.25' }} />} 
                                    placeholder='Username'
                                    value={userName.value}
                                    onChange={this.handleUserNameChange} />
                            </Form.Item>
                            <Form.Item                                
                                hasFeedback                                
                                validateStatus={password.validateStatus}
                                help={password.errorMsg || ''}>
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    type="password" 
                                    placeholder="Password"
                                    value={password.value}
                                    onChange={this.handlePasswordChange} />
                            </Form.Item>
                            <Form.Item>
                                <Checkbox>记住密码</Checkbox>
                                <a style={{float: 'right'}} href="">忘记密码</a>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" 
                                    htmlType="submit"
                                    disabled={this.hasErrors()} 
                                    style={{width: '30%'}}>登录</Button>
                                <Link style={{float: 'right'}} to="/register">新注册</Link>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col xs={4} sm={6} md={8}>
                    </Col>
                </Row>
                {logInMessage ? 
                    <Row>
                        <Col xs={4} sm={6} md={8}></Col>
                        <Col xs={16} sm={12} md={8}>
                            <p style={{color: 'red'}}>登录失败!请检查用户名和密码是否正确.</p>
                        </Col>
                        <Col xs={4} sm={6} md={8}></Col>
                    </Row> 
                    : null
                }                
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
        selectMenu: (menu) => dispatch(selectMenu(menu)),
        signIn: (signInObj) => dispatch(signIn(signInObj)),
        clearError: () => dispatch(clearError())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(LoginForm))