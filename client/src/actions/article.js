import * as API from '../api'

export const REQUEST_ARTICLES = 'REQUEST_ARTICLES'
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES'
export const INVALIDATE_ARTICLES = 'INVALIDATE_ARTICLES'
export const SET_ARTICLEFILTER = 'SET_ARTICLEFILTER'
export const CLEAR_ARTICLES = 'CLEAR_ARTICLES'

export const GET_COMMENTSCOUNT = 'GET_COMMENTSCOUNT'
export const RECEIVE_COMMENTSCOUNT = 'RECEIVE_COMMENTSCOUNT'
export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CLEAR_COMMENTS = 'CLEAR_COMMENT'

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

export function clearArticles() {
    return {
        type: CLEAR_ARTICLES
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
    if (articles.items.length === 0) {
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

export function getCommentsCount(articleId) {
    return {
        type: GET_COMMENTSCOUNT,
        articleId
    }
}

export function receiveCommentsCount(articleId, count) {
    return {
        type: RECEIVE_COMMENTSCOUNT,
        articleId,
        count
    }
}

export function loadComments(articleId, page, pageSize) {
    return {
        type: LOAD_COMMENTS,
        articleId,
        page,
        pageSize
    }
}

export function receiveComments(articleId, commentPage, comments) {
    return {
        type: RECEIVE_COMMENTS,
        articleId,
        commentPage,
        comments
    }
}

export function createComment(articleId, reviewer, content) {
    return {
        type: CREATE_COMMENT,
        articleId,
        reviewer,
        content
    }
}

export function clearComments(articleId) {
    return {
        type: CLEAR_COMMENTS,
        articleId
    }
}