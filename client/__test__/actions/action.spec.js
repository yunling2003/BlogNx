import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from '../../src/utils/http'
import mockAdapter from 'axios-mock-adapter'
import { fetchArticlesIfNeeded, requestArticles, receiveArticles } from '../../src/actions/article'
import { articles } from '../fakeData'

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

describe('test actions', () => {    
    
    it('creates actions when fetching has been done', () => {
       const mock = new mockAdapter(axios)
       mock.onGet(/articles/).reply(200, articles)       

       return store.dispatch(fetchArticlesIfNeeded())
        .then(() => {
            const actions = store.getActions()
            expect(actions.length).toBe(2)
            expect(actions[0]).toEqual(requestArticles())
            expect(actions[1]).toEqual(receiveArticles(articles))            
        })
      })
})