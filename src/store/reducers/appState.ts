import { ReduxAction, UnionStoreAppState } from '../store.interface'

const defaultState = { connectionLost: false, token: localStorage.getItem('token') }

export default (state: UnionStoreAppState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case 'AUTH_TOKEN':
      return Object.assign({}, state, { token: action.token })
    default:
      return state
  }
}
