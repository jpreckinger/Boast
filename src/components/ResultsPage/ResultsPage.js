import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';
import EnterScores from '../EnterScores/EnterScores';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';


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

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(ResultsPage);



