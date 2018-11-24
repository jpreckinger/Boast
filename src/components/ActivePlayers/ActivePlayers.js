import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';




const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class ActivePlayers extends React.Component { 

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
            {this.props.state.setPlayers.map( user => (
                <ListItem key={user.username} >
                    <ListItemText inset primary={user.username}/>
                </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

ActivePlayers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({state});

export default withStyles(styles)(connect(mapStateToProps)(ActivePlayers));