import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import blogReducer from './reducers/blog'

const loggerMiddleware = createLogger()

export default function blogStore(preloadedState) {
  return createStore(
    blogReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}