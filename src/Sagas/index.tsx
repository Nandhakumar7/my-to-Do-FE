import { all } from 'redux-saga/effects';
import { CategoryFunctions } from './Category'
 
function* Rootsaga() {
  yield all([
    CategoryFunctions()
  ])
}

export default Rootsaga;