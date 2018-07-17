import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { fetchArticlesIfNeeded, requestArticles, receiveArticles } from '../../src/actions'
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
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    })

    it('creates actions when fetching has been done', () => {
       fetchMock.mock('*', { 
           body: articles, 
           headers: { 'content-type': 'application/json' } 
       })

       return store.dispatch(fetchArticlesIfNeeded())
        .then(() => {
            const actions = store.getActions()
            expect(actions.length).toBe(2)
            expect(actions[0]).toEqual(requestArticles())
            expect(actions[1]).toEqual(receiveArticles(articles))            
        })
      })
})