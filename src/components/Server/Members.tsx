import React from 'react'
import { hot } from 'react-hot-loader'
import Scrollbars from 'react-custom-scrollbars'

import UnionStore, { UnionStoreMember } from '../../store/store.interface'
import { connect } from 'react-redux'

const Members = ({ members, serverMembers }) => {
  return <div className='server-members'>
    <Scrollbars>
      {serverMembers.map((memberId: string) => members.filter(member => member.name === memberId)[0])
        .sort((a: UnionStoreMember, b: UnionStoreMember) => {
          if (!a.online && b.online) return 1
          if (a.online && !b.online) return -1
          return a.name > b.name ? 1 : -1
        })
        .map(member => <div className='server-members-item' key={member.name}>
          <img className={'server-members-item-name ' + (member.online ? 'online' : 'offline')}
               src={require('../../img/default_avatar.png')}/>
          <span className='server-members-item-name'>{member.name}</span>
        </div>)}
    </Scrollbars>
  </div>
}

const mapStateToProps = (store: UnionStore) => ({
  members: store.members
})

export default hot(module)(connect(mapStateToProps)(Members as any)) as any
