import React from 'react'
import Loader from '../../Loader'
import { hot } from 'react-hot-loader'
import ChatWebSocket from '../../../websocket/chat'
import UnionStore from '../../../store/store.interface'
import { connect } from 'react-redux'

interface IProps {
  port: number
  getDispatch: () => any
}

interface IState {
  socket: ChatWebSocket
}

class Home extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      socket: new ChatWebSocket('wss://' + window.location.hostname + ':' + props.port, props.getDispatch())
    }
  }

  componentDidMount () {
    this.state.socket.connect()
  }

  render () {
    return <Loader/>
  }

}

const mapStateToProps = (store: UnionStore) => ({
  port: store.api.websocket
})

const mapDispatchToProps = (dispatch: any) => ({
  getDispatch: () => dispatch
})

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home as any))
