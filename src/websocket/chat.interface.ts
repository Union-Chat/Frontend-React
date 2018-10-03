export interface SocketServer {
  id: number
  name: string
  owner: string
  iconUrl: string
  members: SocketMember[]
  messages: Map<any, any>
}

export interface SocketMember {
  id: string
  createdAt: number
  online: boolean
}

export interface SocketPresence {
  id: string
  status: boolean
}
