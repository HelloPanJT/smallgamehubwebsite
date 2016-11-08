import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Intro extends Component {
  constructor() {
    super();
    this.state = { message: '' }
  }

  componentDidMount() {
    var self = this;
    request
     .get('/intro')
     .set('Accept', 'application/json')
     .end(function(err, res) {
       if (err || !res.ok) {
         console.log('Oh no! error', err);
       } else {
         self.setState({message: res.body.message});
       }
     });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <Row>
                <span style={headFont}>Buy and sell your cars</span>
              </Row>
              <Row>
                <Button bsSize="large">Buy</Button>
                <Button bsSize="large">Sell</Button>
              </Row>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

var headFont = {
  fontSize: 50,
}

export default Intro;
