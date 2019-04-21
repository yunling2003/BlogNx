import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import blogReducer from './reducers/blog'
import rootSaga from './sagas'

const loggerMiddleware = createLogger()
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        
        }) : compose

export default function blogStore(preloadedState) {
	const store = createStore(
        blogReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(
            thunkMiddleware,
            sagaMiddleware,
            loggerMiddleware
        ))
    )
    sagaMiddleware.run(rootSaga)
    return store
}