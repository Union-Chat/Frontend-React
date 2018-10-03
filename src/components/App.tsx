import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, Switch, Route as ReactRoute } from 'react-router'
import UnionStore from '../store/store.i'

import AsyncComponent from './AsyncComponent'
import Loader from './Loader'
import Route from './Route'

const Login = () => import('./routes/Login')

import './App.scss'

const App = ({ token, api }) => {
  if (!api) return <Loader/>

  return <Switch>
    <ReactRoute path='/' render={() => <Redirect to={token ? '/servers' : '/login'}/>} exact/>
    <Route path='/login' component={() => <AsyncComponent moduleProvider={Login}/>} allowed={!token} exact/>
  </Switch>
}

export default hot(module)(
  connect((store: UnionStore) => ({
    token: store.appState.token,
    api: store.api
  }))(App as any)
)
