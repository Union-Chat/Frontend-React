import React from 'react'
import { hot } from 'react-hot-loader'
import { UnionStoreServer } from '../../store/store.interface'
import Tooltip from 'rc-tooltip'
import Loader from '../Loader'
import { deleteServer } from '../../store/actions/servers'

interface IProps {
  userId: string
  connectionHealth: boolean
  server: UnionStoreServer
}

interface IState {
  invite?: string
  gettingInvite: boolean
}

class Header extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      gettingInvite: false
    }
  }

  render () {
    const owner = this.props.server.owner === this.props.userId
    return <div className='server-header'>
      <div className='server-header-name'>
        {this.props.server.name}
        {owner && <Tooltip placement='bottom' overlay="You're the server owner" mouseLeaveDelay={0}>
          <img src={require('../../img/star.svg')}/>
        </Tooltip>}
      </div>
      <div className='server-header-actions'>
        {this.state.gettingInvite ? <div className='server-header-actions-invite'>
            {this.state.invite ? [
              <span key={0}><b>Invite code</b>: {this.state.invite}</span>,
              <span key={1}><b>Link</b>: {window.location.origin}/i/{this.state.invite}</span>
            ] : <Loader/>}
          </div>
          : owner && <Tooltip placement='bottom' overlay='Invite someone' mouseLeaveDelay={0}>
          <img src={require('../../img/invite_someone.svg')} onClick={() => this.getInviteCode()}/>
        </Tooltip>}

        {owner && <Tooltip placement='bottom' overlay='Coming Soon!' mouseLeaveDelay={0}>
          <img src={require('../../img/settings.svg')}/>
        </Tooltip>}

        {owner ? <Tooltip placement='bottom' overlay='Delete the server' mouseLeaveDelay={0}>
          <img src={require('../../img/delete.svg')} onClick={() => this.deleteServer()}/>
        </Tooltip> : <Tooltip placement='bottom' overlay='Leave the server' mouseLeaveDelay={0}>
          <img src={require('../../img/leave.svg')} onClick={() => this.leave()}/>
        </Tooltip>}

        {!this.props.connectionHealth &&
        <Tooltip placement='bottom' overlay='Connection with Union lost' mouseLeaveDelay={0}>
          <img src={require('../../img/disconnected.svg')} style={{ cursor: 'initial' }}/>
        </Tooltip>}
      </div>
    </div>
  }

  async getInviteCode () {
    this.setState({ gettingInvite: true })
    const req = await fetch('/api/v2/servers/' + this.props.server.id + '/invites', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
    })
    if (req.status === 200) {
      this.setState({ invite: (await req.json()).code })
    }
  }

  async leave () {
    if (confirm('Are you sure? You\'ll not be able to re-join the server unless you\'re invited')) {
      await fetch('/api/v2/servers/' + this.props.server.id + '/leave', {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + localStorage.getItem('token')
        }
      })
    }
  }

  async deleteServer () {
    if (confirm('Are you sure? This action is irreversible')) {
      await fetch('/api/v2/servers/' + this.props.server.id, {
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + localStorage.getItem('token')
        }
      })
    }
  }
}

export default hot(module)(Header as any)
