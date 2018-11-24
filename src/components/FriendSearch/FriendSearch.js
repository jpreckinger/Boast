import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Search from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import axios from 'axios';
import AddCircle from '@material-ui/icons/AddCircle';
import 'react-confirm-alert/src/react-confirm-alert.css';



//TODO: componentize this monstrous piece of garbage

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

class FriendSearch extends React.Component {
  state = {
    search: [],
    query: '',
  };

    handleChange = (event) => {
        if(event.target.value){
            axios.get(`/friends/instance/${event.target.value}`)
            .then((response) => {
                this.setState({search: response.data})
            })
            .catch((error) => {
                alert('error searching for friends');
            })
            this.setState({query: event.target.value})
        }
        this.setState({query: event.target.value, search: []})
    }

    addToInstance = (user) => {
        this.props.dispatch({type: 'SET_PLAYERS', payload: user});
        this.setState({
            search: [],
            query: ''
        })
    }
    

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List component="nav">
            <ListItem button className={classes.nested}>
            <ListItemIcon>
                <Search />
            </ListItemIcon>
                <Input onChange={this.handleChange} type="search" 
                placeholder="Add Players" value={this.state.query}/>
            </ListItem>
            {this.state.search.map( user => (
                <ListItem button key={user.username} onClick={() => this.addToInstance(user)}>
                    <ListItemIcon><AddCircle/></ListItemIcon>
                    <ListItemText inset primary={user.username}/>
                </ListItem>
            ))}
        </List>
      </div>
    );
  }
}

FriendSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(connect()(FriendSearch));