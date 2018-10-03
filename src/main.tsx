import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import createStore from './store'
import App from './components/App'

import './favicon.png'

render(
  <BrowserRouter>
    <Provider store={createStore()}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.querySelector('#react-root')
)
