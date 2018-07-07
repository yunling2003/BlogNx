import React from 'react'
import { Link } from 'react-router-dom'
import Article from '../../src/components/Article.js'
import { shallow } from 'enzyme'

const setup = () => {
    const props = {
        id: 1,
        title: 'Test title',
        content: '<p>Test article content</p>'
    }
    const wrapper = shallow(<Article  {...props} />)
    return {
        props,
        wrapper
    }    
}

describe('Article', () => {
    const { props, wrapper } = setup()

    it('Article should render', () => {       
        expect(wrapper.find('Link').exists()).toBeTruthy()
        expect(wrapper.find('Link').prop('to')).toBe('/article/1')
        expect(wrapper.contains('Test title')).toBeTruthy()
        expect(wrapper.contains('Test article content')).toBeTruthy()
    })
})