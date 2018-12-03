import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import EnterScores from '../EnterScores/EnterScores';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

//this component is the results page, where the user enters the scores for
//for all active players and sets winers and losers.
//This component doesn't really do much, but it hosts the InstanceCard
//and EnterScores components, which do most of the heavy work here.

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
                <Button onClick={this.saveResultsClick} size="large" variant="contained">Save Results</Button>
                </div>
                <div id="activePlayers">
                    <div id="enterScores">
                        <h3>Input Scores</h3>
                        <h3>Players</h3>
                        <h3>Winner(s)</h3>
                    </div>
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

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(ResultsPage);



