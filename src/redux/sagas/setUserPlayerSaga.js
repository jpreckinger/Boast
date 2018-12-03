import { takeLatest, put } from 'redux-saga/effects';

//this function resets any existing players when a new game is selected,
//then adds the current user in as an active player
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