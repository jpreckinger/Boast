import { takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* createInstance(action) {
    try{
        yield call(axios.post, '/instance',  action.payload);
    }
    catch (error) {
        console.log('error adding new instance');
    }
}

function* createNewInstanceSaga() {
    yield takeLatest('CREATE_NEW_INSTANCE', createInstance);
  }

  export default createNewInstanceSaga;