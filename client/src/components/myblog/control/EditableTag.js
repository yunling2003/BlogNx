import React, { Component } from 'react'
import { Tag, Input, Tooltip, Icon } from 'antd'

class EditableTag extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tags: this.props.tags,
            inputVisible: false,
            inputValue: ''
        }
    }

    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag != removedTag)        
        this.setState({ tags })
        this.props.tagsChanged(tags)
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const state = this.state
        const inputValue = state.inputValue
        let tags = state.tags
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue]
        }
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        })
        this.props.tagsChanged(tags)
    }

    saveInputRef = input => this.input = input

    render() {
        const { tags, inputVisible, inputValue } = this.state
        return (
            <div>
                {tags.map((tag, index) => {
                    const isLongTag = tag.length > 10
                    const tagElem = (
                        <Tag key={tag} color="#108ee9" closable={true} afterClose={() => this.handleClose(tag)}>
                            {isLongTag ? `${tag.slice(0, 10)}...` : tag}                   
                        </Tag>
                    )
                    return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem
                })}
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag
                        onClick={this.showInput}
                        style={{ background: '#fff', borderStyle: 'dashed', borderColor: '#2db7f5' }}
                    >
                        <Icon type="plus" />新标签
                    </Tag>
                )}
            </div>
        )
    }
}

export default EditableTag