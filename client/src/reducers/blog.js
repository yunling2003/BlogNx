import { combineReducers } from 'redux'
import { REQUEST_ARTICLES, RECEIVE_ARTICLES } from '../actions'

function getArticles(state = { isFetching: false, didInvalidate: false, items: [] }, action) {
    switch (action.type) {
        case REQUEST_ARTICLES:
            return Object.assign({}, state, { 
                isFetching: true,
                didInvalidate: false
            })
        case RECEIVE_ARTICLES:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.articles
            })
        default:
            return state
    }
}

function articles(state = {}, action) {
    switch (action.type) {
        case REQUEST_ARTICLES:
        case RECEIVE_ARTICLES:
            return Object.assign({}, state, getArticles(state, action))
        default:
            return state
    }
}

const blogReducer = combineReducers({
    articles
})

export default blogReducer