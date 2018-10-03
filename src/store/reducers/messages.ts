import { ReduxAction, UnionStoreMessage } from '../store.interface'

export default (state: UnionStoreMessage[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
