import * as React from 'react'
import Loader from './Loader'

interface IProps {
  moduleProvider: () => Promise<any>
  noLoader?: boolean
}

interface IState {
  Component: any
}

export default class AsyncComponent extends React.Component<IProps, IState> {

  constructor (props: IProps) {
    super(props)
    this.state = {
      Component: null
    }
  }

  async componentDidMount () {
    if (!this.state.Component) {
      this.setState({ Component: (await this.props.moduleProvider()).default })
    }
  }

  render () {
    const { Component } = this.state
    return Component ? <Component/> : (this.props.noLoader ? null : <Loader/>)
  }

}
