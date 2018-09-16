import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import {     
    ARTICLE_FETCH_REQUESTED,
    beginFetchArticles,
    receiveArticles,
    endFetchArticles  
 } from '../actions/myblog'
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

export default function* rootSaga() {
    yield all([fetchArticlesAsync()])
}