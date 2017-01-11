import React from 'react';
import request from 'superagent';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import GameCard from './GameCard';
import EditGame from './EditGame';
import Auth from './Auth';
import {Grid} from 'react-mdl';

var floatingButtonStyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
}

class GameDisplay extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      username : Auth.getUserName(),
      modalOpen: false,
      tagSource: {}
    };
  }

   
  componentDidMount() {
    var self = this;
    this.getUserGames();
    request
      .post('/api/getAllTags')
      .send({})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
         console.log('Oh no! error', err);
        } else {
          var tags=[];
          res.body.map((ele) => {
            tags.push(ele.tag);
          })
          self.setState({tagSource: tags});
        }
      });
  }


  modalOpen = () => {
    this.setState({modalOpen: true});
  };

  modalClose = () => {
    this.setState({modalOpen: false});
  };
  


  getUserGames = () => {
    var self = this;
    request
     .post('/api/showList')
     .send({ username: this.state.username })
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
        var data = {};
        res.body.map((ele) =>
          data[ele._id] = ele
        );
        self.setState({ data: data });
      }
    });
  }



  needUpdate = () => {
    this.getUserGames();
  };

  delete(id, url) {
    request
      .post('/api/delete')
      .send({'url': url })
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) {
          console.log('Oh no! error', err);
        }
      });
    var data = this.state.data;
    delete data[id];
    this.setState({data: data});
  }
  

  render () {
    const data = this.state.data;
    var cards = Object.keys(data).map((key) =>
      <GameCard
        imageurl={data[key].content.imageUrl}
        likeCount={data[key].likeCount}
        urlLink={data[key].content.url}
        isMyDeveloped={this.props.isMyDeveloped}
        isDiscover={this.props.isDiscover}
        gameName={data[key].content.gameName}
        tags={data[key].tags}
        delete={this.delete.bind(this, key, data[key].content.url)}
        needUpdate={this.needUpdate}
        id={key}
        tagSource={this.state.tagSource}
      />
    );
    return (
      <div>
        <Grid>
          {cards}
        </Grid>
        <EditGame
          username={this.state.username}
          needUpdate={this.needUpdate.bind(this)}
          modalOpen={this.state.modalOpen}
          modalClose={this.modalClose}
          isAdd={true}
          tagSource={this.state.tagSource}
        />
        <FloatingActionButton
          style={floatingButtonStyle}
          onTouchTap={this.modalOpen}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }
}

export default GameDisplay;
