import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* selectGame(action) {
    console.log('payload', action.payload);
    try{
        const response = yield call(axios.get, `/existingGames/${action.payload.id}`);
        console.log('response.data', response);
        yield put({ type: 'DISPLAY_CURRENT_GAME', payload: response.data[0]});
        yield put({type: 'GET_PREVIOUS_STATS', payload: response.data[0].id});
    }
    catch (error) {
        console.log('error retrieving existing game');
    }
}

function* playExistingGameSaga() {
    yield takeLatest('SELECT_GAME', selectGame);
  }

  export default playExistingGameSaga;