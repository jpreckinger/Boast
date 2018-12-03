import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//these sagas handle getting data for the pie charts.
//they are called either for all the data on the user page,
//the category data, or the game data, depending on the view
//the user is currently on
//then they dispatch the data to the redux store to be displayed.

function* getCategoryData(action) {
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, `/stats/category/${action.payload}` );
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting data');
    }
}

function* getGameData(action) {
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, `/stats/game/${action.payload}`);
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting game data');
    }
}

function* getAllData() {
    let wins = [];
    let users = [];
    try{
        const response = yield call(axios.get, '/stats/all');
        for( let each of response.data ) {
            wins = [...wins, each.wins];
            users = [...users, each.username];
        }
        yield put({type: 'SET_DATA', payload: {wins: wins, users: users}});
    }
    catch (error) {
        console.log('error getting all data');
    }
}

function* dataVisSaga() {
    yield takeLatest('GET_CATEGORY_DATA', getCategoryData);
    yield takeLatest('GET_ALL_DATA', getAllData);
    yield takeLatest('GET_GAME_DATA', getGameData);
  }

  export default dataVisSaga;