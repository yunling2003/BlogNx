import React from 'react'
import ArticleDetail  from '../../src/components/ArticleDetail.js'
import { shallow } from 'enzyme'

const setup = () => {
    const props = {
        article: {
            id: 1,
            selected: true,
            title: 'Test title',
            content: '<p>This is test article content</p>'
        }
    }
    const wrapper = shallow(<ArticleDetail {...props} />)
    return {
        props,
        wrapper
    }
}

describe('ArticleDetail', () => {
    const { wrapper } = setup()

    it('Article detail should render', () => {
        expect(wrapper.find('.title').text()).toBe('Test title')
        expect(wrapper.find('.content').html()).toBe('<div class=\"content\"><p>This is test article content</p></div>')
    })
})