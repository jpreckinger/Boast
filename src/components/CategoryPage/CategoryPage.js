import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddGameCards from '../AddGameCards/AddGameCards';
import axios from 'axios';

class CategoryPage extends Component {

    state = {
        games: [],
    }

    componentDidMount() {
        axios.get(`/category/all/1`)
        .then((response) => {
            this.setState({
                games: response.data
            })
        })
        .catch(() => {
            console.log('error getting all games');
        })
    }

    getRequestedGames = () => {
        axios.get(`/category/all/${this.state.category}`)
        .then((response) => {
            this.setState({
                game: response.data
            })
        })
        .catch(() => {
            console.log('error getting all games');
        })
    }

    displayGameClick = (game) => {
        this.props.history.push('/gamepage');
        console.log('payload',game);
        this.props.dispatch({type: 'SELECT_GAME', payload: game});
        this.props.dispatch({type: 'SET_USER_PLAYER', payload: this.props.state.user});
    }

    render() {
        return (
            <div>
                <div className="gameList">
                    {this.state.games.map( game => (
                        <div key={game.id} onClick={() => this.displayGameClick(game)}>
                            <AddGameCards game={game} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(CategoryPage);

