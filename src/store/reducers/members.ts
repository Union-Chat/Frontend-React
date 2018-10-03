import { ReduxAction, UnionStoreMember } from '../store.interface'

export default (state: UnionStoreMember[] = [], action: ReduxAction) => {
  switch (action.type) {
    case 'MEMBER_ADD':
      return [action.member, ...state]
    case 'MEMBER_ADD_BATCH':
      return [...action.members, ...state]
    default:
      return state
  }
}
