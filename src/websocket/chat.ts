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
    this.ws.addEventListener('message', (m) => this.handleMessage(m))
    this.ws.addEventListener('close', (c) => this.handleDisconnect(c))
  }

  private authenticate () {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Connected to the server, authenticating')
    this.ws.send('Basic ' + localStorage.getItem('token'))
  }

  private handleMessage (message: MessageEvent) {
    console.log('%c[union:websocket]', 'color: #257dd4', 'Message received', message)
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
