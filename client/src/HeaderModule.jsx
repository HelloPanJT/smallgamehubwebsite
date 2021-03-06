import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import Auth from './Auth'

class HeaderModule extends React.Component {
  toMyfavorite = (event) => {
    event.preventDefault();
    this.context.router.replace('/myfavorite');
  }

  toDiscover = (event) => {
    event.preventDefault();
    this.context.router.replace('/main');
  }

  logOut = (event) => {
    event.preventDefault();
    Auth.deauthenticateUser();
    this.context.router.replace('/');
  }

  render () {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup firstChild={true} float="left">
            <ToolbarTitle style={{marginLeft: 20}} text="Games" />
            <ToolbarSeparator />
            <RaisedButton style={{marginLeft: 20}} label="My game" primary={true} onTouchTap={this.toMyfavorite} />
            <RaisedButton style={{marginLeft: 20}} label="Discover" primary={true} onTouchTap={this.toDiscover} />
          </ToolbarGroup>
          <ToolbarGroup lastChild={true} float="right">
            <FlatButton
              label={this.props.username}
              secondary={true}
              icon={<ActionAndroid />}
              />
            <RaisedButton label="Log Out" primary={true} onTouchTap={this.logOut} />
          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
}

HeaderModule.contextTypes = {
  router: PropTypes.object.isRequired
};

export default HeaderModule;
