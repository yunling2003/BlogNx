import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import blogReducer from './reducers/blog'
import rootSaga from './sagas'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

export default function blogStore(preloadedState) {
  const store = createStore(
    blogReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      loggerMiddleware
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}