import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createComment } from '../../actions/article'

const { TextArea } = Input

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

export class PublishComment extends Component {
    constructor(props) {
        super(props)
        this.state = {             
            comment: {
                value: ''
            }            
        }
    }

    hasErrors = () => {
        return this.state.comment.validateStatus !== 'success'
    }    

    handleCommentChange = (e) => {
        const value = e.target.value
        this.setState({
            comment: {
                ...validateField(value, '请输入评论!'),
                value
            }
        })
    }

    handlePublishComment = (e) => {
        e.preventDefault()
        this.props.createComment(this.props.articleId, this.props.currentUser.userName, this.state.comment.value)
    }

    goLogin = () => {
        this.props.history.push('/login')
    }

    render() {
        const { comment } = this.state
        const { userName } = this.props.currentUser

        return (
            <Form onSubmit={this.handlePublishComment}>
                <div>
                    <h3>发表评论</h3>
                    <Row>
                        <Col span={24}>
                            <Form.Item
                                validateStatus={comment.validateStatus}
                                help={comment.errorMsg || ''}>
                                <TextArea 
                                    style={{ marginTop: '10px' }}
                                    placeholder="请输入你的评论..." 
                                    autosize={{ minRows: 4, maxRows: 8 }}
                                    onChange={this.handleCommentChange}>
                                </TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 6, offset: 18 }} md={{ span: 5, offset: 19 }} lg={{ span: 3, offset: 21 }}>
                            {!userName ?
                                <Form.Item>
                                    <Button 
                                        type="primary" 
                                        onClick={this.goLogin} 
                                        ghost>
                                        登录
                                    </Button>
                                </Form.Item> :                             
                                <Form.Item>                                
                                    <Button 
                                        type="primary" 
                                        htmlType="submit"
                                        disabled={this.hasErrors()} >
                                        发表
                                    </Button>                                
                                </Form.Item>
                            }                            
                        </Col>                        
                    </Row>
                </div>                
            </Form>
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
        createComment: (articleId, reviewer, content) => dispatch(createComment(articleId, reviewer, content)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PublishComment))