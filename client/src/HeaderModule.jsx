import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class HeaderModule extends React.Component {
  constructor() {
    super();
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <ToolbarTitle text="Courses" />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
            <RaisedButton label="Create Broadcast" primary={true} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default HeaderModule;
