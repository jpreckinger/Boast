import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';

class GamePage extends Component {

    playGameClick = () => {
        this.props.history.push('/playgame')
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

