import { UnionStoreServer } from '../store.interface'

export const addServer = (server: UnionStoreServer) => ({
  type: 'SERVER_ADD',
  server
})

export const addServerBatch = (servers: UnionStoreServer[]) => ({
  type: 'SERVER_ADD_BATCH',
  servers
})
