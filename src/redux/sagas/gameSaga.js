import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* addNewGame(action) {
    console.log('payload', action.payload);
    try{
        yield call(axios.post, '/myGames', {data: action.payload} );
        const response = yield call(axios.get, `/myGames/${action.payload.name}`);
        yield put({type: 'CREATE_NEW_INSTANCE', payload: response.data[0]});
        yield put({type: 'FETCH_CURRENT_GAME'});
    }
    catch (error) {
        console.log('error adding new game');
    }
};

function* fetchCurrentGame() {
    try{
        const response = yield call(axios.get, '/myGames/current')
        yield put({type: 'DISPLAY_CURRENT_GAME', payload: response.data[0]});
        yield put({type: 'GET_PREVIOUS_STATS', payload: response.data[0].id});
    }
    catch (error) {
        console.log('error retrieving game');
    }
};

function* getStats(action) {
        let notes = [];
        let users = [];
        let scores = [];
        let allScores = [];
        let allUsers = [];
    try{
        const firstResponse = yield call(axios.get, `/previous/${action.payload}`);
        for(let instance_id of firstResponse.data){
            let noteLine = yield call(axios.get, `/previous/notes/${instance_id.id}`);
            let statLine = yield call(axios.get, `/previous/stats/${instance_id.id}`);
            for( let each of statLine.data ) {
                users = [...users, each.username];
                scores = [...scores, each.score];
            };
            notes =  [...notes, noteLine.data[0]];
            allScores = [...allScores, scores];
            allUsers = [...allUsers, users];
            scores = [];
            users = [];
        };
        // yield put({type: 'GET_GAME_DATA', payload: action.payload}); 
        yield put({type: 'SET_PREVIOUS_STATS', payload: {
            notes: notes,
            users: allUsers,
            scores: allScores
        }});
               
    }
    catch (error) {
        console.log('error getting 3');
    }
};

function* selectGame(action) {
    console.log('payload', action.payload);
    try{
        const response = yield call(axios.get, `/existingGames/${action.payload.id}`);
        yield put({type: 'DISPLAY_CURRENT_GAME', payload: response.data[0]});
        yield put({type: 'GET_GAME_DATA', payload: response.data[0].id});
        yield put({type: 'GET_PREVIOUS_STATS', payload: response.data[0].id});
    }
    catch (error) {
        console.log('error retrieving existing game');
    }
};

function* createInstance(action) {
    try{
        yield call(axios.post, '/instance',  action.payload);
    }
    catch (error) {
        console.log('error adding new instance');
    }
};

function* setInstance(action) {
    try{
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
};

function* addGamesSaga() {
    yield takeLatest('ADD_NEW_GAME', addNewGame);
    yield takeLatest('CREATE_NEW_INSTANCE', createInstance);
    yield takeLatest('SET_INSTANCE', setInstance);
    yield takeLatest('FETCH_CURRENT_GAME', fetchCurrentGame);
    yield takeLatest('GET_PREVIOUS_STATS', getStats);
    yield takeLatest('SELECT_GAME', selectGame);
  }

  export default addGamesSaga;