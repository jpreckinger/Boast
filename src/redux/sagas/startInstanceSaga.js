import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* setInstance(action) {
    try{
        yield call(axios.post, '/instance',  action.payload.game);
        const response = yield call (axios.get, '/instance');
        console.log(response);
        for(let player of action.payload.players){
            yield call(axios.post, '/stats', { players: player, instance: response.data});
        }
        yield put({type: 'STORE_INSTANCE_ID', payload: response.data[0]})
    }
    catch (error) {
        console.log('error adding user to instance');
    }
}

function* startInstanceSaga() {
    yield takeLatest('SET_INSTANCE', setInstance);
  }

  export default startInstanceSaga;