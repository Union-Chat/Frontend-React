import { ReduxAction, UnionStoreServer } from '../store.interface'

export default (state: UnionStoreServer[] = [], action: ReduxAction) => {
  switch (action.type) {
    case 'SERVER_ADD':
      return [action.server, ...state]
    case 'SERVER_ADD_BATCH':
      return [...action.servers, ...state]
    case 'SERVER_MEMBER_ADD':
      return state.map(server => server.id === action.server ? Object.assign({}, server, { members: [action.member, ...server.members]}) : server)
    case 'SERVER_MEMBER_REMOVE':
      return state.map(server => server.id === action.server ? Object.assign({}, server, { members: server.members.filter(member => member !== action.member)}) : server)
    case 'SERVER_MESSAGE_ADD':
      return state.map(server => server.id === action.server ? Object.assign({}, server, { messages: [action.message, ...server.messages]}) : server)
    case 'SERVER_MESSAGE_ACK':
      return state.map(server => server.id === action.server ? Object.assign({}, server, { lastRead: server.messages[0] ? server.messages[0].id : '', mentions: 0}) : server)
    case 'SERVER_POKE':
      return state.map(server => server.id === action.server ? Object.assign({}, server, { mentions: server.mentions + 1}) : server)
    case 'SERVER_DELETE':
      return state.filter(server => server.id !== action.server)
    case 'SERVER_PURGE':
      return []
    default:
      return state
  }
}
