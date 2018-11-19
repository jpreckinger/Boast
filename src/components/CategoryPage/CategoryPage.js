import React, { Component } from 'react';
import {connect} from 'react-redux';

class CategoryPage extends Component {

    playGameClick = () => {
        this.props.history.push('/playgame')
    }

    viewGameClick = () => {
        this.props.history.push('/gamepage')
    }

    render() {
        return (
            <div>
                <button onClick={this.playGameClick}>Play This</button>
                <button onClick={this.viewGameClick}>Check this out</button>
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

export default connect(mapStateToProps)(CategoryPage);

