import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* getCategoryData(action) {
    console.log('in get data', action.payload);
    try{
        const response = yield call(axios.get, `/stats/category/${action.payload}` );
        yield put({type: 'SET_DATA', payload: response.data[0]})
    }
    catch (error) {
        console.log('error getting data');
    }
}

function* getGameData(action) {
    try{
        const response = yield call(axios.get, `/stats/game/${action.payload}`);
        yield put({type: 'SET_DATA', payload: response.data[0]})
    }
    catch (error) {
        console.log('error getting game data');
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
    yield takeLatest('GET_CATEGORY_DATA', getCategoryData);
    yield takeLatest('GET_ALL_DATA', getAllData);
    yield takeLatest('GET_GAME_DATA', getGameData);
  }

  export default dataVisSaga;