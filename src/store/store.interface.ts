import ChatWebSocket from '../websocket/chat'

export default interface UnionStore {
  api?: UnionStoreAPI
  appState: UnionStoreAppState
  servers: UnionStoreServer[]
  members: UnionStoreMember[]
}

export interface UnionStoreAPI {
  api_version: number,
  websocket: number,
  voice: number,
  app_settings: {
    max_servers: number,
    max_message_characters: number,
    max_username_characters: number
  }
}

export interface UnionStoreAppState {
  connectionHealth: boolean
  hello: boolean
  websocket: ChatWebSocket
  username?: string
  token?: string
}

export interface UnionStoreServer {
  id: number
  name: string
  owner: string
  icon: string
  members: string[]
  messages: UnionStoreMessage[]
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

export interface UnionStoreOrganizedMessages {
  id: string // React key
  author: UnionStoreMember
  messages: UnionStoreMessage[]
}

export interface ReduxAction {
  [key: string]: any,

  type: string
}
