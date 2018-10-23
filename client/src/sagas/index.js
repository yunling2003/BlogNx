import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import { GET_COMMENTSCOUNT,
    LOAD_COMMENTS,
    receiveCommentsCount,
    receiveComments } from '../actions/article'
import {     
    ARTICLE_FETCH_REQUESTED,
    beginFetchArticles,
    receiveArticles,
    endFetchArticles,
    ARTICLE_PUBLISH_REQUESTED,
    beginPublishArticle,
    endPublishArticle,
    receiveArticlePublishResponse,
    ARTICLE_EDIT_REQUESTED,
    beginDeleteArticle,
    endDeleteArticle,
    ARTICLE_DELETE_REQUESTED
 } from '../actions/myblog'
import { refreshToken } from '../actions/auth'
import * as API from '../api'

function* fetchArticles() {    
    yield put(beginFetchArticles())
    const uid = yield select(state => state.currentUser.userName)
    const token = yield select(state => state.currentUser.token) 
    if(uid && token) {
        const res = yield call(API.getMyPublishedArticles, {            
            uid: uid,
            token: token
        })
        if(res) {            
            yield put(refreshToken(res.headers.authtoken))
            yield put(receiveArticles(res.data))
        } else {
            console.error('Error occurred!')    
        }            
    }       
    yield put(endFetchArticles())
}

function* fetchArticlesAsync() {
    yield takeEvery(ARTICLE_FETCH_REQUESTED, fetchArticles)
}

function* publishArticle(action) {
    yield put(beginPublishArticle())
    const uid = yield select(state => state.currentUser.userName)
    const token = yield select(state => state.currentUser.token) 
    if(uid && token) {
        const res = yield call(API.publishArticle, action.article, {
            uid: uid,
            token: token
        })
        if(res) {
            yield put(refreshToken(res.headers.authtoken))
            yield put(receiveArticlePublishResponse(res.data))
        } else {
            console.error('Error occurred!')
        }
    }
    yield put(endPublishArticle())
}

function* publishArticleAsync() {
    yield takeEvery(ARTICLE_PUBLISH_REQUESTED, publishArticle)
}

function* editArticle(action) {
    yield put(beginPublishArticle())
    const uid = yield select(state => state.currentUser.userName)
    const token = yield select(state => state.currentUser.token) 
    if(uid && token) {
        const res = yield call(API.editArticle, action.article, {
            uid: uid,
            token: token
        })
        if(res) {
            yield put(refreshToken(res.headers.authtoken))
            yield put(receiveArticlePublishResponse(res.data))
        } else {
            console.error('Error occurred!')
        }
    }
    yield put(endPublishArticle())
}

function* editArticleAsync() {
    yield takeEvery(ARTICLE_EDIT_REQUESTED, editArticle)
}

function* deleteArticle(action) {
    yield put(beginDeleteArticle())
    const uid = yield select(state => state.currentUser.userName)
    const token = yield select(state => state.currentUser.token) 
    if(uid && token) {
        const res = yield call(API.deleteArticle, action.id, { uid: uid, token: token})        
        if(res) {            
            yield put(refreshToken(res.headers.authtoken))            
        } else {
            console.error('Error occurred!')    
        }   
    }
    yield put(endDeleteArticle())
}

function* deleteArticleAndRefresh(action) {
    yield call(deleteArticle, action)
    yield call(fetchArticles)
}

function* deleteArticleAndRefreshAsync() {
    yield takeEvery(ARTICLE_DELETE_REQUESTED, deleteArticleAndRefresh)
}

function* getCommentsCount(action) {
    const res = yield call(API.getCommentsCount, action.articleId)
    if(res) {
        yield put(receiveCommentsCount(action.articleId, res.data.count))
    }
}

function* getCommentsCountAsync() {
    yield takeEvery(GET_COMMENTSCOUNT, getCommentsCount)
}

function* loadComments(action) {
    const res = yield call(API.loadComments, action.articleId, action.page, action.pageSize)
    if(res) {
        yield put(receiveComments(action.articleId, res.data.comments))
    }
}

function* loadCommentsAsync() {
    yield takeEvery(LOAD_COMMENTS, loadComments)
}

export default function* rootSaga() {
    yield all([
        fetchArticlesAsync(), 
        publishArticleAsync(),
        editArticleAsync(),
        deleteArticleAndRefreshAsync(),
        getCommentsCountAsync(),
        loadCommentsAsync()
    ])
}