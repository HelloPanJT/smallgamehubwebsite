import React from 'react';
import {Grid, Cell} from 'react-mdl';
import Chip from 'material-ui/Chip';
class Chips extends React.Component {
  render(){
    var chips=[];
    for (var i = 0; i < this.props.tags.length; i++) {
      chips.push(<Cell col={3}><Chip>{this.props.tags[i]}</Chip></Cell>);
    }
    return (
      <Grid>
        {chips}
      </Grid>
    )
  }
}

export default Chips;