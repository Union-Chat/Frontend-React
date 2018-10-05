import { hello, memberAdd, memberLeave, messageCreate, presence, serverJoin, serverLeave } from './chat.handler'
import { setConnectionHealth, setHello, setLoginToken } from '../store/actions/appState'
import { purgeServers } from '../store/actions/servers'
import { purgeMembers } from '../store/actions/members'

export default class ChatWebSocket {

  ws: WebSocket
  address: string
  dispatcher: any

  constructor (address: string, dispatch: any) {
    this.dispatcher = dispatch
    this.address = address
  }

  connect () {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Connecting to server')
    this.ws = new WebSocket(this.address)

    this.ws.addEventListener('open', () => this.authenticate())
    this.ws.addEventListener('message', (m) => this.handleMessage(JSON.parse(m.data)))
    this.ws.addEventListener('close', (c) => this.handleDisconnect(c))
  }

  disconnect () {
    if (this.ws) {
      console.log('%c[union:websocket]', 'color: #257dd4', 'Closing connection to the server')
      this.ws.close()
      this.ws = null
    }
  }

  private authenticate () {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Connected to the server, authenticating')
    this.ws.send('Basic ' + localStorage.getItem('token'))
    this.dispatcher(setHello(false))
  }

  private handleMessage (message: { op: number, d: any }) {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Message received', message)
    switch (message.op) {
      case InOpCodes.HELLO:
        hello(message.d, this.dispatcher)
        break
      case InOpCodes.MEMBER_ADD:
        memberAdd(message.d, this.dispatcher)
        break
      case InOpCodes.MESSAGE:
        messageCreate(message.d, this.dispatcher)
        break
      case InOpCodes.PRESENCE_UPDATE:
        presence(message.d, this.dispatcher)
        break
      case InOpCodes.SERVER_JOIN:
        serverJoin(message.d, this.dispatcher)
        break
      case InOpCodes.SERVER_LEAVE:
        serverLeave(message.d, this.dispatcher)
        break
      case InOpCodes.MEMBER_CHUNK:
      case InOpCodes.DELETE_MESSAGE:
        break
      case InOpCodes.MEMBER_LEAVE:
        memberLeave(message.d, this.dispatcher)
        break
      default:
        console.warn('%c[union:websocket]', 'color: #257dd4', 'Received an invalid message!', message)
    }
  }

  private handleDisconnect (close: CloseEvent) {
    console.log('%c[union:websocket]', 'color: #257dd4', `Disconnected from server: ${close.code} ${close.reason} (Was clean: ${close.wasClean})`)
    this.dispatcher(setConnectionHealth(false))

    if (close.code !== 4001) {
      // @todo: Exponential backoff
      console.log('%c[union:websocket]', 'color: #257dd4', 'Trying to reconnect in 5s')
      setTimeout(() => this.connect(), 5e3)
    } else {
      window.localStorage.removeItem('token')
      this.dispatcher(setConnectionHealth(true))
      this.dispatcher(purgeServers())
      this.dispatcher(purgeMembers())
      this.dispatcher(setLoginToken(null))
    }
  }
}

export const InOpCodes = {
  HELLO: 1,
  MEMBER_ADD: 2,
  MESSAGE: 3,
  PRESENCE_UPDATE: 4,
  SERVER_JOIN: 5,
  SERVER_LEAVE: 6,
  MEMBER_CHUNK: 7,
  DELETE_MESSAGE: 8,
  MEMBER_LEAVE: 10
}

export const OutOpCodes = {
  REQUEST_MEMBER_CHUNK: 9
}
