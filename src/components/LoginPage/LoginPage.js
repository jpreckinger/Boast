import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//this component handles the user log in functionality

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };


  //dispatches the login action if the username and password fields are filled
  //or returns an error if they are incorrectly filled
  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  //handles the change of the input fields
  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    return (  
        <Paper>
          {this.props.errors.loginMessage && (
            <h2
              className="alert"
              role="alert"
            >
              {this.props.errors.loginMessage}
            </h2>
          )}
          <center>
          <form onSubmit={this.login} id="setCategory">
            <h1>Login</h1>
            <div>
                <Input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleInputChangeFor('username')}
                />
            </div>
            <div>
                <Input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.handleInputChangeFor('password')}
                />
            </div>
            <div>
              <Button
                size="large"
                id="loginB"
                type="submit"
                variant="contained"
                
              >Log In</Button>
            </div>
          </form>
          </center>
          <center>
            <Button
              id="loginB"
              size="large"
              color="secondary"
              variant="contained"
              onClick={() => {this.props.dispatch({type: 'SET_TO_REGISTER_MODE'})}}
            >
              Register
            </Button>
          </center>
        </Paper>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
