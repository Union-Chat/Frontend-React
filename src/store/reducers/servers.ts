import { ReduxAction, UnionStoreServer } from '../store.interface'

export default (state: UnionStoreServer[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
