import * as API from '../api'

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const INVALIDATE_ARTICLES = 'INVALIDATE_ARTICLES'
export const SET_ARTICLEFILTER = 'SET_ARTICLEFILTER'

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
        return API.getAllArticles(createArticleFilters(state))            
            .then(res => dispatch(receiveArticles(res.data)))
            .catch(err => console.log(err))
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