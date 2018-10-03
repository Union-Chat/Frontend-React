import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import createStore from './store'
import AsyncComponent from './components/AsyncComponent'

import './favicon.png'

const App = () => import('./components/App')

render(
  <BrowserRouter>
    <Provider store={createStore()}>
      <AsyncComponent moduleProvider={App}/>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#react-root')
)
