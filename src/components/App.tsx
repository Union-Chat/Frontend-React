import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, Switch, Route as ReactRoute, withRouter } from 'react-router'
import UnionStore, { UnionStoreAPI } from '../store/store.interface'

import AsyncComponent from './AsyncComponent'
import Loader from './Loader'
import Route from './Route'

const Login = () => import('./Login')
const Home = () => import('./Union')

import './App.scss'

interface IProps {
  token: string
  api: UnionStoreAPI
}

class App extends React.Component<IProps> {

  render () {
    if (!this.props.api) return <Loader/>

    return <Switch>
      <ReactRoute path='/' render={() => <Redirect to={this.props.token ? '/servers' : '/login'}/>} exact/>
      <Route path='/login' component={() => <AsyncComponent moduleProvider={Login}/>} allowed={!this.props.token}/>
      <Route path='/servers' component={() => <AsyncComponent moduleProvider={Home}/>} allowed={this.props.token}/>
    </Switch>
  }
}

export default hot(module)(
  withRouter(connect((store: UnionStore) => ({
    token: store.appState.token,
    api: store.api
  }))(App as any) as any)
)
