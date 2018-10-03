import { ReduxAction, UnionStoreServer } from '../store.i'

export default (state: UnionStoreServer[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
