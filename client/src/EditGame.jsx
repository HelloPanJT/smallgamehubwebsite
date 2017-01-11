import React from 'react'
import request from 'superagent';

import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ChipInput from 'material-ui-chip-input';


class EditGame extends React.Component {
  constructor() {
    super();
    this.state = {
      content: {
        url: '',
        imageUrl: '',
        gameName: '',
      },
      tags: {},
      tagSource: [],
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
  
  addGame = (event) => {
    var self = this;
    request
     .post('/api/addGame')
     .send({
       content: this.state.content,
       username: this.props.username,
       tags: Object.keys(this.state.tags),
       likeCount: 0
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
          self.props.modalClose();
          setTimeout(() => {
            self.props.needUpdate();
          }, 400);
        }
      }
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
  };
  
  edit = () => {
    var self=this;
    var url = this.props.url;
    request
      .post('/api/edit')
      .send({url: url,
             tags: self.state.tags,
             gameName: self.state.content.gameName})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          console.log('error happened in edit')
        } else {
          self.props.modalClose();
          self.props.needUpdate();
        }
      });
  }

  render () {
    var title=this.props.isAdd? "Add your developed game" : "Edit your game";
    var action=this.props.isEdit? this.edit:this.addGame;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.modalClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={action}
      />,
    ];
    return (
      <div>
        <Dialog
          title= {title}
          actions={actions}
          modal={false}
          open={this.props.modalOpen}
          onRequestClose={this.modalClose}
        >
         {this.props.isAdd && 
           <div className="field-line">
             <TextField
               floatingLabelText="Input the game url"
               name="url"
               onChange={this.changeText}
               value={this.state.content.url}
               errorText={this.state.error}
             />
           </div>
          }

          {this.props.isAdd && 
            <div className="field-line">
              <TextField
                floatingLabelText="Input the game image url"
                name="imageUrl"
                onChange={this.changeText}
                value={this.state.content.imageUrl}
              />
            </div>
          }

          <div className="field-line">
            <ChipInput
              value={Object.keys(this.state.tags)}
              floatingLabelText="choose game type"
              onRequestAdd={(chip) => this.addTag(chip)}
              dataSource={this.props.tagSource}
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
      </div>
    );
  }
}

export default EditGame;
