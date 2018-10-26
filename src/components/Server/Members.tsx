import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import Scrollbars from 'react-custom-scrollbars'

import UnionStore, { UnionStoreMember } from '../../store/store.interface'

const Members = ({ members, serverMembers }) => {
  console.log(members, serverMembers)
  return <div className='server-members'>
    <Scrollbars>
      {serverMembers.map((memberId: string) => members.filter(member => member.id === memberId)[0])
        .sort((a: UnionStoreMember, b: UnionStoreMember) => {
          if (!a.online && b.online) return 1
          if (a.online && !b.online) return -1
          return a.username > b.username ? 1 : -1
        })
        .map(member => <div className='server-members-item' key={member.id}>
          <img className={'server-members-item-name ' + (member.online ? 'online' : 'offline')}
               src={require('../../img/default_avatar.png')}/>
          <span className='server-members-item-name'>
            {member.username}<span className='server-members-item-discriminator'>#{member.discriminator}</span>
          </span>
        </div>)}
    </Scrollbars>
  </div>
}

const mapStateToProps = (store: UnionStore) => ({
  members: store.members
})

export default hot(module)(connect(mapStateToProps)(Members as any)) as any
