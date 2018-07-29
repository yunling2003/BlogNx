import React from 'react'
import { shape } from 'prop-types';
import { BrowserRouter } from 'react-router-dom'
import PageHeader from '../../src/components/PageHeader.js'
import { mount } from 'enzyme'

const router = {
    history: new BrowserRouter().history,
    route: {
       location: {},
       match: {}
    }
}
  
const createContext = () => ({
    context: { router },
    childContextTypes: { router: shape({}) }
})

const setup = () => {
    const deskState = {
        viewportWidth: 800,
        menuVisible: true
    }
    const mobileState = {
        viewportWidth: 500,
        menuVisible: true
    }
    const wrapper = mount(<PageHeader />, createContext())
    return {
        deskState,
        mobileState,
        wrapper
    }
}



describe('PageHeader', () => {
    const { mobileState, deskState, wrapper } = setup()

    it('PageHeader should render as desktop mode', () => {
        wrapper.setState(deskState)
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()
    })

    it('PageHeader should render as mobile mode', () => {
        wrapper.setState(mobileState)
        expect(wrapper.find('.layout').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeTruthy()
    })

    it('Simulate click menu icon', () => {
        wrapper.setState(mobileState)
        expect(wrapper.find('.visible').exists()).toBeTruthy()
        wrapper.find('Icon').findWhere(x => x.prop('type') === 'bars').simulate('click')
        expect(wrapper.find('.hide').exists()).toBeTruthy()
        expect(wrapper.find('.visible').exists()).toBeFalsy()
        wrapper.find('Icon').findWhere(x => x.prop('type') === 'bars').simulate('click')
        expect(wrapper.find('.hide').exists()).toBeFalsy()
        expect(wrapper.find('.visible').exists()).toBeTruthy()       
    })
})