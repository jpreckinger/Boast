import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import FriendSearch from '../FriendSearch/FriendSearch';
import ActivePlayers from '../ActivePlayers/ActivePlayers';
import Button from '@material-ui/core/Button';

class InstancePage extends Component {

    componentDidMount() {
        if(this.props.state.setPlayers.length < 1){
            this.props.dispatch({type: 'SET_USER_PLAYER', payload: this.props.state.user})
        }
        console.log(this.props.state.setPlayers);
    }

    startGameClick = () => {
        this.props.dispatch({
            type: 'SET_INSTANCE',
            payload: {
                players: this.props.state.setPlayers
            }
        })
        this.props.history.push('/results');
    }

    render() {
        return (
            <div className="fullPage">   
                <div id="instanceCard">
                    <InstanceCard />
                </div>
                <div id="addPlayers">
                    <FriendSearch />
                    <div id="startButton">
                        <Button onClick={this.startGameClick} size="large" variant="contained">Start Game</Button>
                    </div>
                </div>
                <div id="activePlayers">
                    <h2>Active Players:</h2>
                    <ActivePlayers />
                </div>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(InstancePage);

