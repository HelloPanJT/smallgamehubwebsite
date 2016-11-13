import React from 'react'
import request from 'superagent';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

var floatingButtonStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
}

class AddCourse extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {
        url: '',
        description: '',
      },
      modalOpen: false,
    };
  }

  modalOpen = () => {
    this.setState({modalOpen: true});
  };

  modalClose = () => {
    this.setState({modalOpen: false});
  };

  changeText = (event) => {
    const field = event.target.name;
    const content = this.state.content;
    content[field] = event.target.value;
    this.setState({
      content
    });
  };

  addCourse = (event) => {
    request
     .post('/api/addcourse')
     .send({
       data: this.state.content,
       username: this.props.username,
     })
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
        console.log('res:', res);
      }
    });
    this.modalClose();
  };

  render () {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.modalClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.addCourse}
      />,
    ];

    return (
      <div>
        <FloatingActionButton
          style={floatingButtonStyle}
          onTouchTap={this.modalOpen}
          >
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title="Add The Course You like"
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.modalClose}
          >
          <div className="field-line">
            <TextField
              floatingLabelText="Input the url"
              name="url"
              onChange={this.changeText}
              value={this.state.content.url}
              />
          </div>
          <div className="field-line">
            <TextField
              floatingLabelText="Input the description"
              name="description"
              onChange={this.changeText}
              value={this.state.content.description}
              />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default AddCourse;
