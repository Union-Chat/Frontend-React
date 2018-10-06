import { createStore, applyMiddleware, StoreEnhancer } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

let middleware: StoreEnhancer
if (process.env.NODE_ENV !== 'production') {
  middleware = applyMiddleware(thunkMiddleware, createLogger())
} else {
  middleware = applyMiddleware(thunkMiddleware)
}

export default (preLoadedState?: any) => {
  return createStore(
    reducer,
    preLoadedState,
    middleware
  )
}
