import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';

class GamePage extends Component {

    state = {
        previous: [],
    }

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
                    {this.state.previous.map( instance => (
                        <div>
                            
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({state});

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });


export default connect(mapStateToProps)(GamePage);

