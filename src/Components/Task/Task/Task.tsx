import React from 'react';
import './Task.css'
import {ADD_NEW_TASK, GET_CURRENT_TASK, UPDATE_TASK }  from '../../../Actions/Action';
import { connect } from 'react-redux';

class Task extends React.Component<{}, { isShowButton :boolean }> {
  constructor(props:any) {
    super(props);
    this.state = { isShowButton:false };
  }  

  showaddButton = (event:any) => {
    event.target.value == "" ?
      this.setState({isShowButton :false}) : this.setState({isShowButton :true})
  }

  render() {
    let prop:any = this.props;
    let blankLines = [];
    if(prop.currentCategory.tasks.length < 9) {
      let count = 9 - prop.currentCategory.tasks.length;
      for(let i = 0; i < count; i ++){
        blankLines.push(i);
      }
    }

    /**
     * add new task to the category object
     * @param event contains user input value
     */
    const addNewTask = async(event:any) => {
      if(event.key == "Enter") {
        let newTask = {
          "taskName": event.target.value,
          "steps":[],
          "isCompleted":false,
          "isImportant":false,
          "category_id":prop.currentCategory._id
        }
        prop.currentCategory.tasks.push(newTask);
        event.target.value = "";
        await prop.addNewTask(newTask);
      }
    }

    return (
      <div className={prop.isShowSteps ? "right-container right-container-width-change"
        : "right-container"}>
        <div className="right-head">
          <h1 className="head">{prop.currentCategory.name}</h1>
          <i className="fas fa-ellipsis-h leftlist-icon"></i>
          <div className="right-headicon">
            <i className="fas fa-arrows-alt-v"></i>
            Sort
          </div>
        </div>
        <div className="new-taskform">
          <i className={ this.state.isShowButton ? "far fa-circle lefthead-icon"
            : "fas fa-plus lefthead-icon"} id="form-icon"></i>
          <input className="text-box" type="text" placeholder="Add a task" 
            onKeyPress={addNewTask} onKeyUp={this.showaddButton} id="newTask"></input> 
          <h3 id="add-style" className={ this.state.isShowButton ? "add-style add-styleShow": "add-style"}> ADD</h3>
        </div>
        <ul className="list">{(prop.currentCategory.tasks).map((task:any) =>
          <li className="task-liststyle">
            <i className={task.isCompleted? "far fa-check-circle" : "far fa-circle"}
              onClick={() => prop.changeIsCompletedValue(task, prop.currentCategory._id)}></i>
            <div className={task.isCompleted ? "task-align complete" : "task-align"}
              onClick={() => prop.setCurrentTask(task, prop.currentCategory._id)}>{task.taskName}</div>
            <i className={task.isImportant ? "fas fa-star important" : "far fa-star important dark"}
              onClick={() => prop.changeIsImportantValue(task, prop.currentCategory._id)}></i>
          </li>)}
          {(blankLines).map((task:any) =>
          <li><div className="line-liststyle"></div></li>)}
        </ul>
      </div> 
    )}
  }

/**
 * get the action from conponent and dispatch to redux
 * to continue corresponding actions.
 * @param dispatch 
 * @returns actions
 */
const dispatchValue = (dispatch:any) => {
  return { 
    addNewTask: (newTask:any) => {
      dispatch({ 
        type:ADD_NEW_TASK,
        value:newTask
      })
    },
    changeIsCompletedValue: (task:any, categoryId:any) => {
      task.isCompleted = !task.isCompleted;
      dispatch({ 
        type:UPDATE_TASK,
        task:task,
        category_id: categoryId
      })
    },
    changeIsImportantValue: (task:any, categoryId:any) => {
      task.isImportant = !task.isImportant;
      dispatch({ 
        type:UPDATE_TASK,
        task:task,
        category_id: categoryId
      })
    },
    setCurrentTask: (task:any, categoryId:any) => {
      dispatch({ 
        type:GET_CURRENT_TASK,
        taskId:task._id,
        categoryId:categoryId
      })
    }
  }
}

/**
 * get the state value from redux store and
 * map the value into component props
 * @param state redux state value
 * @returns mapped prop
 */
const mapStateToProbs = (state:any) => {
  return {
    currentCategory: state.currentCategory,
    isProcessed : state.isprocessed,
    isShowSteps :state.isShowSteps
  }
}

export default connect(mapStateToProbs, dispatchValue)(Task);