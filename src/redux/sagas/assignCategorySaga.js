import { takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

function* handleCategory(action) {
    console.log('in assign cat', action.payload);
    try{
        const response = yield call(axios.get, `/category/check/${action.payload.category}` );
        if(response.data.length < 1){
            yield call(axios.post, '/category', {data: action.payload.category});
        }
        yield call(axios.put, `/category`, {category: action.payload.category, game: action.payload.game});
    }
    catch (error) {
        console.log('error handling categories');
    }
}

function* assignCategorySaga() {
    yield takeLatest('ASSIGN_CATEGORY', handleCategory);
  }

  export default assignCategorySaga;