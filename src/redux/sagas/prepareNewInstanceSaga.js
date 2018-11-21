import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentGame(action) {
    console.log('action Payload is ', action.payload);
    try{
        const response = yield call(axios.get, `/myGames/${action.payload.name}`);
        console.log('response is', response.data);
        yield put({ type: 'DISPLAY_CURRENT_GAME', payload: response.data});
    }
    catch (error) {
        console.log('error retrieving game');
    }
}

function* perpareNewInstanceSaga() {
    yield takeLatest('PREPARE_NEW_INSTANCE', fetchCurrentGame);
  }

  export default perpareNewInstanceSaga;