import React, { Component } from "react";
import { handleLogin } from "./union.js";
import { bubbly } from "./background.js";
import "./App.css";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
var loginform = null;

class FadeOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  render() {
    return (
      <div className={this.state.visible ? "loading-overlay visible" : "loading-overlay"} ref="overlay"></div>
    )
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.app = props.app;
    this.loginbutton = React.createRef();
    this.overlay = React.createRef();
    this.username = "";
    this.password = "";
    loginform = this;
  }

  handleClick(e) {
    handleLogin(loginform);
  }

  componentDidMount() {
    window.requestAnimationFrame(() => bubbly({
      animate: true,
      blur: 16,
      bubbles: 100,
      canvas: this.refs.background,
      colorStart: "rgb(33, 133, 208)",
      colorStop: "#54c8ff",
      angleFunc: () => Math.random() * Math.PI * 2,
      velocityFunc: () => 0.1 + Math.random() * 0.5,
      radiusFunc: () => 20 + Math.random() * 25
    }));
  }

  render() {
    return (
      <div className="login-form">
        <canvas className="background" ref="background"></canvas>
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size="large">
              <Segment.Group>
                <Segment color="blue" inverted>
                  <Image size="small" centered src="/unionwhite.png" />
                  <Header as="h2" color="white" textAlign="center">
                    Login to Union
                  </Header>
                </Segment>
                <Segment>
                  <Form.Input
                    fluid
                    icon="user"
                    onChange={e => this.username = e.target.value}
                    iconPosition="left"
                    placeholder="Username"
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    onChange={e => this.password = e.target.value}
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                  />

                  <Button color="blue" fluid size="large" ref={this.loginbutton} onClick={this.handleClick}>
                    Login
                  </Button>
                </Segment>
              </Segment.Group>
            </Form>
            <Message>
              Do not have Union account yet? <a href="#">Sign up now!</a>
            </Message>
          </Grid.Column>
        </Grid>
        <FadeOverlay ref={this.overlay}/>
      </div>
    );
  }
}

export default LoginForm;
