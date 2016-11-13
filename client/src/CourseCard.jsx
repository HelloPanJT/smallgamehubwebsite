import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CourseCard extends React.Component {
  render () {
    return (
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
          {this.props.description}
        </CardText>
        <CardActions>
          <FlatButton
            label="Delete"
            onTouchTap={this.props.delete}
            />
        </CardActions>
      </Card>
    );
  }
}

export default CourseCard;
