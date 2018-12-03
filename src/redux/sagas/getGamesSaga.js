import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

//this function hits the board game API that allows users to search 
//for and add board games to the DB
function* fetchGames(action) {
    try{
        const response = yield call(axios.post, '/api/games', {data: action.payload} );
        yield put({ type: 'DISPLAY_SEARCH', payload: response.data.newGame})
    }
    catch (error) {
        console.log('error searching api');
    }
}

function* getGamesSaga() {
    yield takeLatest('FETCH_GAMES', fetchGames);
  }

  export default getGamesSaga;