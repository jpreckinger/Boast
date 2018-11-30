import React, { Component } from 'react';
import {connect} from 'react-redux';
import AddGameCards from '../AddGameCards/AddGameCards';
import axios from 'axios';
import CategoryChart from '../DataChart/CategoryChart';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';



class CategoryPage extends Component {

    state = {
        games: [],
        categories: [],
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
        axios.get('/category/list')
        .then((response) => {
            this.setState({
                categories: response.data
            })
        })
        .catch(() => {
            console.log('error getting categories');
        })
        this.props.dispatch({type: 'GET_CATEGORY_DATA', payload: 1})
    }

    getRequestedGames = (event) => {
        axios.get(`/category/all/${event.target.value}`)
        .then((response) => {
            this.setState({
                games: response.data
            })
        })
        .catch(() => {
            console.log('error getting all games');
        })
        this.props.dispatch({type: 'GET_CATEGORY_DATA', payload: event.target.value})
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
                <div>
                    <InputLabel htmlFor="cat">Category</InputLabel>
                    <Select onChange={this.getRequestedGames} value="category" id="cat">
                        {this.state.categories.map( category => (
                            <option key={category.id} value={category.id}>
                                {category.category_name}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className="gameList">
                    <CategoryChart />
                    {this.state.games.map( game => (
                        <div key={game.id} onClick={() => this.displayGameClick(game)} id="gameCard">
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

