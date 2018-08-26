import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import  'cross-fetch/polyfill'

export class Captcha extends Component {    
    state = {
        data: '',
        text: ''
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/recaptcha')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json.data,
                    text: json.text
                })
                this.props.notifyCaptcha(this.state.text)
            })        
    }

    changeCaptcha = (e) => {
        fetch('http://localhost:3000/recaptcha')
            .then(res => res.json())
            .then(json => {
                this.setState({
                    data: json.data,
                    text: json.text
                })
                this.props.notifyCaptcha(this.state.text)
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