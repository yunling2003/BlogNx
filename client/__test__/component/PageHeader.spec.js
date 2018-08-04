import React from 'react'
import PageHeader from '../../src/components/PageHeader.js'
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

describe('PageHeader', () => {
    let wrapper;
    const { mobileState, deskState, options } = setup()

    beforeEach(() => {
        wrapper = mount(<PageHeader />, options.get())
    })

    afterEach(() => {
        wrapper.unmount()
    })
    
    it('PageHeader should render as desktop mode', () => {           
        wrapper.find('PageHeader').instance().setState(deskState)
        wrapper.update()
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()        
    })

    it('PageHeader should render as mobile mode', () => {
        wrapper.find('PageHeader').instance().setState(mobileState)
        wrapper.update()
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeTruthy();
    })

    it('Simulate click menu icon', () => {        
        wrapper.find('PageHeader').instance().setState(mobileState)
        wrapper.update()        
        expect(wrapper.find('.visible').exists()).toBeTruthy()        
        wrapper.find('Icon').findWhere(x => x.prop('type') === 'bars').simulate('click')
        expect(wrapper.find('.hide').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()
    })
})