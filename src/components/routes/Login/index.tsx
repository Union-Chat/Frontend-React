import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import UnionStore from '../../../store/store.interface'
import { login } from '../../../store/actions/appState'

import './style.scss'

interface IProps {
  login: (token: string) => void
  usernameMaxLength: number
}

interface IState {
  username: string
  password: string
}

class Login extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return <div className='login'>
      <h1 className='login-title'>Login to Union</h1>
      <div className='login-form'>
        <input type='text' name='username' value={this.state.username} maxLength={this.props.usernameMaxLength}
               onChange={(e) => this.setState({ username: e.target.value })}/>
        <input type='password' name='password' value={this.state.password}
               onChange={(e) => this.setState({ password: e.target.value })}/>
        <div className='login-form-buttons'>
          <button onClick={() => this.props.login(btoa(`${this.state.username}:${this.state.password}`))}>Login</button>
          <button onClick={() => this.register()}>Sign up</button>
        </div>
      </div>
    </div>
  }

  async register () {
    const req = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })

    // API behaviour is inconsistent here:
    // Partial JSON, 200 on failures etc
    // This part needs to be refactored when
    // server will be updated - @todo
    let body = await req.text()

    // Awful but working
    if (body.includes(':')) {
      body = JSON.parse(body).error
    }
    alert(body)
  }
}

const mapStateToProps = (store: UnionStore) => ({
  usernameMaxLength: store.api.app_settings.max_username_characters
})

const mapDispatchToProps = (dispatch: any) => ({
  login: (token: string) => dispatch(login(token))
})

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login as any))
