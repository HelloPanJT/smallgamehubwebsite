import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';


class LoginFormModule extends React.Component {
  render () {
    return (
      <Card className="container">
        <form action="/" onSubmit={this.props.onSubmit}>
          <h2 className="card-heading">Login</h2>
          <div className="field-line">
            <TextField
              floatingLabelText="Name"
              name="name"
              errorText={this.props.errors}
              onChange={this.props.onChange}
              value={this.props.user.name}
            />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Password"
              type="password"
              name="password"
              errorText={this.props.errors}
              onChange={this.props.onChange}
              value={this.props.user.password}
            />
          </div>
          <div className="button-line">
            <RaisedButton type="submit" label="Log in" primary />
          </div>
        </form>
      </Card>
    );
  }
}

export default LoginFormModule;
