import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* getData(action) {
    console.log('in get data', action.payload);
    try{
        const response = yield call(axios.get, `/stats/category/${action.payload}` );
        yield put({type: 'SET_DATA', payload: response.data[0]})
    }
    catch (error) {
        console.log('error getting data');
    }
}

function* getAllData() {
    try{
        const response = yield call(axios.get, '/stats/all')
        yield put({type: 'SET_DATA', payload: response.data[0]})
    }
    catch (error) {
        console.log('error getting all data');
    }
}

function* dataVisSaga() {
    yield takeLatest('GET_DATA', getData);
    yield takeLatest('GET_ALL_DATA', getAllData)
  }

  export default dataVisSaga;