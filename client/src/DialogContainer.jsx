import React from 'react'
import request from 'superagent';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class DialogContainer extends React.Component{
  constructor() {
    super();
    this.state = {
      content: {
        url: '',
        imageUrl: '',
        gameName: '',
      },
      likeCount: 0,
      error: '',
    };
  }
  changeText = (event) => {
    const field = event.target.name;
    const content = this.state.content;
    content[field] = event.target.value;
    this.setState({
      content: content
    });
  };

  addTag = (chip) => {
    var chips = this.state.tags;
    chips[chip] = 1;
    this.setState({ tags: chips });
  };

  deleteTag = (chip) => {
    var chips = this.state.tags;
    delete chips[chip];
    this.setState({ tags: chips });
  }

  addGame = (event) => {
    var self = this;
    request
     .post('/api/addGame')
     .send({
       content: this.state.content,
       username: this.props.username,
       tags: Object.keys(this.state.tags),
       likeCount: this.state.likeCount
     })
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
        if (!res.body.success) {
          self.setState({error: res.body.message});
        } else {
          self.setState({error: ''});
          self.modalClose();
          setTimeout(() => {
            self.props.needUpdate();
          }, 400);
        }
      }
    });
  }

  render() {
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
        onTouchTap={this.addGame}
      />,
    ];
    return(
      <Dialog
        title="Add your favorite game!"
        actions={actions}
        modal={false}
        open={this.props.modalOpen}
        onRequestClose={this.modalClose}
      >
        <div className="field-line">
          <TextField
            floatingLabelText="Input the game url"
            name="url"
            onChange={this.changeText}
            value={this.state.content.url}
            errorText={this.state.error}
          />
        </div>
        <div className="field-line">
          <TextField
            floatingLabelText="Input the game image url"
            name="imageUrl"
            onChange={this.changeText}
            value={this.state.content.imageUrl}
           />
        </div>
        <div className="field-line">
          <ChipInput
            value={Object.keys(this.state.tags)}
            floatingLabelText="type game type"
            onRequestAdd={(chip) => this.addTag(chip)}
            dataSource={this.state.tagSource}
            onRequestDelete={(chip) => this.deleteTag(chip)}
          />
        </div>
        <div className="field-line">
          <TextField
            floatingLabelText="input game name"
            onChange={this.changeText}
            name="gameName"
            value={this.state.content.gameName}
            />
        </div>
      </Dialog>
    )
  }
 }