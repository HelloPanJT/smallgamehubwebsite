import React from 'react';
import TextField from 'material-ui/TextField';
import {Grid, Cell} from 'react-mdl';

class Search extends React.Component {
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
