import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import http from '../../utils/http'

export class Captcha extends Component {    
    state = {
        data: '',
        text: ''
    }
    
    componentDidMount() {
        http.get('/recaptcha')            
            .then(res => {
                this.setState({
                    data: res.data.data,
                    text: res.data.text
                })
                this.props.notifyCaptcha(this.state.text)
            }).catch(err => {
                console.log(err)
            })       
    }

    changeCaptcha = (e) => {
        http.get('/recaptcha')            
            .then(res => {
                this.setState({
                    data: res.data.data,
                    text: res.data.text
                })
                this.props.notifyCaptcha(this.state.text)
            }).catch(err => {
                console.log(err)
            })       
    }

    render() {
        return (
            <div>
                <span dangerouslySetInnerHTML={{__html: this.state.data}}>
                </span><Button shape="circle" icon="reload" style={{ verticalAlign: '8px' }} size={'small'} onClick={this.changeCaptcha} />                
            </div>
        )        
    }
}

Captcha.propTypes = {
    notifyCaptcha: PropTypes.func.isRequired
}

export default Captcha