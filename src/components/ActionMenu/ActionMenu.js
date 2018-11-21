import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Search from '@material-ui/icons/Search';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Input from '@material-ui/core/Input';
import {connect} from 'react-redux';
import axios from 'axios';
import './ActionMenu.css';

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

class NestedList extends React.Component {
  state = {
    open: true,
    search: [],
  };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
     };

    handleChange = (event) => {
        axios.get(`/friends/${event.target.value}`)
        .then((response) => {
            this.setState({search: response.data})
        })
        .catch((error) => {
            console.log('error searching for friends');
        })
     }

     sendRequest = (event) => {
         console.log(event.target.value);
     }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Actions</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Make Wager" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
                <SendIcon />
            </ListItemIcon>
            <ListItemText inset primary="Send Message" />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
                <PersonAdd />
            </ListItemIcon>
            <ListItemText inset primary="Add Friend" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Search />
                </ListItemIcon>
                    <Input onChange={this.handleChange} type="search" 
                    placeholder="Username" value={this.state.query}/>
                </ListItem>
                {this.state.search.map( user => (
                    <div className="liveSearch" key={user.username}>
                        <ListItem button onClick={this.sendRequest}>
                            {user.username}
                        </ListItem>
                    </div>
                  ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({liveSearchFriends}) => ({liveSearchFriends});

export default withStyles(styles)(connect(mapStateToProps)(NestedList));