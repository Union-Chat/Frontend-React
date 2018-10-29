import { UnionStoreAPI } from '../store.interface'
import ChatWebSocket from '../../websocket/chat'
import { setToken, setWebSocket } from './appState'

export const fetchApiInfos = () => {
  return async (dispatch: any, getState: any) => {
    console.log('%c[union:API]', 'color: #257dd4', 'Retrieving API infos')
    const req = await fetch('/api/info')
    if (req.ok) {
      const data: UnionStoreAPI = await req.json()

      dispatch(setWebSocket(new ChatWebSocket(window.location.protocol.replace('http', 'ws') + '//' + window.location.hostname + ':' + data.websocket, dispatch, getState)))
      dispatch(setToken(localStorage.getItem('token')))
      dispatch(setApiInfos(data))
    } else {
      console.error('%c[union:API]', 'color: #257dd4', `Failed to load API infos (Status ${req.status})`)
    }
  }
}

export const setApiInfos = (infos: UnionStoreAPI) => ({
  type: 'API_INFO',
  infos
})
