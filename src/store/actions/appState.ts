import ChatWebSocket from '../../websocket/chat'
import UnionStore, { UnionStoreMember } from '../store.interface'

export const setToken = (token: string) => {
  return async (dispatch: any, getState: () => UnionStore) => {
    const state = getState()
    if (token) {
      const req = await fetch('/api/v2/users/self', { headers: { Authorization: 'Basic ' + token } })
      if (req.ok) {
        localStorage.setItem('token', token)
        state.appState.websocket.connect()
        dispatch(setSelf(await req.json()))
        dispatch(setLoginToken(token))
      } else {
        dispatch(setLoginToken(null))
        console.error('%c[union:API]', 'color: #257dd4', `Failed to load user infos (Status ${req.status})`)
      }
    } else {
      localStorage.removeItem('token')
      dispatch(setLoginToken(null))
      state.appState.websocket.disconnect()
    }
  }
}

// --

export const setLoginToken = (token: string) => ({
  type: 'AUTH_TOKEN',
  token
})

export const setSelf = (self: UnionStoreMember) => ({
  type: 'SELF',
  self
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
