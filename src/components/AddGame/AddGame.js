import React, { Component } from 'react';
import {connect} from 'react-redux';

class AddGame extends Component {

    addGameClick = () => {
        this.props.history.push('/playgame')
    }

    customGameClick = () => {
        this.props.history.push('/customgame')
    }

    render() {
        return (
            <div>
            <button onClick={this.addGameClick}>Add Game</button>
            <button onClick={this.customGameClick}>Custom Game</button>
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

export default connect(mapStateToProps)(AddGame);

