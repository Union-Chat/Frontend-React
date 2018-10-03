import * as React from 'react'
import { Route, Redirect } from 'react-router'

export default (props) => {
  let Component = props.component as any
  let componentProps: { [key: string]: any } = {}
  Object.keys(props).forEach(prop => { if (prop !== 'component') componentProps[prop] = props[prop] })

  let component = () => props.allowed ? <Component {...componentProps} /> : <Redirect to='/'/>
  return <Route {...componentProps as any} component={component}/>
}
