import React from 'react'
import request from 'superagent';

import GameCard from './GameCard';
import Auth from './Auth'
import Search from './Search'
import {Grid} from 'react-mdl';

class CourseDiscover extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      username : Auth.getUserName(),
    };
  }

  componentDidMount() {
    this.getGames('');
  }
  
  getGames = (keyWord) => {
    var route = '';
    var self = this;

    if (keyWord === '') {
      route = '/api/getTopGames'
    } else {
      route = '/api/search'
    }
    request
      .post(route)
      .send({tag: keyWord})
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err || !res.ok) {
          console.log('Oh no! error', err);
        } else {
         self.setState({data: res.body});
       }
     });
  }

  changeText = (event) => {
    this.getGames(event.target.value);
  };


  render () {
    var cards = this.state.data.map((ele) =>
      <GameCard
        imageurl={ele.content.imageUrl}
        likeCount={ele.likeCount}
        urlLink={ele.content.url}
        isMyDeveloped={this.props.isMyDeveloped}
        isDiscover={this.props.isDiscover}
        gameName={ele.content.gameName}
        tags={ele.tags}
      />
    );
    return (
      <div>
        <Search 
          changeText={this.changeText}
          inputText={this.state.inputText}
        />
        <Grid>
          {cards}
        </Grid>
      </div>
    );
  }
}

export default CourseDiscover;
