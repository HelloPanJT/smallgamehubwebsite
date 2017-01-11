import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import ChipInput from 'material-ui-chip-input';
import request from 'superagent';
import {Grid, Cell} from 'react-mdl';

class Search extends React.Component {
  constructor() {
    super();
  }  
  render () {
    return (
      <Grid>
        <Cell col={4}></Cell>
        <Cell col={4}>
          <TextField
            style={{marginLeft: 20}}
            floatingLabelText="search by tag name"
            name="search"
            onChange={this.props.changeText}
            value={this.props.inputText}
          />
        </Cell> 
        <Cell col={4}/>
      </Grid>
    );
  }
}

export default Search;
