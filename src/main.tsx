import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import createStore from './store'
import { fetchApiInfos } from './store/actions/api'

import AsyncComponent from './components/AsyncComponent'
import Crash from './components/Crash'

import './favicon.png'

const App = () => import('./components/App')
const store = createStore()
;(store.dispatch as any)(fetchApiInfos())

render(
  <BrowserRouter>
    <Provider store={store}>
      <AsyncComponent moduleProvider={App}/>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#react-root')
)

let crashed = false
;(global as any).crashApp = (message: string, error: Error) => {
  // @todo: Report errors to sentry
  if (!crashed) {
    render(
      <Crash message={message} error={error}/>,
      document.querySelector('#crash-root')
    )
  }
}

