import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentGame(action) {
    try{
        const response = yield call(axios.get, '/myGames/current')
        yield put({ type: 'DISPLAY_CURRENT_GAME', payload: response.data[0]});
        yield put({type: 'GET_PREVIOUS_STATS', payload: response.data[0].id});
    }
    catch (error) {
        console.log('error retrieving game');
    }
}

function* displayCurrentGameSaga() {
    yield takeLatest('FETCH_CURRENT_GAME', fetchCurrentGame);
  }

  export default displayCurrentGameSaga;