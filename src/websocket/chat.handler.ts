import { SocketMemberAdd, SocketMemberLeave, SocketMessage, SocketPresence, SocketServer } from './chat.interface'
import {
  addServer, addServerBatch, addServerMember, addServerMessage, deleteServer,
  removeServerMember
} from '../store/actions/servers'
import { addMember, addMemberBatch, updateMemberPresence } from '../store/actions/members'
import { addMessage } from '../store/actions/messages'

export const hello = (data: SocketServer[], dispatch: any) => {
  let servers = []
  let members = []
  data.forEach(server => {
    let serverMembers = []

    server.members.forEach(member => {
      members.push({ name: member.id, online: member.online })
      serverMembers.push(member.id)
    })

    servers.push({
      id: server.id,
      name: server.name,
      owner: server.owner,
      icon: server.iconUrl,
      members: serverMembers,
      messages: []
    })
  })

  dispatch(addServerBatch(servers))
  dispatch(addMemberBatch(members))
}

export const memberAdd = (data: SocketMemberAdd, dispatch: any) => {
  dispatch(addMember({
    name: data.member.id,
    online: data.member.online
  }))
  dispatch(addServerMember(data.server, data.member.id))
}

export const messageCreate = (data: SocketMessage, dispatch: any) => {
  dispatch(addMessage({
    id: data.id,
    author: data.author,
    content: data.content,
    createdAt: data.createdAt
  }))
  dispatch(addServerMessage(data.server, data.id))
}

export const presence = (data: SocketPresence, dispatch: any) => {
  dispatch(updateMemberPresence(data.id, data.status))
}

export const serverJoin = (data: SocketServer, dispatch: any) => {
  dispatch(addServer({
    id: data.id,
    name: data.name,
    owner: data.owner,
    icon: data.iconUrl,
    members: data.members.map(member => member.id),
    messages: []
  }))
}

export const serverLeave = (data: number, dispatch: any) => {
  dispatch(deleteServer(data))
}

export const memberLeave = (data: SocketMemberLeave, dispatch: any) => {
  dispatch(removeServerMember(data.server, data.user))
}
