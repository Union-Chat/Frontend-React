import { UnionStoreAPI } from '../store.i'

export const fetchApiInfos = () => {
  return async (dispatch: any) => {
    console.log('%c[union:API]', 'color: #257dd4', 'Retrieving API infos')
    const req = await fetch('/api/info')
    if (req.ok) {
      dispatch(setApiInfos(await req.json()))
    } else {
      console.error('%c[union:API]', 'color: #257dd4', `Failed to load API infos (Status ${req.status})`)
    }
  }
}

// --

export const setApiInfos = (infos: UnionStoreAPI) => ({
  type: 'API_INFO',
  infos
})
