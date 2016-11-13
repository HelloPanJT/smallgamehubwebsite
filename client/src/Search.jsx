import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Search extends React.Component {
  render () {
    return (
      <div>
        <TextField
          style={{marginLeft: 20}}
          name="search"
        />
        <RaisedButton label="Search" primary={true} />
      </div>
    );
  }
}

export default Search;
