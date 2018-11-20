import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';

class UserPage extends Component {

    newGameClick = () => {
        this.props.history.push('/addgame')
    }

    render() {
        return (
          <div>
            <div>
              <h1 id="welcome">
                Hello, { this.props.state.user.username }!
              </h1>
            </div>
            <div id="playThis">
              <button onClick={this.newGameClick}>Start New Game</button>
            </div>
          </div>
        );
    }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
 state
});

export default connect(mapStateToProps)(UserPage);

