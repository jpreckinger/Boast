import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import EnterScores from '../EnterScores/EnterScores';
import List from '@material-ui/core/List';

class ResultsPage extends Component {

    

    saveResultsClick = () => {
        this.props.history.push('/gamepage');
    }

    render() {
        return (
            <div className="fullPage">   
                <div id="instanceCard">
                    <InstanceCard />
                </div>
                <div>
                    <button onClick={this.saveResultsClick}>Save Results</button>
                </div>
                <div id="activePlayers">
                    <h2>Active Players:</h2>
                    <List>
                        {this.props.state.setPlayers.map(player => (
                            <EnterScores key={player.id} user={player}/>
                        ))}
                    </List>
                </div>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(ResultsPage);



