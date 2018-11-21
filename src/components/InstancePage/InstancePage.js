import React, { Component } from 'react';
import {connect} from 'react-redux';
import InstanceCard from '../InstanceCard/InstanceCard';


class InstancePage extends Component {

    startGameClick = () => {
        // this.props.history.push('/results');
        console.log('reduxstate', this.props.reduxState.prepareInstance);
    }

    render() {
        return (
            <div>   
                <button onClick={this.startGameClick}>Start Game</button>
                {this.props.reduxState.prepareInstance.map( (game, index) => (
                    <div key={index}>
                        <InstanceCard game={game} />
                    </div>
                ))}
            </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(InstancePage);

