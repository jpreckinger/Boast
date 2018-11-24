import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {connect} from 'react-redux';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import './EnterScores.css';
import axios from 'axios';




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

class EnterScores extends React.Component { 

    state = {
        user: this.props.user,
        winner: false, 
        score: ''
    }

    handleChange = () => {
        this.setState ({
            winner: !this.state.winner
        })
    }

    setScore = (event) => {
        this.setState({score: event.target.value})
    }

    componentWillUnmount() {
        console.log(this.props.state.currentInstanceId.id);
        axios.put(`/stats/${this.props.state.currentInstanceId.id}`, this.state);    
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <div className="playerResults" key={this.props.user.username}>
                    <Input value={this.state.score} onChange={this.setScore}/>
                    <ListItem>
                        <ListItemText inset primary={this.props.user.username}/>
                    </ListItem>
                    <Switch value="checked" onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}

EnterScores.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({state});

export default withStyles(styles)(connect(mapStateToProps)(EnterScores));