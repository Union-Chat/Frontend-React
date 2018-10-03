import { ReduxAction, UnionStoreMessage } from '../store.i'

export default (state: UnionStoreMessage[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
