import { SocketMemberAdd, SocketMemberLeave, SocketMessage, SocketPresence, SocketServer } from './chat.interface'
import {
  ackServerMessage,
  addServer, addServerBatch, addServerMember, addServerMessage, deleteServer, purgeServers,
  removeServerMember, serverPoke
} from '../store/actions/servers'
import { addMember, addMemberBatch, purgeMembers, updateMemberPresence } from '../store/actions/members'
import { setConnectionHealth, setHello } from '../store/actions/appState'
import UnionStore, { UnionStoreMember, UnionStoreServer } from '../store/store.interface'
import Parser from '../components/Server/formatter'

export const hello = (data: SocketServer[], dispatch: any) => {
  let servers: UnionStoreServer[] = []
  let members: UnionStoreMember[] = []
  data.forEach(server => {
    let serverMembers = server.members.map(member => member.id)
    members.push(...server.members)

    servers.push({
      id: server.id,
      name: server.name,
      owner: server.owner,
      icon: server.iconUrl,
      members: serverMembers,
      messages: [],
      mentions: 0,
      lastRead: ''
    })
  })

  dispatch(purgeServers())
  dispatch(purgeMembers())
  dispatch(addServerBatch(servers))
  dispatch(addMemberBatch(members))
  dispatch(setHello(true))
  dispatch(setConnectionHealth(true))
}

export const memberAdd = (data: SocketMemberAdd, dispatch: any) => {
  dispatch(addMember(data.member))
  dispatch(addServerMember(data.server, data.member.id))
}

export const messageCreate = (data: SocketMessage, dispatch: any, getState: any) => {
  const user = (getState() as UnionStore).appState.self.id
  if (Parser.isMention(data.content, user)) {
    dispatch(serverPoke(data.server))

    // @todo: Notification sound
    const notif = new Notification(`${data.author} mentioned you!`, {
      body: data.content.replace(Parser.mention, '@$1')
    })

    notif.onclick = () => {
      window.focus()
      notif.close()
    }
  }

  dispatch(addServerMessage(data.server, {
    id: data.id,
    author: data.author,
    content: data.content,
    createdAt: data.createdAt
  }))
}

export const presence = (data: SocketPresence, dispatch: any) => {
  dispatch(updateMemberPresence(data.id, data.state))
}

export const serverJoin = (data: SocketServer, dispatch: any) => {
  dispatch(addServer({
    id: data.id,
    name: data.name,
    owner: data.owner,
    icon: data.iconUrl,
    members: data.members.map(member => member.id),
    messages: [],
    mentions: 0,
    lastRead: ''
  }))
  dispatch(addMemberBatch(data.members))
}

export const serverLeave = (data: number, dispatch: any) => {
  dispatch(deleteServer(data))
}

export const memberLeave = (data: SocketMemberLeave, dispatch: any) => {
  dispatch(removeServerMember(data.server, data.user))
}
