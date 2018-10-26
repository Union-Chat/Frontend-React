import React from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'
import Recaptcha from 'react-recaptcha'

import UnionStore from '../../store/store.interface'
import { setToken } from '../../store/actions/appState'

import './style.scss'

interface IProps {
  setToken: (token: string) => void
  usernameMaxLength: number
  recaptcha: { key: string, enabled: boolean }
}

interface IState {
  created: boolean
  error: string
  username: string
  password: string
  captcha: boolean
}

class Login extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      created: false,
      error: '',
      username: '',
      password: '',
      captcha: false
    }
  }

  render () {
    return <div className='login'>
      <h1 className='login-title'>Login to Union</h1>
      <div className='login-form'>
        <input type='text' name='username' value={this.state.username} maxLength={this.props.usernameMaxLength}
               onChange={(e) => this.setState({ username: e.target.value })} placeholder='Username'/>
        <input type='password' name='password' value={this.state.password} minLength={4}
               onChange={(e) => this.setState({ password: e.target.value })} placeholder='Password'/>

        {this.state.created && <div className='new'>Success! You can now login</div>}
        {this.state.error !== '' && <div className='error'>{this.state.error}</div>}

        {this.state.captcha && <Recaptcha sitekey={this.props.recaptcha.key} theme='dark' verifyCallback={(code) => this.register(code)}/>}
        {!this.state.captcha && <div className='login-form-buttons'>
          <button onClick={() => this.props.setToken(btoa(`${this.state.username}:${this.state.password}`))}>Login</button>
          <button onClick={() => this.captcha()}>Sign up</button>
        </div>}
      </div>
    </div>
  }

  async captcha () {
    if (this.props.recaptcha.enabled) {
      this.setState({ captcha: true })
    } else {
      await this.register()
    }
  }

  async register (code?: string) {
    const req = await fetch('/api/v2/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        'g-recaptcha-response': code
      })
    })

    let body = await req.json()
    if (req.status !== 200) {
      this.setState({ captcha: false, created: false, error: body.error })
    } else {
      this.setState({ captcha: false, created: true, username: body.id, error: '' })
    }
  }
}

const mapStateToProps = (store: UnionStore) => ({
  usernameMaxLength: store.api.appSettings.usernameCharacterLimit,
  recaptcha: store.api.recaptcha
})

const mapDispatchToProps = (dispatch: any) => ({
  setToken: (token: string) => dispatch(setToken(token))
})

export default hot(module)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login as any))
