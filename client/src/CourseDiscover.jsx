import React, { PropTypes } from 'react'
import request from 'superagent';

import CourseCard from './CourseCard';
import Auth from './Auth'

class CourseDiscover extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      username : Auth.getUserName(),
    };
  }

  componentDidMount() {
    var self = this;
    request
     .post('/api/getallcourses')
     .send({})
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
        self.setState({data: res.body});
      }
    });
  }

  render () {
    var cards = this.state.data.map((ele) =>
      <CourseCard
        id={ele.id}
        key={ele.id}
        courseName={ele.name}
        photoUrl={ele.photoUrl}
        url={ele.url}
        description={ele.description}
        bookmark={ele}
        username={this.state.username}
        marked={this.state.username in ele.username}
      />
    );
    return (
      <div>
        {cards}
      </div>
    );
  }
}

export default CourseDiscover;
