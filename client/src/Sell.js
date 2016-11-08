import React, { Component } from 'react';
import { Link } from 'react-router'
import request from 'superagent';
import { Button, Grid, Row, Col } from 'react-bootstrap';

class Sell extends React.Component {
  render () {
    return (
      <div>
        <Grid>
          <Row>
            <Col md={2}></Col>
            <Col md={8}>
              <Row>
                <span>sell your cars</span>
              </Row>
            </Col>
            <Col md={2}></Col>
          </Row>
        </Grid>
      </div>

    );
  }
}

export default Sell;
