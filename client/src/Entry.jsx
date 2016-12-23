import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'
import Form from './Form'
class Entry extends Component {
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="login">
            <Form formName="Login" />
          </Tab>
          <Tab label="Sign Up" >
            <Form formName="Sign Up"/>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Entry;
