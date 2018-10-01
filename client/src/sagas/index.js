import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import {     
    ARTICLE_FETCH_REQUESTED,
    beginFetchArticles,
    receiveArticles,
    endFetchArticles,
    ARTICLE_PUBLISH_REQUESTED,
    beginPublishArticle,
    endPublishArticle,
    receiveArticlePublishResponse
 } from '../actions/myblog'
import { refreshToken } from '../actions/auth'
import * as API from '../api'

function* fetchArticles(action) {    
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

export default function* rootSaga() {
    yield all([
        fetchArticlesAsync(), 
        publishArticleAsync()
    ])
}