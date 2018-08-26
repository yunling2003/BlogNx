import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount } from 'enzyme'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import ConnectedArticleList from '../../src/components/article/VisibleArticleList.js'

const setup = () => {        
    const initState = {
        articleFilters: {
            page: 0,
            pageSize: 5
        },
        articles: {
            isFetching: false,
            didInvalidate: true,
            totalCount: 0,
            items: []
        }
    }
    const mockStore = configureStore([thunk])
    const store = mockStore(initState)    
    const cdMountSpy = jest.spyOn(ConnectedArticleList.prototype, 'componentDidMount')           
    const wrapper = mount(<Provider store={store} >
                            <Router>
                              <ConnectedArticleList />
                            </Router>
                         </Provider>)
    
    return {
        cdMountSpy,    
        store,          
        wrapper
    }
}

describe('VisibleArticleList', () => {    
    const { cdMountSpy, store, wrapper } = setup()

    beforeEach(() => {
        store.clearActions()
    })    

    it('renders the connected component', () => {        
        expect(wrapper.length).toBe(1)
        expect(wrapper.find('Article').length).toBe(0)  
        expect(cdMountSpy).toHaveBeenCalled()     
    })        
})