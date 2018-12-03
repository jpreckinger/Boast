import { takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

//this saga takes an incoming string, searches for categories by that name,
//and returns all categories found.
//if a category by the name exists, it adds the current game to that category.
//if not, it first creates the category, then adds the game to it.
function* handleCategory(action) {
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