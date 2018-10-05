import { ReduxAction, UnionStoreMember } from '../store.interface'

export default (state: UnionStoreMember[] = [], action: ReduxAction) => {
  switch (action.type) {
    case 'MEMBER_ADD':
      return [action.member, ...state].filter((member, index, self) =>
        index === self.findIndex((t) => (
          t.name === member.name
        ))
      )
    case 'MEMBER_ADD_BATCH':
      return [...action.members, ...state].filter((member, index, self) =>
        index === self.findIndex((t) => (
          t.name === member.name
        ))
      )
    case 'MEMBER_PRESENCE':
      return state.map(member => member.name === action.member ? {
        name: member.name,
        online: action.presence
      } : member)
    case 'MEMBER_PURGE':
      return []
    default:
      return state
  }
}
