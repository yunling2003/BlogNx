import React from 'react'
import ArticleDetail  from '../../src/components/article/ArticleDetail.js'
import { shallow } from 'enzyme'

const setup = () => {
    const props = {
        article: {
            _id: '1',
            selected: true,
            title: 'Test title',
            author: 'ling',
            content: '<p>This is test article content</p>',
            publishDate: '2018-10-02',
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