import { SocketPresence, SocketServer } from './chat.interface'
import { addServerBatch } from '../store/actions/servers'
import { addMemberBatch, updateMemberPresence } from '../store/actions/members'

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

export const presence = (data: SocketPresence, dispatch: any) => {
  dispatch(updateMemberPresence(data.id, data.status))
}
