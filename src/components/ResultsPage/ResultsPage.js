import React, { Component } from 'react';
import {connect} from 'react-redux';

class ResultsPage extends Component {

    saveResultsClick = () => {
        this.props.history.push('/gamepage')
    }

    render() {
        return (
            <div>
                <button onClick={this.saveResultsClick}>Save Results</button>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ResultsPage);

import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import FriendSearch from '../FriendSearch/FriendSearch';
import './InstancePage.css';
import ActivePlayers from '../ActivePlayers/ActivePlayers';

class InstancePage extends Component {

    

    saveResultsClick = () => {
        this.props.history.push('/gamepage')
    }

    render() {
        return (
            <div className="instancePage">   
                {this.props.state.prepareInstance.map( (game, index) => (
                    <div key={index} id="instanceCard">
                        <InstanceCard game={game} />
                    </div>
                ))}
                <div id="addPlayers">
                    <button onClick={this.saveResultsClick}>Start Game</button>
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



