import React, { PropTypes } from 'react'
import request from 'superagent';
import Auth from './Auth';

import LoginFormModule from './LoginFormModule'

class LoginModule extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      errors: '',
      user: {
        name: '',
        password: ''
      }
    };

    this.changeText = this.changeText.bind(this);
    this.userLogin = this.userLogin.bind(this);
  }

  userLogin(event) {
    event.preventDefault();
    var self = this;
    request
     .post('/api/login')
     .send(this.state.user)
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
        console.log('res:', res.body);
        if (res.body.success) {
          self.setState({ errors: '' });
          Auth.authenticateUser(res.body.token);
          self.context.router.replace('/main');
        }
        else {
          self.setState({
             errors: res.body.message,
          });
        }
      }
    });
  }

  changeText(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
    });
  }

  render() {
    return (
      <LoginFormModule
        onSubmit={this.userLogin}
        onChange={this.changeText}
        errors={this.state.errors}
        user={this.state.user}
      />
    );
  }
}

LoginModule.contextTypes = {
  router: PropTypes.object.isRequired
};

export default LoginModule;
