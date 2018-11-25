import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentGame(action) {
    console.log('action Payload is ', action.payload);
    try{
        const response = yield call(axios.get, '/myGames/current')
        yield put({ type: 'DISPLAY_CURRENT_GAME', payload: response.data[0]});
    }
    catch (error) {
        console.log('error retrieving game');
    }
}

function* displayCurrentGameSaga() {
    yield takeLatest('FETCH_CURRENT_GAME', fetchCurrentGame);
  }

  export default displayCurrentGameSaga;