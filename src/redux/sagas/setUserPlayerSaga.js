import { takeLatest, put } from 'redux-saga/effects';

function* addUserToGame(action) {
    console.log('in set user');
    try{
        yield put({ type: 'RESET_PLAYERS'})
        yield put({ type: 'SET_PLAYERS', payload: action.payload})
    }
    catch (error) {
        console.log('error adding user to instance');
    }
}

function* playCurrentUserSaga() {
    yield takeLatest('SET_USER_PLAYER', addUserToGame);
  }

  export default playCurrentUserSaga;