import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import DataChart from '../DataChart/DataChart';
import Button from '@material-ui/core/Button';

class UserPage extends Component {

    componentDidMount() {
      this.props.dispatch({type: 'GET_ALL_DATA'})
    }

    newGameClick = () => {
        this.props.history.push('/addgame')
    }

    render() {
        return (
          <div >
            <div>
              <h1 id="welcome">
                Hello, { this.props.state.user.username }!
              </h1>
            </div>
            <div id="playThis">
              <Button onClick={this.newGameClick} size="large" variant="contained">Start New Game</Button>
            </div>
            <div id="frontChart">
              <DataChart />
            </div>
          </div>
        );
    }
}


const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(UserPage);

