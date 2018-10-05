import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { Redirect, withRouter } from 'react-router'
import UnionStore, { UnionStoreServer } from '../../store/store.interface'

import ServerHeader from '../Server/Header'
import ServerChat from '../Server/Chat'
import ServerMembers from '../Server/Members'

interface IProps {
  location: {
    pathname: string
  }
  servers: UnionStoreServer[]
  connectionHealth: boolean
  username: string
}

interface IState {
  server: number
}

class Server extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      server: parseInt(/\/servers\/([0-9]+)/.exec(this.props.location.pathname)[1])
    }
  }

  shouldComponentUpdate (nextProps: IProps) {
    if (this.props.username !== nextProps.username) return true
    if (this.props.connectionHealth !== nextProps.connectionHealth) return true
    const server = this.props.servers.filter(server => server.id === this.state.server)[0]
    const nextServer = nextProps.servers.filter(server => server.id === this.state.server)[0]
    return JSON.stringify(server) !== JSON.stringify(nextServer) // Only update if targeted server is updated
  }

  render () {
    const server = this.props.servers.filter(server => server.id === this.state.server)[0]
    if (!server) return <Redirect to='/servers'/>

    return <div className='server'>
      <div className='server-inner'>
        <ServerHeader server={server} username={this.props.username} connectionHealth={this.props.connectionHealth}/>
        <ServerChat server={server}/>
      </div>
      <ServerMembers serverMembers={server.members}/>
    </div>
  }

}

const mapStateToProps = (store: UnionStore) => ({
  servers: store.servers,
  connectionHealth: store.appState.connectionHealth,
  username: store.appState.username
})

export default hot(module)(
  withRouter(
    connect(mapStateToProps)(Server as any) as any
  )
)
