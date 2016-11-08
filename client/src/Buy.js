import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Buy extends React.Component {
  render () {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <Row>
                <span>Buy your cars</span>
              </Row>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Buy;
