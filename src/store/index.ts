import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'

export default (preLoadedState?: any) => {
  return createStore(
    reducer,
    preLoadedState,
    applyMiddleware(thunkMiddleware, createLogger())
  )
}
