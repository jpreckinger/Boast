import { takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* setInstance(action) {
    try{
        yield call(axios.post, '/instance',  action.payload.game);
        const response = yield call (axios.get, '/instance');
        console.log(response);
        yield call(axios.post, '/stats', { players: action.payload.players, instance: response.data});
    }
    catch (error) {
        console.log('error adding user to instance');
    }
}

function* startInstanceSaga() {
    yield takeLatest('SET_INSTANCE', setInstance);
  }

  export default startInstanceSaga;