import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Input, Select, Button, Row, Col, Modal } from 'antd'
import { refreshToken } from '../../actions/auth'
import * as API from '../../api'

class ProfileBaseForm extends Component {
    render(){        
        const { getFieldDecorator } = this.props.form
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
            </Select>
        ) 
    
        return (
            <Form layout="horizontal">
                <Form.Item 
                    label="用户昵称"                
                    {...formItemLayout}
                >
                    {getFieldDecorator('nickname', {
                        rules: [{ required: true, message: '请输入你的昵称!' }],
                    })(
                        <Input disabled={true} />
                    )}
                </Form.Item>
                <Form.Item 
                    label="电子邮箱"
                    hasFeedback
                    {...formItemLayout}                     
                >
                    {getFieldDecorator('email', {
                        rules: [{type: 'email', message: '无效的电子邮箱格式!'}, {required: true, message: '请输入你的电子邮箱!'}]
                    })(
                        <Input />  
                    )}                    
                </Form.Item>
                <Form.Item 
                    label='姓名'
                    hasFeedback
                    {...formItemLayout} 
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的姓名!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item 
                    label='手机号码'
                    {...formItemLayout} 
                >
                    {getFieldDecorator('phone', {
                        rules: [
                            { pattern: /^[0-9]+$/, message: '手机必须由数字组成!' },
                            { required: true, message: '请输入你的手机号码!' }
                        ]
                    })(
                        <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                    )}
                </Form.Item>            
            </Form>
        )
    }    
}

const ProfileForm = Form.create({
    name: 'profile_state',

    onFieldsChange(props, changedFields) {
        props.onChange(changedFields)
    },

    mapPropsToFields(props) {
        return {
            nickname: Form.createFormField({
                ...props.nickname,
                value: props.nickname.value,
            }),
            email: Form.createFormField({
                ...props.email,
                value: props.email.value
            }),
            name: Form.createFormField({
                ...props.name,
                value: props.name.value
            }),
            phone: Form.createFormField({
                ...props.phone,
                value: props.phone.value
            }),
            prefix: Form.createFormField({
                ...props.prefix,
                value: props.prefix.value
            })
        }
    }    
})(ProfileBaseForm)

class Profile extends Component {
    state = {
        fields: {
            nickname: {
                value: '',
            },
            email: {
                value: ''
            },
            name: {
                value: ''
            },
            phone: {
                value: ''
            },
            prefix: {
                value: ''
            }
        },
    }    

    handleFormChange = (changedFields) => {
        this.setState(({ fields }) => ({
            fields: { ...fields, ...changedFields },
        }))
    }

    showSuccess() {
        Modal.success({
          title: '保存成功',
          content: '用户基本信息保存成功!',
        })
      }

    handleSubmit = (e) => {
        e.preventDefault()
        this.formRef.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                //console.log(values)
                return
            }
            
            const profileObj = {
                user: values.nickname,
                email: values.email,
                chineseName: values.name,
                mobilePhone: `${values.prefix}-${values.phone}`
            }
            API.saveProfile(profileObj, {
                uid: this.props.user.userName,
                token: this.props.user.token
            }).then(res => {
                if(res) {
                    this.props.refreshToken(res.headers.authtoken)
                    if(res.data && res.data.status === 'success') {
                        this.showSuccess()
                    }
                }
            }).catch(err => {
                console.log(err)
            })
        })
    }

    componentDidMount(){
        API.getProfile({ 
            uid: this.props.user.userName, 
            token: this.props.user.token 
        }).then(res => {
            if(res) {
                this.props.refreshToken(res.headers.authtoken)
                if(res.data && res.data.user) {
                    const mobile = res.data.user.mobilePhone
                    this.setState({
                        fields: {
                            nickname: {
                                value: res.data.user.userName
                            },
                            email: {
                                value: res.data.user.email
                            },
                            name: {
                                value: res.data.user.chineseName
                            },
                            phone: {
                                value: mobile.indexOf('-') > -1 ? mobile.split('-')[1] : mobile
                            },
                            prefix: {
                                value: mobile.indexOf('-') > -1 ? mobile.split('-')[0] : '86'
                            }
                        }
                    })
                }                
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render(){
        const fields = this.state.fields
        return (
            <div>
                <ProfileForm 
                    {...fields} 
                    onChange={this.handleFormChange} 
                    wrappedComponentRef={(form) => this.formRef = form} 
                />
                <Row>
                    <Col xs={{ span: 24, offset: 0 }} sm={{ span: 16, offset: 8 }}>
                        <Button 
                            type="primary"                             
                            onClick={this.handleSubmit.bind(this)}
                        >保存</Button>
                    </Col>
                </Row>                
            </div>            
        )
    }
}

function mapStateToProps(state) {
    return {    
        user: state.currentUser     
    }
}

function mapDispatchToProps(dispatch) {
    return {
        refreshToken: (token) => dispatch(refreshToken(token))        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)