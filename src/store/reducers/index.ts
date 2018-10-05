import { combineReducers } from 'redux'
import api from './api'
import appState from './appState'
import servers from './servers'
import members from './members'

export default combineReducers({ api, appState, servers, members })
