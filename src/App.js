import React, { Component } from 'react';
import './App.css';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import LoginForm from './Login';
import ConnectForm from './Connect';
import ChatForm from './Chat';
import { setApp, connect } from './union.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: "login",
      token: ""
    };
  }

  componentDidMount() {
    setApp(this);

    var token = localStorage.getItem("token")
    this.setState({token: token});

    if (token) {
      connect();
      this.setState({screen: "connecting"});
    } else {
      this.setState({screen: "login"});
    }
  }

  render() {
    switch (this.state.screen) {
      case "login":
        return (
          <LoginForm app={this}/>
        );
      case "connecting":
        return (
          <ConnectForm app={this}/>
        );
      case "chat":
        return (
          <ChatForm app={this}/>
        );
      default:
        return (
          `[unknown state ${this.state.screen}]`
        );
    }
  }
}

export default App;
