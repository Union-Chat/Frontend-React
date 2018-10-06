import ChatWebSocket from '../../websocket/chat'
import UnionStore from '../store.interface'

export const setToken = (token: string) => {
  return async (dispatch: any, getState: () => UnionStore) => {
    const state = getState()
    if (token) {
      localStorage.setItem('token', token)
      state.appState.websocket.connect()
    } else {
      localStorage.removeItem('token')
      state.appState.websocket.disconnect()
    }
    dispatch(setLoginToken(token))
  }
}

// --

export const setLoginToken = (token: string) => ({
  type: 'AUTH_TOKEN',
  token
})

export const setConnectionHealth = (health: boolean) => ({
  type: 'CONNECTION_HEALTH',
  health
})

export const setWebSocket = (websocket: ChatWebSocket) => ({
  type: 'WS_OBJECT',
  websocket
})

export const setHello = (hello: boolean) => ({
  type: 'WS_HELLO',
  hello
})
