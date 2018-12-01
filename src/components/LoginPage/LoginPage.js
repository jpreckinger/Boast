import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

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

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(LoginPage);
