import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { UnionStoreMember, UnionStoreMessage, UnionStoreOrganizedMessages } from '../../store/store.interface'
import { hot } from 'react-hot-loader'

interface IProps {
  members: UnionStoreMember[]
  messages: UnionStoreMessage[]
}

class Messages extends React.Component<IProps> {

  render () {
    const messages: UnionStoreOrganizedMessages[] = []
    this.props.messages.forEach(message => {
      if (messages.length !== 0 && messages[messages.length - 1].author.name === message.author) {
        messages[messages.length - 1].messages.unshift(message)
      } else {
        messages.push({
          id: 'block-' + message.id,
          author: this.props.members.filter(member => member.name === message.author)[0],
          messages: [message]
        })
      }
    })

    return <div className='server-chat-messages'>
      <Scrollbars>
        {messages.reverse().map(messages => <div className='server-chat-message' key={messages.id}>
          <img className='server-chat-message-avatar' src={require('../../img/default_avatar.png')}/>
          <div className='server-chat-message-contents'>
            <div className='server-chat-message-meta'>
              <span>{messages.author.name}</span>
              <span>{this.formatDate(new Date(messages.messages[0].createdAt))}</span>
            </div>
            {messages.messages.map(message => <div className='server-chat-message-contents' key={message.id}>
              {message.content}
            </div>)}
          </div>
        </div>)}
      </Scrollbars>
    </div>
  }

  formatDate (d) {
    if (new Date().getDate() === d.getDate()) {
      return `Today at ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    } else {
      return `${d.getDate().toString().padStart(2, '0')}/${d.getMonth().toString().padStart(2, '0')}/${d.getFullYear()}`
    }
  }

}

export default hot(module)(Messages as any)
