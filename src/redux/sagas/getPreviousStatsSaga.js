import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* getStats(action) {
    console.log('in previous saga');
    let previousStats = [];
    try{
        const firstResponse = yield call(axios.get, `/previous/${action.payload}`);
        console.log('response of previous', firstResponse.data);
        for(let instance_id of firstResponse.data){
            previousStats = [...previousStats, {  stats:
                 yield call(axios.get, `/previous/stats/${instance_id.id}`)}];
        }
        yield console.log('response of previous', previousStats);
    }
    catch (error) {
        console.log('error getting 3');
    }
}

function* getPreviousStatsSaga() {
    yield takeLatest('GET_PREVIOUS_STATS', getStats);
  }

  export default getPreviousStatsSaga;