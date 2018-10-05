import React from 'react'
import { Switch, withRouter } from 'react-router'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Route } from 'react-router-dom'

import AsyncComponent from '../AsyncComponent'
import ServerList from './ServerList'
import Loader from '../Loader'

import UnionStore from '../../store/store.interface'

const Server = () => import('./Server')

import './style.scss'

interface IProps {
  hello: boolean
  username: string
}

class Home extends React.Component<IProps> {

  render () {
    if (!this.props.hello) return <Loader/>

    return <div className='union'>
      <ServerList/>
      <div className='union-container'>
        <Switch>
          <Route path='/servers' render={() => this.renderNoServer()} exact/>
          <Route path='/servers/:id([0-9]+)' component={() => <AsyncComponent moduleProvider={Server}/>} exact/>
        </Switch>
      </div>
    </div>
  }

  renderNoServer () {
    return <div className='union-welcome'>
      <h1>Welcome to Union {this.props.username}!</h1>
      <div className='union-welcome-content'>
        Select a server, create a new fancy one or join some friends in the left sidebar
      </div>
      <a className='union-welcome-contribute' href='https://github.com/Union-Chat' target='_blank'>
        Help us improve Union on GitHub
      </a>
    </div>
  }
}

const mapStateToProps = (store: UnionStore) => ({
  username: store.appState.username,
  hello: store.appState.hello
})


export default hot(module)(
  withRouter(
    connect(
      mapStateToProps
    )(Home as any) as any
  )
)
