import { ReduxAction, UnionStoreAppState } from '../store.interface'

const defaultState = { connectionHealth: true, hello: false, websocket: null }

export default (state: UnionStoreAppState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case 'SELF':
      return Object.assign({}, state, { self: action.self })
    case 'AUTH_TOKEN':
      return Object.assign({}, state, { token: action.token, username: atob(action.token).split(':')[0] })
    case 'CONNECTION_HEALTH':
      return Object.assign({}, state, { connectionHealth: action.health })
    case 'WS_OBJECT':
      return Object.assign({}, state, { websocket: action.websocket })
    case 'WS_HELLO':
      return Object.assign({}, state, { hello: action.hello })
    default:
      return state
  }
}
