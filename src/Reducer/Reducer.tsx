import { SET_CURRENT_TASK, 
  ADD_CATEGORY, 
  SET_CURRENT_CATEGORY,
  SET_CATEGORY_LIST, 
  ADD_NEW_TASK, GETTING_ERROR,
  UPDATE_TASK, GET_CATEGORY ,
  GETTING_REFRESH } from '../Actions/Action'

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
  isShowSteps: false,
  errorMessage:""
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
        isShowSteps:false
      }
    }
    case SET_CURRENT_CATEGORY: {
      if (!action.isShowSteps) {
        state.isShowSteps = false;
      }
      return {...state, 
        currentCategory:action.currentCategory,
        isprocessed:!state.isprocessed,
        isShowSteps: state.isShowSteps
      }
    }
    case GET_CATEGORY: {
      return {...state,
        isprocessed:!state.isprocessed
      };
    }
    case SET_CURRENT_TASK: {
      return {...state, 
        currentTask:action.currentTask,
        isprocessed:!state.isprocessed,
        isShowSteps: true
      }
    }
    case ADD_NEW_TASK: {
      return{
        ...state,
        isprocessed:!state.isprocessed
      }
    }
    case UPDATE_TASK: {
      return {
        ...state,
        isprocessed:!state.isprocessed,
      }
    }
    case GETTING_ERROR: {
      return{
        ...state,
        errorOccured:true,
        errorMessage: action.errorMessage
      }
    }
    case GETTING_REFRESH: {
      return {
        ...state,
        errorOccured:false,
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;