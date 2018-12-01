import React, { Component } from 'react'
import { Row, Col, Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './PublishComment.css'

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

    render() {
        const { comment } = this.state
        const { userName } = this.props.currentUser

        return (
            <Form>
                <div>
                    <h3 styleName='main'>发表评论</h3>
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
                        <Col xs={{ span: 6, offset: 12 }} md={{ span: 5, offset: 14 }} lg={{ span: 3, offset: 18 }}>
                            {!userName ?
                                <Form.Item>
                                    <Button type="primary" ghost>登录</Button>
                                </Form.Item>
                                : null
                            }                            
                        </Col>
                        <Col xs={{ span: 6 }} md={{ span: 5 }} lg={{ span: 3 }}>
                            <Form.Item>                                
                                <Button type="primary" 
                                    htmlType="submit"
                                    disabled={this.hasErrors()} >发表</Button>                                
                            </Form.Item> 
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

// function mapDispatchToProps(dispatch) {
//     return {
//         publishArticle: (article) => dispatch(requestPublishArticle(article)),
//         clearPublishStatus: () => dispatch(clearArticlePublishStatus()),
//         selectMenu: (menu) => dispatch(selectMenu(menu))
//     }
// }

export default connect(mapStateToProps, null)(CSSModules(PublishComment, styles))