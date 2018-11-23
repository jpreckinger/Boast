import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import FriendSearch from '../FriendSearch/FriendSearch';
import './InstancePage.css';
import ActivePlayers from '../ActivePlayers/ActivePlayers';

class InstancePage extends Component {

    startGameClick = () => {
        this.props.history.push('/results');
    }

    render() {
        return (
            <div className="instancePage">   
                <button onClick={this.startGameClick}>Start Game</button>
                {this.props.prepareInstance.map( (game, index) => (
                    <div key={index} id="instanceCard">
                        <InstanceCard game={game} />
                    </div>
                ))}
                <div id="addPlayers">
                    <FriendSearch />
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
const mapStateToProps = ({prepareInstance}) => ({prepareInstance});

export default connect(mapStateToProps)(InstancePage);

