import React from 'react'
import Tooltip from 'rc-tooltip'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import { NavLink } from 'react-router-dom'

import UnionStore, { UnionStoreServer } from '../../store/store.interface'
import UnionSvg from '../UnionSvg'

interface IProps {
  maxServers: number
  servers: UnionStoreServer[]
}

interface IState {
  displayCreate: boolean
  listener: any
}

class Servers extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      displayCreate: false,
      listener: null
    }
  }

  render () {
    return <div className='union-servers'>
      {this.props.servers.map(server =>
        <NavLink to={'/servers/' + server.id} className='union-servers-server' key={server.id}
                 activeClassName='selected'>
          <Tooltip placement='right' overlay={server.name} mouseLeaveDelay={0}>
            <img src={server.icon} alt={server.name + ' icon'}/>
          </Tooltip>
        </NavLink>
      )}
      {this.props.servers.length < this.props.maxServers && <div className='union-servers-create'>
        {this.state.displayCreate ? <img src={require('../../img/add.svg')}/>
          : <Tooltip placement='right' overlay='Create a new server' mouseLeaveDelay={0}>
            <img src={require('../../img/add.svg')} onClick={() => this.popup()}/>
          </Tooltip>}
        {this.state.displayCreate && <div className='union-servers-create-select'>
          <div onClick={() => this.create()}>
            <img src={require('../../img/create.svg')}/>
            <span>Create a new server</span>
          </div>
          <div onClick={() => this.join()}>
            <img src={require('../../img/invite.svg')}/>
            <span>Join a server</span>
          </div>
        </div>}
      </div>}
      <div className='union-servers-logo'>
        <Tooltip placement='right' overlay='UnionChat v1.0.0' mouseLeaveDelay={0} mouseEnterDelay={2}>
          <div>
            <UnionSvg className='union-servers-logo' fill='#fff'/>
          </div>
        </Tooltip>
      </div>
    </div>
  }

  popup () {
    const listener = () => {
      document.body.removeEventListener('click', this.state.listener)
      setTimeout(() => this.setState({ listener: null, displayCreate: false }), 0)
    }
    document.body.addEventListener('click', listener)
    this.setState({ listener, displayCreate: true })
  }

  async create () {
    const serverName = prompt('Please enter server name')
    if (!serverName) return
    const iconUrl = prompt('Please enter server icon url', require('../../img/default_server.png'))

    await fetch('/api/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: serverName,
        iconUrl
      })
    })
  }

  async join () {
    let invite = prompt('Please enter invite code')
    if (!invite) return

    if (invite.includes('/i/')) invite = invite.split('/i/')[1]
    await fetch('/api/invites/' + invite, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
    })
  }
}

const mapStateToProps = (store: UnionStore) => ({
  maxServers: store.api.app_settings.max_servers,
  servers: store.servers
})

export default hot(module)(connect(mapStateToProps)(Servers as any))
