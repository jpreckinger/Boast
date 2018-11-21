import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* addNewGame(action) {
    console.log('payload', action.payload);
    try{
        yield call(axios.post, '/myGames', {data: action.payload} );
        yield put({ type: 'PREPARE_NEW_INSTANCE', payload: action.payload})
    }
    catch (error) {
        console.log('error adding new game');
    }
}

function* addGamesSaga() {
    yield takeLatest('ADD_NEW_GAME', addNewGame);
  }

  export default addGamesSaga;