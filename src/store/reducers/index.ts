import { combineReducers } from 'redux'
import servers from './servers'
import members from './members'
import messages from './messages'

export default combineReducers({ servers, members, messages })
