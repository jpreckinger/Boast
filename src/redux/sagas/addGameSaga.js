import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* addNewGame(action) {
    console.log('payload', action.payload);
    try{
        yield call(axios.post, '/myGames', {data: action.payload} );
        const response = yield call(axios.get, `/myGames/${action.payload.name}`);
        yield call(axios.post, '/instance',  response.data[0]);
        yield put({ type: 'FETCH_CURRENT_GAME'});
    }
    catch (error) {
        console.log('error adding new game');
    }
}

function* addGamesSaga() {
    yield takeLatest('ADD_NEW_GAME', addNewGame);
  }

  export default addGamesSaga;