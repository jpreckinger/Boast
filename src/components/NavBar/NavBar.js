import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import Home from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import './NavBar.css';
import Category from '@material-ui/icons/Category';
import ActionMenu from '../ActionMenu/ActionMenu';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Games from '@material-ui/icons/Games';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#b2102f',
    },
    secondary: {
      main: '#ffffff'
    }
  }
});

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class PrimarySearchAppBar extends React.Component {
  state = {
    anchorEl: null,
    anchorEl2: null,
    query: '',
    search: [],
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleActionMenuOpen = event => {
    if(this.props.state.user.id){
      this.setState({ anchorEl2: event.currentTarget });
    }
  }

  logOut = () => {
      this.props.dispatch({type: 'LOGOUT'});
      this.props.dispatch({type: 'RESET'});
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuClose2 = () => {
    this.setState({ anchorEl2: null})
  };

  searchGames = (event) => {
    console.log('in search games');
    if(event.target.value){
        axios.get(`/myGames/search/${event.target.value}`)
        .then((response) => {
            this.setState({search: response.data})
        })
        .catch((error) => {
            alert('error searching for games');
        })
        this.setState({query: event.target.value})
    }
    this.setState({query: event.target.value, search: []});
 };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const { anchorEl2 } = this.state;
    const isMenuOpen2 = Boolean(anchorEl2);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.logOut}>Logout</MenuItem>
      </Menu>
    );

    const renderMenu2 = (
      <Menu
        anchorEl={anchorEl2}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        open={isMenuOpen2}
        onClose={this.handleMenuClose2}
      >
        <ActionMenu />
      </Menu>
    );

    return (
      <div className={classes.root}>
        <MuiThemeProvider theme={theme}>
        <AppBar position="static" color='primary'>
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer"
            aria-owns={isMenuOpen2 ? 'material-appbar' : undefined}
            aria-haspopup="true"
            onClick={this.handleActionMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Boast
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                onChange={this.searchGames}
                placeholder="Search Games"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                  <Link className="nav-link" to="/home">
                    <Home />
                  </Link>
              </IconButton>
              <IconButton color="inherit">
                  <Link className="nav-link" to="/categories">
                    <Category />
                  </Link>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        </MuiThemeProvider> 
        <List>
          {this.state.search.map( (game, index) => (
            <div key={index}>
              <ListItem>
                <ListItemIcon>
                  <Games/>
                </ListItemIcon>
                <ListItemText>
                  {game.game_name}
                </ListItemText>
              </ListItem>
            </div>
          ))}
          </List>
        {renderMenu2}
        {renderMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({state});

export default withStyles(styles)(connect(mapStateToProps)(PrimarySearchAppBar));