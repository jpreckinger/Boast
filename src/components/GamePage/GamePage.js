import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';

class GamePage extends Component {

    playGameClick = () => {
        this.props.history.push('/playgame');
        this.props.dispatch({type: 'CREATE_NEW_INSTANCE', payload: this.props.state.prepareInstance})
    }

    componentDidMount() {
        this.props.dispatch({type: 'GET_PREVIOUS_STATS', payload: this.props.state.prepareInstance.id})
    }

    render() {
        return (
            <div className="fullPage">   
                <div id="instanceCard">
                    <InstanceCard />
                </div>
                <div>
                    <button onClick={this.playGameClick}>Play Now</button>
                </div>
                <div id="activePlayers">
                    <h2>Previous Results:</h2>
                    {this.props.state.previousStats.notes.map( (noteLine, index) => (
                        <div key={index}>
                            {/* <h2>{noteLine.date_played}</h2> */}
                           {this.props.state.previousStats.stats[index].map( (statLine, i ) => (
                               <div key={i}>
                                    <h3>{statLine.username}{statLine.score}{statLine.victory}</h3>
                               </div>
                           ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(GamePage);

