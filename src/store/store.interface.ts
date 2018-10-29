import ChatWebSocket from '../websocket/chat'

export default interface UnionStore {
  api?: UnionStoreAPI
  appState: UnionStoreAppState
  servers: UnionStoreServer[]
  members: UnionStoreMember[]
}

export interface UnionStoreAPI {
  apiVersion: number,
  websocket: number,
  voice: number,
  appSettings: {
    messageCharacterLimit: number,
    usernameCharacterLimit: number,
    serverCharacterLimit: number
    maxServersPerUser: number
    maxAppsPerUser: number
  },
  recaptcha: {
    enabled: boolean,
    key?: string
  }
}

export interface UnionStoreAppState {
  connectionHealth: boolean
  hello: boolean
  websocket: ChatWebSocket
  self?: UnionStoreMember
  token?: string
}

export interface UnionStoreServer {
  id: number
  name: string
  owner: string
  icon: string
  members: string[]
  messages: UnionStoreMessage[]
  mentions: number
  lastRead: string
}

export interface UnionStoreMember {
  id: string
  username: string
  discriminator: number
  avatarUrl?: string
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
