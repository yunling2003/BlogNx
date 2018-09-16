import http from '../utils/http'
import { call, put, all, takeEvery, select } from 'redux-saga/effects'
import {     
    ARTICLE_FETCH_REQUESTED,
    beginFetchArticles,
    receiveArticles,
    endFetchArticles  
 } from '../actions/myblog'
 import crypt from '../utils/crypt'

function* fetchArticles(action) {    
    yield put(beginFetchArticles())
    const uid = yield select(state => state.currentUser.userName)
    const token = yield select(state => state.currentUser.token) 
    if(uid && token) {
        const res = yield call(http.get, '/myblog/articles', {
            params: {
                uid: uid,
                sign: crypt.genSha256Sign(uid + token)
            }
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