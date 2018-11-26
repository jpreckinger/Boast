import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* selectGame(action) {
    console.log('payload', action.payload);
    try{
        const response = yield call(axios.get, `/myGames/${action.payload.name}`);
        yield put({type: 'CREATE_NEW_INSTANCE', payload: response.data[0]});
        yield put({ type: 'FETCH_CURRENT_GAME'});
    }
    catch (error) {
        console.log('error retrieving existing game');
    }
}

function* playExistingGameSaga() {
    yield takeLatest('SELECT_GAME', selectGame);
  }

  export default playExistingGameSaga;