import  'cross-fetch/polyfill'

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const INVALIDATE_ARTICLES = 'INVALIDATE_ARTICLES'

export const SET_ARTICLEFILTER = 'SET_ARTICLEFILTER'

export const BEGIN_SIGNIN = 'BEGIN_SIGNIN'
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS'
export const SIGNIN_ERROR = 'SIGNIN_ERROR'
export const CLEAR_ERROR = 'CLEAR_ERROR'

export function setArticleFilters(filter) {
    return {
        type: SET_ARTICLEFILTER,
        filter
    }
}

export function invalidateArticles() {
    return {
        type: INVALIDATE_ARTICLES
    }
}

export function requestArticles() {
    return {
        type: REQUEST_ARTICLES
    }
}

export function receiveArticles(json) {
    return {
        type: RECEIVE_ARTICLES,
        totalCount: json.totalCount,
        articles: json.articles
    }
}

function createArticleFilters(state) {
    const filters = state.articleFilters
    return Object.keys(filters).map(key => `${key}=${filters[key]}`).join('&')    
}

function fetchArticles(state) {
    return dispatch => {
        dispatch(requestArticles())
        return fetch('http://localhost:3000/articles?' + createArticleFilters(state))
            .then(response => response.json())
            .then(json => dispatch(receiveArticles(json)))
    }
}

function shouldFetchArticles(state) {
    const articles = state.articles
    if (!articles) {
        return true
    } else if (articles.isFetching) {
        return false
    } else {
        return articles.didInvalidate
    }
}

export function fetchArticlesIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchArticles(getState())) {
            return dispatch(fetchArticles(getState()))
        }
    }
}

export function beginSignIn() {
    return {
        type: BEGIN_SIGNIN
    }
}

export function signInSuccess(loginObj) {
    return {
        type: SIGNIN_SUCCESS,
        userName: loginObj.userName,
        token: loginObj.token
    }
}

export function signInError(errObj) {
    return {
        type: SIGNIN_ERROR,
        message: errObj.message
    }
}

export function clearError() {
    return {
        type: CLEAR_ERROR
    }
}

function signInUser(loginObj) {
    const { userName, password } = loginObj
    return dispatch => {
        dispatch(beginSignIn())
        return fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({                                    
                userName: userName.value,
                password: password.value                
            })
        }).then(res => res.json())
        .then(json => {
            if(json.code === 'success') {
                dispatch(signInSuccess({
                    userName: userName.value,
                    token: json.authToken
                }))
            }
            if(json.code === 'error') {
                dispatch(signInError({
                    message: json.message
                }))
            }
        }).catch(err => {
            dispatch(signInError({
                message: err
            }))
        })
    }
}

export function signIn(loginObj) {
    return dispatch => {
        return dispatch(signInUser(loginObj))
    }
}