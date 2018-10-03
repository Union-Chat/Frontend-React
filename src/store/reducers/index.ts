import { combineReducers } from 'redux'
import api from './api'
import appState from './app_state'
import servers from './servers'
import members from './members'
import messages from './messages'

export default combineReducers({ api, appState, servers, members, messages })
