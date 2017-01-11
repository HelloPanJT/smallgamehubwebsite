import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Star from 'material-ui/svg-icons/toggle/star';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import request from 'superagent';
import {yellow500} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import ChipInput from 'material-ui-chip-input';
import {Cell} from 'react-mdl';
import Toggle from 'material-ui/Toggle';
import {List, ListItem} from 'material-ui/List';
import Chips from './Chips';
import EditGame from './EditGame';

class GameCard extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      likeCount: 0,
    };
  }
  
  componentDidMount() {
    this.setState({likeCount: this.props.likeCount});
  }

  openModal = () => {
    this.setState({
      modalOpen: true
    })
  }
  
  closeModal = () => {
    this.setState({
      modalOpen: false
    })
  }
  
  like = () => {
    var self = this;
    request
      .post('/api/like')
      .send({username: 'panjintian',
             url: self.props.urlLink,
             likeCount: self.props.likeCount})
      .set('Accept', 'application/json')
      .end(function(err, res){
        if (res.body.success) {
          self.setState({likeCount: res.body.likeCount});
        }
      })
  }

  render () {
    var chips = [];
    return (
      <Cell col={3}>
        <Card>
          <CardMedia
            overlay={<CardTitle title={this.props.gameName} />}>
            <img style={{height: 300}} src={this.props.imageurl} alt="image not found"/>
          </CardMedia>
          <CardText>
            Liked By {this.state.likeCount} Users
          </CardText>
          <Chips tags={this.props.tags}/>
          <CardActions>
            {this.props.isMyDeveloped && <FlatButton
              label="Delete"
              onTouchTap={this.props.delete}
              primary={true}
            />}
            {this.props.isMyDeveloped && <FlatButton
              label="Edit Tag"
              onTouchTap={this.openModal}
              primary={true}
            />}
            {this.props.isDiscover && <FlatButton
              label= "like"
              onTouchTap={this.like}
              primary={true}
            />}
            <a href={this.props.urlLink} target="_blank">play</a>
          </CardActions>
        </Card>
        <EditGame  
          username={this.props.username}
          needUpdate={this.props.needUpdate}
          modalOpen={this.state.modalOpen}
          modalClose={this.closeModal}
          isEdit={true}
          url={this.props.urlLink}
          needUpdate={this.props.needUpdate}
          id={this.props.id}
          closeModal={this.closeModal}
          tagSource={this.props.tagSource}
        />
      </Cell>
    );
  }
}

export default GameCard;
