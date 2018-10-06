import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { hot } from 'react-hot-loader'

import Parser from './formatter'
import { UnionStoreMember, UnionStoreMessage, UnionStoreOrganizedMessages } from '../../store/store.interface'

interface IProps {
  ackServerMessages: () => void
  unread: boolean
  members: UnionStoreMember[]
  messages: UnionStoreMessage[]
}

class Messages extends React.Component<IProps> {

  scrollbarRef: React.RefObject<Scrollbars> = React.createRef()

  componentDidMount () {
    this.scrollbarRef.current.scrollToBottom()
    this.props.ackServerMessages()
  }

  componentDidUpdate (prevProps: IProps) {
    if (!this.props.messages.equal(prevProps.messages)) {
      if (this.scrollbarRef.current.getScrollHeight() - this.scrollbarRef.current.getScrollTop() - this.scrollbarRef.current.getClientHeight() < 40) {
        this.scrollbarRef.current.scrollToBottom()
        this.props.ackServerMessages()
      }
    }
  }

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
      <Scrollbars ref={this.scrollbarRef} onScroll={() => this.ackOnScroll()}>
        {messages.reverse().map(messages => <div className='server-chat-message' key={messages.id}>
          <img className='server-chat-message-avatar' src={require('../../img/default_avatar.png')}/>
          <div className='server-chat-message-contents'>
            <div className='server-chat-message-meta'>
              <span>{messages.author.name}</span>
              <span>{this.formatDate(new Date(messages.messages[0].createdAt))}</span>
            </div>
            {messages.messages.map(message =>
              <div className='server-chat-message-contents' key={message.id}
                   dangerouslySetInnerHTML={{ __html: Parser.parseMarkdown(message.content) }}/>)}
          </div>
        </div>)}
      </Scrollbars>
    </div>
  }

  ackOnScroll () {
    if (this.props.unread) {
      if (this.scrollbarRef.current.getScrollHeight() - this.scrollbarRef.current.getScrollTop() - this.scrollbarRef.current.getClientHeight() < 10) {
        this.props.ackServerMessages()
      }
    }
  }

  formatDate (d) {
    if (new Date().getDate() === d.getDate()) {
      return `Today at ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    } else {
      return `${d.getDate().toString().padStart(2, '0')}/${d.getMonth().toString().padStart(2, '0')}/${d.getFullYear()}`
    }
  }

}

export default hot(module)(Messages)
