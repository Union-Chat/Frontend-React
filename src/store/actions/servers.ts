import { UnionStoreServer } from '../store.interface'

export const addServer = (server: UnionStoreServer) => ({
  type: 'SERVER_ADD',
  server
})

export const addServerBatch = (servers: UnionStoreServer[]) => ({
  type: 'SERVER_ADD_BATCH',
  servers
})

export const deleteServer = (server: number) => ({
  type: 'SERVER_DELETE',
  server
})

export const addServerMember = (server: number, member: string) => ({
  type: 'SERVER_MEMBER_ADD',
  server, member
})

export const removeServerMember = (server: number, member: string) => ({
  type: 'SERVER_MEMBER_REMOVE',
  server, member
})

export const addServerMessage = (server: number, message: string) => ({
  type: 'SERVER_MESSAGE_ADD',
  server, message
})

