import { hello, memberAdd, memberLeave, messageCreate, presence, serverJoin, serverLeave } from './chat.handler'
import { setConnectionHealth, setHello, setLoginToken } from '../store/actions/appState'
import { purgeServers } from '../store/actions/servers'
import { purgeMembers } from '../store/actions/members'

export default class ChatWebSocket {

  ws: WebSocket
  address: string
  dispatcher: any
  getState: any

  constructor (address: string, dispatch: any, getState: any) {
    this.dispatcher = dispatch
    this.getState = getState
    this.address = address
  }

  connect () {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Connecting to server')
    this.ws = new WebSocket(this.address)

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
    this.ws.send(JSON.stringify({ op: OutOpCodes.AUTHENTICATE, d: 'Basic ' + localStorage.getItem('token') }))
    this.dispatcher(setHello(false))
  }

  private handleMessage (message: { op: number, d: any, e: any }) {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Message received', message)
    switch (message.op) {
      case InOpCodes.WELCOME:
        this.authenticate()
        break
      case InOpCodes.HELLO:
        hello(message.d, this.dispatcher)
        break
      case InOpCodes.DISPATCH_EVENT:
        this.handleEvent(message)
        break
      default:
        console.warn('%c[union:websocket]', 'color: #257dd4', 'Received an invalid message!', message)
    }
  }

  private handleEvent (message: { op: number, d: any, e: any }) {
    switch (message.e) {
      // User events
      case 'PRESENCE_UPDATE':
        presence(message.d, this.dispatcher)
        break

      // Server events
      case 'SERVER_CREATE':
        serverJoin(message.d, this.dispatcher)
        break
      case 'SERVER_DELETE':
        serverLeave(message.d, this.dispatcher)
        break

      // Member events
      case 'SERVER_MEMBER_JOIN':
        memberAdd(message.d, this.dispatcher)
        break
      case 'SERVER_MEMBER_LEAVE':
        memberLeave(message.d, this.dispatcher)
        break

      // Message events
      case 'MESSAGE_CREATE':
        messageCreate(message.d, this.dispatcher, this.getState)
        break
      default:
        console.warn('%c[union:websocket]', 'color: #257dd4', 'Received an invalid event!', message)
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
  OK: -1,
  DISPATCH_EVENT: 0,
  WELCOME: 1,
  HELLO: 3
}

export const OutOpCodes = {
  AUTHENTICATE: 2,
  SUBSCRIBE: 4,
  UNSUBSCRIBE: 5
}
