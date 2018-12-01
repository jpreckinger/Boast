import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import NavBar from '../NavBar/NavBar';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import UserPage from '../UserPage/UserPage';
import AddGame from '../AddGame/AddGame';
import CustomGame from '../CustomGame/CustomGame';
import GamePage from '../GamePage/GamePage';
import InstancePage from '../InstancePage/InstancePage';
import ResultsPage from '../ResultsPage/ResultsPage';
import CategoryPage from '../CategoryPage/CategoryPage';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar history={this.props.history} />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <ProtectedRoute exact path="/home" component={UserPage} />
            <ProtectedRoute exact path="/addgame" component={AddGame} />
            <ProtectedRoute exact path="/customgame" component={CustomGame} />
            <ProtectedRoute exact path="/gamepage" component={GamePage} />
            <ProtectedRoute exact path="/playgame" component={InstancePage} />
            <ProtectedRoute exact path="/results" component={ResultsPage} />
            <ProtectedRoute exact path="/categories" component={CategoryPage} />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
