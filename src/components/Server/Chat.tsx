import React, { ChangeEvent, KeyboardEvent } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import Loader from '../Loader'

import UnionStore, {
  UnionStoreMember,
  UnionStoreServer
} from '../../store/store.interface'

import './style.scss'
import Messages from './Messages'
import { setToken } from '../../store/actions/appState'
import { ackServerMessage } from '../../store/actions/servers'

interface IProps {
  ackServerMessages: () => void
  server: UnionStoreServer
  messageLimit: number
  members: UnionStoreMember[]
}

interface IState {
  message: string
  sending: boolean
  textAreaHeight: number
}

class Chat extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      message: '',
      sending: false,
      textAreaHeight: 40
    }
  }

  componentDidMount () {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().catch()
    }
  }

  render () {
    return <div className='server-chat'>
      <Messages messages={this.props.server.messages} members={this.props.members}
                ackServerMessages={this.props.ackServerMessages}
                unread={this.props.server.lastRead !== (this.props.server.messages[0] ? this.props.server.messages[0].id : '')}/>

      <div className='server-chat-text'>
        {this.state.sending && <div className='server-chat-text-sending'>
          <Loader/><span>Sending message...</span>
        </div>}
        {/* Maybe file upload? */}
        <textarea placeholder={'Message ' + this.props.server.name} style={{ height: this.state.textAreaHeight }}
                  value={this.state.message} onChange={(e) => this.handleChange(e)} rows={1}
                  maxLength={this.props.messageLimit} onKeyPress={(e) => this.handleKey(e)}/>
        {/* Emoji menu coming soon */}
      </div>
    </div>
  }

  handleChange (e: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ message: e.target.value, textAreaHeight: e.target.value !== '' ? e.target.scrollHeight : 40 })
  }

  handleKey (e: KeyboardEvent) {
    if (e.charCode === 13 && !e.shiftKey) {
      e.preventDefault()
      setTimeout(async () => await this.sendMessage(), 0)
    }
  }

  async sendMessage () {
    if (this.state.message === '') return
    const content = this.state.message

    this.setState({ sending: true, message: '', textAreaHeight: 40 })
    const req = await fetch('/api/v2/servers/' + this.props.server.id + '/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        content
      })
    })
    if (req.status !== 204) {
      alert('An error occurred: ' + (await req.json()).error)
    }
    this.setState({ sending: false })
  }
}

const mapStateToProps = (store: UnionStore) => ({
  members: store.members,
  messageLimit: store.api.appSettings.messageCharacterLimit,
  servers: store.servers
})

const mapDispatchToProps = (dispatch: any, ownProps: IProps) => ({
  ackServerMessages: () => dispatch(ackServerMessage(ownProps.server.id))
})

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(Chat as any)) as any
