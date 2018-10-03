import { ReduxAction, UnionStoreAPI } from '../store.i'

export default (state: UnionStoreAPI = null, action: ReduxAction) => {
  switch (action.type) {
    case 'API_INFO':
      return action.infos
    default:
      return state
  }
}
