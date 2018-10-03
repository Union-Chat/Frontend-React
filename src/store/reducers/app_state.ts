import { ReduxAction, UnionStoreAppState } from '../store.i'

const defaultState = { connectionLost: false, token: localStorage.getItem('token') }

export default (state: UnionStoreAppState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
