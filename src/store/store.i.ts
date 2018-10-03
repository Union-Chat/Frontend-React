export default interface UnionStore {
  servers: UnionStoreServer[]
  members: UnionStoreMember[]
  messages: UnionStoreMessage[]
}

export interface UnionStoreServer {
  id: number
  name: string
  owner: string
  icon: string
  members: string[]
  messages: string[]
}

export interface UnionStoreMember {
  name: string
  online: boolean
}

export interface UnionStoreMessage {
  id: string
  author: string
  content: string
  createdAt: number
}

export interface ReduxAction {
  [key: string]: any,

  type: string
}
