import React from 'react'
import { hot } from 'react-hot-loader'
import { Redirect, withRouter } from 'react-router'
import Loader from '../Loader'
import UnionSvg from '../UnionSvg'
import { Link } from 'react-router-dom'

interface IProps {
  location: {
    pathname: string
  }
}

interface IState {
  joined: boolean
  code: string
}

class Invite extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      joined: false,
      code: /\/i\/([a-z0-9\-_]+)/gi.exec(props.location.pathname)[1]
    }
  }

  async componentDidMount () {
    await fetch('/api/invites/' + this.state.code, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + localStorage.getItem('token')
      }
    })
    this.setState({ joined: true })
  }

  render () {
    return <div className='invite'>
      {this.state.joined && <Redirect to='/servers'/>}
      <Loader/>
    </div>
  }

}

export default hot(module)(withRouter(Invite as any))
