/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Intro from './Intro'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Intro}/>
  </Router>
), document.getElementById('root'))
