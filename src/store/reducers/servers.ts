import { ReduxAction, UnionStoreServer } from '../store.interface'

export default (state: UnionStoreServer[] = [], action: ReduxAction) => {
  switch (action.type) {
    case 'SERVER_ADD':
      return [action.server, ...state]
    case 'SERVER_ADD_BATCH':
      return [...action.servers, ...state]
    default:
      return state
  }
}
