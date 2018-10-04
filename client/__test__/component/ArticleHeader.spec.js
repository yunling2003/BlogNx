import React from 'react'
import ArticleHeader from '../../src/components/article/ArticleHeader.js'
import ReactRouterEnzymeContext from 'react-router-enzyme-context'
import { mount } from 'enzyme'

const setup = () => {
    const deskState = {
        viewportWidth: 800,
        menuVisible: true
    }
    const mobileState = {
        viewportWidth: 500,
        menuVisible: true
    }
    const options = new ReactRouterEnzymeContext()    
    return {
        deskState,
        mobileState,
        options
    }
}

describe('ArticleHeader', () => {
    let wrapper;
    const { mobileState, deskState, options } = setup()

    beforeEach(() => {
        wrapper = mount(<ArticleHeader />, options.get())
    })

    afterEach(() => {
        wrapper.unmount()
    })
    
    it('ArticleHeader should render as desktop mode', () => {           
        wrapper.find('ArticleHeader').instance().setState(deskState)
        wrapper.update()
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()        
    })

    it('ArticleHeader should render as mobile mode', () => {
        wrapper.find('ArticleHeader').instance().setState(mobileState)
        wrapper.update()
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeTruthy();
    })

    it('Simulate click menu icon', () => {        
        wrapper.find('ArticleHeader').instance().setState(mobileState)
        wrapper.update()        
        expect(wrapper.find('.visible').exists()).toBeTruthy()        
        wrapper.find('Icon').findWhere(x => x.prop('type') === 'bars').simulate('click')
        expect(wrapper.find('.hide').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()
    })
})