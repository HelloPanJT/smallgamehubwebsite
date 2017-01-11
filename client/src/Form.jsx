import React, {Component, PropTypes} from 'react'
import {Grid, Cell} from 'react-mdl'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import request from 'superagent'
import Auth from './Auth';
class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      username: '',
      password: '',
      nameError: '',
      passwordError: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleFBEvent = this.handleFBEvent.bind(this);
  };
  
  onChange(event) {
    const field = event.target.name;
    if (field === 'username') {
      this.setState({
        username: event.target.value
      })
    } else {
      this.setState({
        password: event.target.value
      })
    }
  }


  handleFBEvent(e) {
    e.preventDefault();
    var url = '';
    if (this.props.formName === 'Login') {
        url = '/api/login';
    } else {
        url = '/api/signup';
    }
    self = this;
    var userInfo = {username: this.state.username, password: this.state.password};
    request
      .post(url)
      .send(userInfo)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
            console.log('something error happen in server');
        } else if (res.body.success) {
            if (self.props.formName === 'Login') {
              Auth.authenticateUser(res.body.token, res.body.user.name);
              self.context.router.replace('/main');
            }
        } 
        self.setState({nameError: res.body.message.username,
                       passwordError: res.body.message.password});
    })
  }

  render() {
    return (
      <Grid>
        <Cell col={3}/>
        <Cell col={6}>
          <Card>
            <Grid>
              <Cell col={3}></Cell>
              <Cell col={6}>
                <form onSubmit={this.handleFBEvent}>
                  <h3 className="card-heading">{this.props.formName}</h3>
                  <div className="field-line">
                    <TextField
                      floatingLabelText="Name"
                      name="username"
                      errorText={this.state.nameError}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="field-line">
                    <TextField
                      floatingLabelText="Password"
                      type="password"
                      name="password"
                      errorText={this.state.passwordError}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="button-line">
                    <RaisedButton type="submit" label={this.props.formName} primary/>
                  </div>
                </form>
              </Cell>
              <Cell col={3}></Cell>
            </Grid>
          </Card>
        </Cell>
        <Cell col={3}/>
      </Grid>
    )
  }
}

Form.contextTypes = {
  router: PropTypes.object.isRequired
};
export default Form;