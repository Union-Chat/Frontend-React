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

  private authenticate () {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Connected to the server, authenticating')
    this.ws.send('Basic ' + localStorage.getItem('token'))
  }

  private handleMessage (message: { op: number, d: any }) {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Message received', message)
    switch (message.op) {
      case InOpCodes.HELLO:
      case InOpCodes.MEMBER_ADD:
      case InOpCodes.MESSAGE:
      case InOpCodes.PRESENCE_UPDATE:
      case InOpCodes.SERVER_JOIN:
      case InOpCodes.SERVER_LEAVE:
      case InOpCodes.MEMBER_CHUNK:
      case InOpCodes.DELETE_MESSAGE:
      case InOpCodes.MEMBER_LEAVE:
      default:
        console.warn('%c[union:websocket]', 'color: #257dd4', 'Received an invalid message!', message)
    }
  }

  private handleDisconnect (close: CloseEvent) {
    console.log('%c[union:websocket]', 'color: #257dd4', `Disconnected from server: ${close.code} ${close.reason} (Was clean: ${close.wasClean})`)
    // Dispatch connection lost to store

    if (close.code !== 4001) {
      // @todo: Exponential backoff
      console.log('%c[union:websocket]', 'color: #257dd4', 'Trying to reconnect in 5s')
      setTimeout(() => this.connect(), 5e3)
    } else {
      // Connection ok
      // Clear server & all related things
      // Clear token
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
  REQUEST_MEMBER_CHUNK: 7
}
