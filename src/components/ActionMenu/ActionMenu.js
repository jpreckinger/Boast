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
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import Mail from '@material-ui/icons/Mail';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AttachMoney from '@material-ui/icons/AttachMoney';
import Paper from '@material-ui/core/Paper';




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

class NestedList extends React.Component {
  state = {
    open: false,
    requestOpen: false,
    search: [],
    query: '',
    requests: []
  };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
     };

    handleRequestClick = () => {
        this.setState(state => ({ requestOpen: !state.requestOpen}))
    };

    handleChange = (event) => {
        if(event.target.value){
            axios.get(`/friends/${event.target.value}`)
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

     sendRequest = (user) => {
         this.setState({ search: [], query: ''});
         axios.post('/friends', {data: user.id})
         .then(() => {
            alert(`Friend request sent to ${user.username}!`)
         })
         .catch(()=> {
             alert('Oops, something went wrong. Try again later.')
         })
     }

    componentDidMount(){
        this.getRequests();
    }

    getRequests = () => {
        axios.get('/friends/requests')
        .then((response) => {
            this.setState({requests: response.data})
        })
        .catch((error) => {
            alert('error getting friend requests');
        })
    }

    handleRequest = (user) => {
        confirmAlert({
            title:`Friend request from: ${user.username}`,
            message: 'Do want to accept this request?',
            buttons: [
                {
                    label: 'Accept',
                    onClick: () => this.acceptRequest(user),
                },
                {
                    label: 'Decline',
                    onClick: () => this.declineRequest(user)
                },
                {
                    label: 'Decide Later'
                }
            ]
        })
    };

    acceptRequest = (user) => {
        axios.put(`/friends/${user.id}`)
        .then(() => {
            axios.post('/friends/requests', {data: user.id})
            .then(() => {
                alert(`You are now friends with ${user.username}!`);
            })
            .catch(() => {
                alert(`Something went wrong, please try again later.`);
            })
            this.getRequests();
        })  
        .catch(() => {
            alert(`Something went wrong, please try again later.`)
        })
    };

    declineRequest = (user) => {
        axios.delete(`/friends/${user.id}`)
        .then(() => {
            alert(`You will not be connected with ${user.username}.`);
            this.getRequests();
        })
        .catch(() => {
            alert(`Something went wrong, please try again later`)
        })
    }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
       <Paper>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Actions</ListSubheader>}
        >
          <ListItem button>
            <ListItemIcon>
              <AttachMoney />
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
                    <ListItem button key={user.username} onClick={() => this.sendRequest(user)}>
                        <ListItemIcon><AddCircle/></ListItemIcon>
                        <ListItemText inset primary={user.username}/>
                    </ListItem>
                  ))}
            </List>
          </Collapse>
          <ListItem button onClick={this.handleRequestClick}>
            <ListItemIcon>
                <Mail/>
            </ListItemIcon>
            <ListItemText inset primary="Friend Requests" />
            {this.state.requestOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.requestOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {this.state.requests.map( user => (
                    <ListItem button key={user.username} onClick={() => this.handleRequest(user)}>
                        <ListItemIcon><AddCircle/></ListItemIcon>
                        <ListItemIcon><RemoveCircle/></ListItemIcon>
                        <ListItemText inset primary={user.username}/>
                    </ListItem>
                ))}
            </List>
          </Collapse>
        </List>
       </Paper>
      </div>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({liveSearchFriends}) => ({liveSearchFriends});

export default withStyles(styles)(connect(mapStateToProps)(NestedList));