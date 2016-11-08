/* eslint no-unused-vars: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'

import Intro from './Intro'
import Buy from './Buy'
import Sell from './Sell'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Intro}/>
    <Route path="/buy" component={Buy}/>
    <Route path="/sell" component={Sell}/>
  </Router>
), document.getElementById('root'))
