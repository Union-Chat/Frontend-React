import { ReduxAction, UnionStoreMember } from '../store.interface'

export default (state: UnionStoreMember[] = [], action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
}
