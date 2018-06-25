import { combineReducers } from 'redux'
import { REQUEST_ARTICLES, RECEIVE_ARTICLES, INVALIDATE_ARTICLES, SET_ARTICLEFILTER } from '../actions'

function getArticles(state = { isFetching: false, didInvalidate: false, totalCount: 0, items: [] }, action) {
    switch (action.type) {
        case INVALIDATE_ARTICLES:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_ARTICLES:
            return Object.assign({}, state, { 
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ARTICLES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                totalCount: action.totalCount,
                items: action.articles
            })
        default:
            return state
    }
}

function articles(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_ARTICLES:
        case REQUEST_ARTICLES:
        case RECEIVE_ARTICLES:
            return Object.assign({}, state, getArticles(state, action))
        default:
            return state
    }
}

function articleFilters(state = {}, action) {
    switch (action.type) {
        case SET_ARTICLEFILTER:
            return Object.assign({}, state, action.filter)
        default:
            return state
    }
}

const blogReducer = combineReducers({
    articleFilters,
    articles
})

export default blogReducer