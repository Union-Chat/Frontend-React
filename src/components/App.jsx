import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoadingIndicator from './LoadingIndicator';

import './App.scss';

// Lazy fucks

// hello there
console.log('%c[Union]', 'color: #257dd4', `Hello there - Env: ${WEBPACK.NODE_ENV}-${WEBPACK.GIT_REVISION}`);

class App extends React.PureComponent {
  displayName = 'App';

  componentDidMount () {
    // @todo: authenticate and shit
  }

  render () {
    if (!this.props.fetched) {
      return <LoadingIndicator big/>;
    }

    return <div id='app'>
      <Switch>
        <Route exact path='/'>
          <span>memes tbh</span>
        </Route>
      </Switch>
    </div>;
  }
}

const mapStateToProps = (store) => ({
  localStorage: store.localStorage,
  fetched: store.user.fetched,
  loggedIn: store.user.loggedIn
});

const mapDispatchToProps = (dispatch) => ({});

export default App; // connect(mapStateToProps, mapDispatchToProps)(App);
