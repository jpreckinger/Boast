// import { takeLatest, call, put } from 'redux-saga/effects';
// import axios from 'axios';

// function* fetchFriends(action) {
//     try{
//         const response = yield call(axios.get, `/friends/instance/${action.payload}`);
//         yield put({ type: 'DISPLAY_FRIENDS', payload: response.data})
//     }
//     catch (error) {
//         console.log('error searching for friends');
//     }
// }

// function* friendsSearchSaga() {
//     yield takeLatest('SEARCH_FRIENDS', fetchFriends);
//   }

//   export default friendsSearchSaga;