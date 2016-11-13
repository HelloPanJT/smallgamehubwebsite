/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Entry from './Entry'
import RootPage from './RootPage'
import Auth from './Auth';

injectTapEventPlugin();

const canAccess = (nextState, replace) => {
  if (!Auth.isUserAuthenticated()) {
    replace({ pathname: '/' })
  }
}

render((
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={browserHistory}>
      <Route path="/" component={Entry}/>
      <Route path="/main" component={RootPage} onEnter={canAccess} />
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'))
