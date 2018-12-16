import { combineReducers } from 'redux'
import { REQUEST_ARTICLES, 
    RECEIVE_ARTICLES, 
    INVALIDATE_ARTICLES, 
    SET_ARTICLEFILTER,
    CLEAR_ARTICLES,
    RECEIVE_COMMENTSCOUNT,
    RECEIVE_COMMENTS } from '../actions/article'
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
    CLEAR_ARTICLE_PUBLISH_STATUS,
    ARTICLE_DELETE_BEGIN,
    ARTICLE_DELETE_END,
    SELECT_MENU } from '../actions/myblog'

export function articles(state = {}, action) {
    let newState
    switch (action.type) {
        case INVALIDATE_ARTICLES:
            newState = Object.assign({}, state, {
                didInvalidate: true
            })
            break
        case REQUEST_ARTICLES:
            newState =  Object.assign({}, state, { 
                isFetching: true,
                didInvalidate: false
            })
            break
        case RECEIVE_ARTICLES:
            newState = Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                totalCount: action.totalCount,
                items: action.articles
            })
            break
        case CLEAR_ARTICLES:
            newState = Object.assign({}, state, {
                items: []
            })
            break
        case RECEIVE_COMMENTSCOUNT:
            newState = Object.assign({}, state, {
                items: state.items.map(item => {
                    if(item._id === action.articleId) {
                        return Object.assign({}, item, {
                            commentsCount: action.count
                        })
                    }
                    return item
                })                
            })
            break
        case RECEIVE_COMMENTS:
            newState = Object.assign({}, state, {
                items: state.items.map(item => {
                    if(item._id === action.articleId) {
                        return Object.assign({}, item, {
                            comments: action.comments
                        })
                    }
                    return item
                })
            })
            break
        default:
            newState = Object.assign({}, state)                
    }

    if(Object.keys(newState).length > 0) {  //Not an empty object
        sessionStorage.setItem("articles", JSON.stringify(newState))
    }    
    return newState
}

export function articleFilters(state = {}, action) {
    let newState
    switch (action.type) {
        case SET_ARTICLEFILTER:
            newState = Object.assign({}, state, action.filter)
            break
        default:
            newState = Object.assign({}, state)
    }

    if(Object.keys(newState).length > 0) {
        sessionStorage.setItem("articleFilters", JSON.stringify(newState))
    }
    return newState
}

export function currentUser(state = {}, action) {
    let newState
    switch (action.type) {
        case BEGIN_SIGNIN:
            newState = Object.assign({}, state, {
                isLoggingIn: true
            })
            break
        case SIGNIN_SUCCESS:
            newState = Object.assign({}, state, {
                isLoggingIn: false,
                userName: action.userName,
                token: action.token
            })
            break
        case SIGNIN_ERROR:
            newState = Object.assign({}, state, {
                isLoggingIn: false,
                logInMessage: action.message
            })
            break
        case CLEAR_ERROR:
            newState = Object.assign({}, state, {
                logInMessage: null
            })
            break
        case SIGN_OUT:
            newState = Object.assign({}, state, {
                userName: null,
                token: null,
                logInMessage: ''
            })
            break
        case REFRESH_TOKEN:
            newState = Object.assign({}, state, {
                token: action.token
            })
            break
        default:
            newState = Object.assign({}, state)
    }

    if(Object.keys(newState).length > 0) {
        sessionStorage.setItem("currentUser", JSON.stringify(newState))
    }
    return newState
}

export function myArticles(state = {}, action) {
    let newState
    switch (action.type) {
        case ARTICLE_FETCH_BEGIN:
            newState = Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })
            break
        case ARTICLE_FETCH_REQUESTED:
            newState = Object.assign({}, state, {
                didInvalidate: true
            })
            break
        case ARTICLE_FETCH_END:
            newState = Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false
            })
            break
        case ARTICLE_RECEIVED:
            newState = Object.assign({}, state, {                
                totalCount: action.totalCount,
                items: action.articles
            })
            break
        case ARTICLE_PUBLISH_BEGIN:
            newState = Object.assign({}, state, {
                publish: {
                    isPublishing: true,
                    status: state.publish.status,
                    publishMessage: state.publish.publishMessage
                }
            })
            break
        case ARTICLE_PUBLISH_END:
            newState = Object.assign({}, state, {
                publish: {
                    isPublishing: false,
                    status: state.publish.status,
                    publishMessage: state.publish.publishMessage
                }
            })
            break
        case ARTICLE_PUBLISH_RESPONSE:
            newState = Object.assign({}, state, {
                publish: {
                    isPublishing: state.publish.isPublishing,
                    status: action.status,
                    publishMessage: action.publishMessage || ''
                }
            })
            break
        case CLEAR_ARTICLE_PUBLISH_STATUS:
            newState = Object.assign({}, state, {
                publish: {
                    isPublishing: false,
                    status: 'init',
                    publishMessage: ''
                }
            })
            break
        case ARTICLE_DELETE_BEGIN:
            newState = Object.assign({}, state, {
                isDeleting: true
            })
            break
        case ARTICLE_DELETE_END:
            newState = Object.assign({}, state, {
                isDeleting: false
            })
            break
        case SELECT_MENU:
            newState = Object.assign({}, state, {
                selectedMenu: action.menu
            })
            break
        default:
            newState = Object.assign({}, state)
    }

    if(Object.keys(newState).length > 0) {
        sessionStorage.setItem("myArticles", JSON.stringify(newState))
    }
    return newState
}

const blogReducer = combineReducers({
    currentUser,
    articleFilters,
    articles,
    myArticles
})

export default blogReducer