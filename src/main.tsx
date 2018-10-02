import * as React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'

import './favicon.ico'

render(<BrowserRouter><App/></BrowserRouter>, document.querySelector('#react-root'))
