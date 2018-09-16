import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input, Select, Tooltip, Icon, Checkbox, Button, Row, Col } from 'antd'
import * as API from '../../api'
import Captcha from './Captcha'

const FormItem = Form.Item
const Option = Select.Option

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

export class RegisterForm extends Component {    
    state = {
        confirmDirty: false,
        captcha: ''
    }    

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(values)
                return
            }
            API.register({
                email: values.email,
                userName: values.nickname,
                password: values.password,
                chineseName: values.name,
                mobilePhone: `${values.prefix}-${values.phone}`
            }).then(res => {
                if(res.data.code === 'success') {
                    this.props.history.push('/registerresult/success')
                } else if(res.data.code === 'error') {
                    this.props.history.push('/registerresult/error')
                }
                console.log(res.data.message)
            }).catch(err => {
                console.log(err)
            })            
        })
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form
        if(value && value !== form.getFieldValue('password')) {
            callback('输入的密码不一致!')
        } else {
            callback()
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }

    checkDuplicateName = (e) => {
        const value = e.target.value
        API.checkDuplicateName(value)        
            .then(res => {
                if(res.data.duplicate) {
                   this.props.form.setFields({
                       nickname: {
                           value: value,
                           errors: [new Error('用户名已存在!')]
                       }
                   })
                } 
            }).catch(err => {
                console.log(err)
            }) 
    }

    validateCaptcha = (rule, value, callback) => {
        if(value.toLowerCase() !== this.state.captcha.toLowerCase()) {
            callback('验证码不匹配!')
        } else {
            callback()
        }
    }

    handleCaptcha = (value) => {
        this.setState({ captcha: value })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        }
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              }
            }
        }
        const { getFieldDecorator, getFieldsError } = this.props.form
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
              <Option value="86">+86</Option>
              <Option value="87">+87</Option>
            </Select>
        )               

        return (            
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} 
                    label="电子邮箱" 
                    hasFeedback >
                    {getFieldDecorator('email', {
                        rules: [{type: 'email', message: '无效的电子邮箱格式!'}, {required: true, message: '请输入你的电子邮箱!'}]
                    })(
                        <Input />  
                    )}                    
                </FormItem>
                <FormItem {...formItemLayout} label='密码' hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: '请输入密码!'}, {validator: this.validateToNextPassword}]
                    })(
                        <Input type='password' />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='确认密码' hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [{required: true, message: '请确认密码!'}, {validator: this.compareToFirstPassword}]
                    })(
                        <Input type='password' onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} hasFeedback
                    label={(<span>昵称&nbsp;
                                <Tooltip title='你想别人怎么称呼你?'>
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>)}>
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }]
                    })(
                        <Input onBlur={this.checkDuplicateName} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='姓名' hasFeedback>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='手机号码'>
                    {getFieldDecorator('phone')(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='验证码'>
                    <Row gutter={8}>
                        <Col span={7}>
                            {getFieldDecorator('captcha', {
                                rules: [{ required: true, message: '请输入验证码!' }, {validator: this.validateCaptcha}],
                            })(
                                <Input />
                            )}
                        </Col>                                  
                        <Col span={17}>
                            <Captcha notifyCaptcha={this.handleCaptcha} />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我已经阅读过协议</Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>注册</Button>
                </FormItem>
            </Form>
        )
    }
}

export default withRouter(Form.create()(RegisterForm))