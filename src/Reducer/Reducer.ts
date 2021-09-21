import { SET_CURRENT_TASK, 
  ADD_CATEGORY, 
  SET_CURRENT_CATEGORY, 
  UPDATE_CATEGORY, 
  SET_CATEGORY_LIST, 
  ADD_NEW_TASK, 
  UPDATE_TASK } from '../Actions/Action'
const axios = require('axios')

const initialState = {
  category:[{}],
  currentCategory:{
    "name":"Tasks",
    "icon": "fas fa-home leftlist-icon",
    "isClicked":true,
    "tasks":[]
  },
  currentTask:{},
  isprocessed : false,
  isShowSteps: false
}

//update the category object
let updateCategory = (value:any) => {
  axios.put('http://192.168.29.254:3400/category/' + value._id,value).then((data:any) => {
    return data;
  }) 
}

// add new category to db
let addNewCategory = (value:any) => {
  return axios.post('http://192.168.29.254:3400/category/',value).then((data:any) => {
    return data.data
  })
}

//create a new task for category
let createNewTask = (newTask:any) => {
  axios.post('http://192.168.29.254:3400/tasks/',newTask).then((data:any) => {
    return data;
  })
}

//update a task value
let updateATask = (task:any) => {
  axios.patch('http://192.168.29.254:3400/tasks/' + task._id, task).then((data:any) => {
    return data;
  })
}

//reducer for redux do category crud operation
const reducer = (state = initialState, action:any) => {
  switch(action.type) {
    case SET_CATEGORY_LIST: {
      return {
        ...state,
        category: action.categoryList
      }
    }
    case ADD_CATEGORY: {
      return {...state, 
        isprocessed:!state.isprocessed,
        isShowSteps:false,
        currentCategory : action.value
      }
    }
    case SET_CURRENT_CATEGORY: {
      return {...state, currentCategory:action.currentCategory,
        isprocessed:!state.isprocessed,
        isShowSteps: false 
      }
    }
    case UPDATE_CATEGORY: {
      updateCategory(state.currentCategory);
      return {...state,
        isprocessed:!state.isprocessed 
      };
    }
    case SET_CURRENT_TASK: {
      return {...state, currentTask:action.currentTask,
        isprocessed:!state.isprocessed,
        isShowSteps: true
      }
    }
    case ADD_NEW_TASK: {
      createNewTask(action.value);
      return{
        ...state,
        currentCategory:state.currentCategory,
        isprocessed:!state.isprocessed,
      }
    }
    case UPDATE_TASK: {
      updateATask(action.value);
      return {
        ...state,
        isprocessed:!state.isprocessed
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;