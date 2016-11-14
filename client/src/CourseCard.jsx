import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import request from 'superagent';

class CourseCard extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {
        id: '',
        description: '',
      },
      modalOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      content: {
        id: this.props.id,
        description: this.props.description,
      },
    });
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

  updateInfo = (field, value) => {
    const content = this.state.content;
    content[field] = value;
    this.setState({
      content
    });
  };

  editCourse = (event) => {
    var self = this;
    request
     .post('/api/editcourse')
     .send(this.state.content)
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
        onTouchTap={this.editCourse}
      />,
    ];

    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.username}
            />
          <CardMedia
            overlay={<CardTitle title={this.props.courseName} />}
            >
            <img src={this.props.photoUrl} alt="mooc" />
          </CardMedia>
          <CardTitle title="User description:" />
          <CardText>
            {this.state.content.description}
          </CardText>
          <CardActions>
            {
              this.props.delete &&
              <FlatButton
                label="Delete"
                onTouchTap={this.props.delete}
                primary={true}
                />
            }
            {
              this.props.edit &&
              <FlatButton
                label="Edit"
                onTouchTap={this.modalOpen}
                primary={true}
              />
            }
            <a href={this.props.url}>More Info</a>
          </CardActions>
        </Card>
        <Dialog
          title="Edit your description"
          actions={actions}
          modal={false}
          open={this.state.modalOpen}
          onRequestClose={this.modalClose}
          >
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

export default CourseCard;
