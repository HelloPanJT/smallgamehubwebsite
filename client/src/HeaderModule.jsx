import React from 'react';


import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import Search from './Search'


class HeaderModule extends React.Component {
  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <ToolbarTitle text="Courses" />
            <ToolbarSeparator />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
            User: {this.props.username}
            <RaisedButton label="Log Out" primary={true} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

export default HeaderModule;
