import { combineReducers } from 'redux'
import { REQUEST_ARTICLES, 
    RECEIVE_ARTICLES, 
    INVALIDATE_ARTICLES, 
    SET_ARTICLEFILTER } from '../actions/article'
import { BEGIN_SIGNIN, 
    SIGNIN_SUCCESS, 
    SIGNIN_ERROR, 
    CLEAR_ERROR,
    REFRESH_TOKEN,
    SIGN_OUT } from '../actions/auth'
import { ARTICLE_FETCH_BEGIN,
    ARTICLE_FETCH_REQUESTED,
    ARTICLE_FETCH_END,
    ARTICLE_RECEIVED,    
    ARTICLE_PUBLISH_BEGIN,
    ARTICLE_PUBLISH_END,
    ARTICLE_PUBLISH_RESPONSE,
    CLEAR_ARTICLE_PUBLISH_STATUS } from '../actions/myblog'

export function articles(state = {}, action) {
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

export function articleFilters(state = {}, action) {
    switch (action.type) {
        case SET_ARTICLEFILTER:
            return Object.assign({}, state, action.filter)
        default:
            return state
    }
}

export function currentUser(state = {}, action) {
    switch (action.type) {
        case BEGIN_SIGNIN:
            return Object.assign({}, state, {
                isLoggingIn: true
            })
        case SIGNIN_SUCCESS:
            return Object.assign({}, state, {
                isLoggingIn: false,
                userName: action.userName,
                token: action.token
            })
        case SIGNIN_ERROR:
            return Object.assign({}, state, {
                isLoggingIn: false,
                logInMessage: action.message
            })
        case CLEAR_ERROR:
            return Object.assign({}, state, {
                logInMessage: null
            })
        case SIGN_OUT:
            return Object.assign({}, state, {
                userName: null,
                token: null,
                logInMessage: ''
            })
        case REFRESH_TOKEN:
            return Object.assign({}, state, {
                token: action.token
            })
        default:
            return state
    }
}

export function myArticles(state = {}, action) {
    switch (action.type) {
        case ARTICLE_FETCH_BEGIN:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
        case ARTICLE_FETCH_REQUESTED:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case ARTICLE_FETCH_END:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false
            })
        case ARTICLE_RECEIVED:
            return Object.assign({}, state, {                
                totalCount: action.totalCount,
                items: action.articles
            })
        case ARTICLE_PUBLISH_BEGIN:
            return Object.assign({}, state, {
                publish: {
                    isPublishing: true,
                    status: state.publish.status,
                    publishMessage: state.publish.publishMessage
                }
            })
        case ARTICLE_PUBLISH_END:
            return Object.assign({}, state, {
                publish: {
                    isPublishing: false,
                    status: state.publish.status,
                    publishMessage: state.publish.publishMessage
                }
            })
        case ARTICLE_PUBLISH_RESPONSE:
            return Object.assign({}, state, {
                publish: {
                    isPublishing: state.publish.isPublishing,
                    status: action.status,
                    publishMessage: action.publishMessage || ''
                }
            })
        case CLEAR_ARTICLE_PUBLISH_STATUS:
            return Object.assign({}, state, {
                publish: {
                    isPublishing: false,
                    status: 'init',
                    publishMessage: ''
                }
            })
        default:
            return state
    }
}

const blogReducer = combineReducers({
    currentUser,
    articleFilters,
    articles,
    myArticles
})

export default blogReducer