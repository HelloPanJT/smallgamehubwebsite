import React, {Component, PropTypes} from 'react'
import {Grid, Cell} from 'react-mdl'
import Card from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import request from 'superagent'
import Auth from './Auth';
import {Router} from 'react-router'
class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.state={
      user: {
        name: '',
        password: ''
      },
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.handleFBEvent = this.handleFBEvent.bind(this);
  }
  
  onChange(event) {
    const field = event.target.name;
    if (field == 'name') {
        this.setState({
          user: {
            name: event.target.value,
            password: this.state.user.password
          }
        })
    } else {
        this.setState({
          user: {
            name: this.state.user.name,
            password: event.target.value
          }
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
        request
      .post(url)
      .send(self.state.user)
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
        self.setState({errors:res.body.message});
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
                      name="name"
                      errorText={this.state.errors.name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="field-line">
                    <TextField
                      floatingLabelText="Password"
                      type="password"
                      name="password"
                      errorText={this.state.errors.password}
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