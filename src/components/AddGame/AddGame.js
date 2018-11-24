import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import AddGameCards from '../AddGameCards/AddGameCards';
import './AddGame.css'

class AddGame extends Component {

    state = {
        query: '',
    }

    addGameClick = (game) => {
        this.props.history.push('/playgame');
        console.log('payload',game);
        this.props.dispatch({type: 'ADD_NEW_GAME', payload: game})
        this.props.dispatch({type: 'SET_USER_PLAYER', payload: this.props.reduxState.user})
    }

    customGameClick = () => {
        this.props.history.push('/customgame')
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted daddy');
        this.props.dispatch({type: 'FETCH_GAMES', payload: this.state.query})
    }

    handleChange = (event) => {
        this.setState({
            query: event.target.value
        })
    }


    render() {
        return (
        <div>
            <div>
                <button onClick={this.addGameClick}>Add Game</button>
                <button onClick={this.customGameClick}>Custom Game</button>
            </div>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input onChange={this.handleChange} type="search" 
                    placeholder="Search" value={this.state.query}/>
                </form>
            </div>
            <div id="gameList">
                {this.props.reduxState.displayGamesSearch.map( game => (
                    <div key={game.id} onClick={() => this.addGameClick(game)}>
                        <AddGameCards game={game}/>
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
const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(AddGame);

