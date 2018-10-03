import { ReduxAction, UnionStoreMember } from '../store.i'

export default (state: UnionStoreMember[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
