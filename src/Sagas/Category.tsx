import { takeEvery, call, put } from 'redux-saga/effects';
import { SET_CATEGORY_LIST, 
  GET_CATEGORY, 
  ADD_CATEGORY, 
  SET_CURRENT_TASK,
  ADD_NEW_TASK,
  SET_CURRENT_CATEGORY, 
  GET_CURRENT_CATEGORY, 
  SET_CURRENT_CATEGORY_TASKS,
  UPDATE_TASK,
  GETTING_ERROR,
  GET_CURRENT_TASK } from '../Actions/Action';
import Axios from 'axios';

// get all categoried list in db
const getCategory = async() => Axios.get<any>('http://192.168.29.254:3400/category')

/**
 * get all categories details and set into react store
 */
function* getCategoryList():any {
  try {
    const result:any = yield call(getCategory);
    yield put({ type: SET_CATEGORY_LIST, categoryList: result.data.data });
  } catch(error) {
    console.log("Error", error)
    console.log('Failed');
  }
} 

/**
 * get user details and create new category
 * @param action it contains user details to create new category
 */
function* addNewCategory(action:any):any {
    try {
      const result:any = yield (Axios.post('http://192.168.29.254:3400/Category/', action.value));
      yield put({ type: SET_CURRENT_CATEGORY, currentCategory: result.data, isShowSteps:false});
    } catch(error) {
      yield put({type:GETTING_ERROR, errorMessage:"getting Error while adding new Category"})
      console.log("Error", error)
      console.log('Failed');
    }
}

/**
 * get user clicked category details from db and
 * set as a currentCategory
 * @param action user clicked category details
 */
function* getCurrentCategory(action:any):any {
  try {
    const result:any = yield (Axios.get('http://192.168.29.254:3400/Category/' + action.categoryId));
    yield put({ type: SET_CURRENT_CATEGORY, currentCategory: result.data, isShowSteps:false});
  } catch(error) {
    yield put({type:GETTING_ERROR, errorMessage:"getting Error while fetching Category"})
    console.log("Error", error)
    console.log('Failed');
  }
}

/**
 * intially run amd tasks category as a currentcategory
 */
function* setCurrentCategoryAsTasks():any {
  try {
    const result:any = yield (Axios.get('http://192.168.29.254:3400/category?name=Tasks'));
    yield put({ type: SET_CURRENT_CATEGORY, currentCategory: result.data.data[5], isShowSteps:false});
  } catch(error) {
    yield put({type:GETTING_ERROR, errorMessage:"geeting Error while adding new Category"})
    console.log("Error", error)
    console.log('Failed');
  }
}

/**
 * get user task deatils and create new task in db and set in react store
 * @param action user input for create new task
 */
function* addNewTask(action:any):any {
  try {
    const result:any = yield (Axios.post('http://192.168.29.254:3400/tasks/', action.value));
    const categoryResult:any = yield (Axios.get('http://192.168.29.254:3400/Category/' + action.value.category_id));
    yield put({ type: SET_CURRENT_CATEGORY, currentCategory: categoryResult.data, isShowSteps:true});
  } catch(error) {
    yield put({type:GETTING_ERROR, errorMessage:"geeting Error while adding new Task"})
    console.log("Error", error)
    console.log('Failed');
  }
}

/**
 * get user action and update task details in db and set ubdated category and tasks.
 * @param action updated task details
 */
function* updateTaskDetails(action:any):any {
  try {
    const result:any = yield Axios.patch('http://192.168.29.254:3400/tasks/' + action.task._id, action.task);
    const categoryResult:any = yield (Axios.get('http://192.168.29.254:3400/Category/' + action.category_id));
    yield put({ type:SET_CURRENT_TASK, currentTask: result.data })
    yield put({ type: SET_CURRENT_CATEGORY, currentCategory: categoryResult.data, isShowSteps:true});
  } catch(error) {
    yield put({type:GETTING_ERROR, errorMessage:"getting Error while update new Task"})
    console.log("Error", error)
    console.log('Failed');
  }
} 

/**
 * get user clicked tasks id and seta as a current task
 * @param action user clicked tasks id
 */
function* getCurrentTask(action:any):any {
  try {
    const result:any = yield Axios.get('http://192.168.29.254:3400/tasks/' + action.taskId);
    const categoryResult:any = yield (Axios.get('http://192.168.29.254:3400/Category/' + action.categoryId));
    yield put({ type: SET_CURRENT_CATEGORY, currentCategory: categoryResult.data, isShowSteps:true });
    yield put({ type:SET_CURRENT_TASK, currentTask: result.data })
  } catch(error) {
    yield put({type:GETTING_ERROR, errorMessage:"getting Error while getting task"})
    console.log("Error", error)
    console.log('Failed');
  }
}


export const CategoryFunctions = function* () {
  yield takeEvery(GET_CATEGORY, getCategoryList);
  yield takeEvery(ADD_CATEGORY, addNewCategory);
  yield takeEvery(GET_CURRENT_CATEGORY, getCurrentCategory);
  yield takeEvery(SET_CURRENT_CATEGORY_TASKS, setCurrentCategoryAsTasks);
  yield takeEvery(ADD_NEW_TASK, addNewTask);
  yield takeEvery(UPDATE_TASK, updateTaskDetails);
  yield takeEvery(GET_CURRENT_TASK, getCurrentTask);
}