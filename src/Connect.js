import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
import "./Connect.css";

class ConnectForm extends Component {
  render() {
    return (
      <div className="connect-form">
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 180, height: 180 }}>
              <div className="loading-container">
                <div className="loading-top"></div>
                <div className="loading-bottom"></div>
              </div>
              <div className="loading-text">
                Connecting to Union...
              </div>
            </Grid.Column>
          </Grid>
      </div>
    )
  }
}

export default ConnectForm;