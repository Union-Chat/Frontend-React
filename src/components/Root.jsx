import React from 'react';

import App from './App';
import Tooltip from 'rc-tooltip';

import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';

import store from '../store';

import '../tooltip.scss';
import '../hljs.scss';

// Patch Tooltip component
Tooltip.defaultProps = {
  ...Tooltip.defaultProps,
  mouseLeaveDelay: 0,
  prefixCls: 'tooltip',
  getTooltipContainer: () => document.querySelector('#tooltip-container')
};

export default class Root extends React.PureComponent {
  displayName = 'Root';

  constructor () {
    super();
    const history = createBrowserHistory({
      getUserConfirmation: this._getConfirmation.bind(this)
    });

    this.state = {
      history,
      store: store(history),
      confirmLeave: false,
      confirmCallback: null
    };
  }

  componentDidMount () {
    delete window.localStorage;
  }

  render () {
    return <Provider store={this.state.store}>
      <ConnectedRouter history={this.state.history}>
        <App/>
      </ConnectedRouter>
    </Provider>;
  }

  _getConfirmation (message, callback) {
    console.log('the fun begins');
    const allowTransition = window.confirm(message);
    callback(allowTransition);
  }
}
