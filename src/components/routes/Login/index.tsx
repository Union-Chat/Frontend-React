import React from 'react'
import { hot } from 'react-hot-loader'

interface IState {
  username: string
  password: string
}

class Login extends React.Component<any, IState> {

  constructor (props: any) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return <div className='login'>
      login owo
    </div>
  }

}

export default hot(module)(Login)
