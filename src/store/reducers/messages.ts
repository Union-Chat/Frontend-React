import { ReduxAction, UnionStoreMessage } from '../store.interface'

export default (state: UnionStoreMessage[] = [], action: ReduxAction) => {
  switch (action.type) {
    case 'MESSAGE_ADD':
      return [action.message, ...state]
    case 'MESSAGE_ADD_BATCH':
      return [...action.messages, ...state]
    default:
      return state
  }
}
