import React, { Component } from 'react';
import {connect} from 'react-redux';
import Input from '@material-ui/core/Input';
import AddGameCards from '../AddGameCards/AddGameCards';

class AddGame extends Component {

    state = {
        query: '',
    }

    //dispatches action to add new game from BGG API into user's existing games
    //this also sets the current user as a player for the existing game
    //additionally, this moves the user to the next page where
    //they can initiate a play instance
    addGameClick = (game) => {
        this.props.history.push('/playgame');
        this.props.dispatch({type: 'ADD_NEW_GAME', payload: game});
        this.props.dispatch({type: 'SET_USER_PLAYER', payload: this.props.reduxState.user});
    }//end click handler

    //handles sending the API request to the server, and thereby to the API
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type: 'FETCH_GAMES', payload: this.state.query})
    };//end submit

    //handles changing state to update on change within the search bar.
    handleChange = (event) => {
        this.setState({
            query: event.target.value
        })
    };//end changr handler


    render() {
        return (
        <div>

            <div>
                <form onSubmit={this.handleSubmit}>
                    <Input onChange={this.handleChange} type="search" 
                    placeholder="Search for games" value={this.state.query}/>
                </form>
            </div>
            <div className="gameList">
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

const mapStateToProps = reduxState => ({reduxState});

export default connect(mapStateToProps)(AddGame);

