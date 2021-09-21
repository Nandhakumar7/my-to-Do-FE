import React from 'react';
import './Steps.css'
import {UPDATE_TASK}  from '../../Actions/Action';
import { connect } from 'react-redux';

class Step extends React.Component<{}, { isShowButton :boolean }> {
  constructor(props:any) {
    super(props);
    this.state = {
      isShowButton:false
    };
  } 
  
  showaddButton = (event:any) => {
    event.target.value == "" ?
      this.setState({isShowButton :false}) : this.setState({isShowButton :true})
  }

  render() {
    let prop:any = this.props;
    let stepsList;

    //if tasks have steps then return the listelement
    if(prop.currentTask.steps) {
      stepsList = (prop.currentTask.steps).map((step:any) =>
        <li className="subtask-liststyle">
          <i className="far fa-circle steps-icon blue"></i>
          <span className="line-liststyle">{step}</span>
          <hr className="list-lines"></hr>
        </li>)
    }

    /**
     * add new step to the task
     * @param event contains value for step
     */
    const addNewStep = (event:any) => {
      if(event.key == "Enter") {
        prop.currentTask.steps.push(event.target.value);
        event.target.value = "";
        prop.updateTaskSteps(prop.currentTask);
      }
    }

    return (
      <div className={prop.isShowSteps ? "subtask-container show" :"subtask-container"}>
        <div className="subtask-headdiv">
          <i className={prop.currentTask.isCompleted? "far fa-check-circle blue" : "far fa-circle lefthead-icon"}
            onClick={() => prop.changeIsCompletedValue(prop.currentTask)}></i>
          <h1 className={prop.currentTask.isCompleted? "subtask-head Completed" : "subtask-head dark"}>{prop.currentTask.taskName}</h1>
          <i className={prop.currentTask.isImportant ? "fas fa-star important blue" : "far fa-star important"}
            onClick={() => prop.changeIsImportantValue(prop.currentTask)}></i>
        </div>
        <div className="subtask-bottom">
          <ul className="fa-ul subtask-list">{stepsList}</ul>
          <div className="new-subtaskform">
            <i className="fas fa-plus lefthead-icon" id="forms-icon"></i>
            <input className="text-box" type="text" placeholder="Add step" 
              id="newsubTask" onKeyPress={addNewStep} onKeyUp={this.showaddButton}></input>
            <h3 className={this.state.isShowButton ?  "add-style add-styleShow":"add-style"}> ADD</h3>
          </div>
          <div className="add-myday">
            <i className="far fa-sun leftlist-icon"></i>
            Add to My Day
          </div>
          <div className="other-options">
            <ul className="fa-ul">
              <li><span className="fa-li"><i className="far fa-bell rightlist-icon"></i></span>Remind me</li>
              <hr className="line-style"></hr>
              <li><span className="fa-li"><i className="fas fa-calendar-alt rightlist-icon"></i></span>Add due date</li>
              <hr className="line-style"></hr>
              <li><span className="fa-li"><i className="fas fa-redo rightlist-icon"></i></span>Repeat</li>
            </ul>
          </div>
          <div className="add-myday">
            <i className="fas fa-location-arrow leftlist-icon"></i>
            Pick a Category
          </div>
          <div className="add-myday">
            <i className="fas fa-upload leftlist-icon"></i>
            Add file
          </div>
          <div className="add-note"></div>
        </div>
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
    updateTaskSteps: (task:any) => {
      dispatch({ 
        type:UPDATE_TASK,
        value:task
      })
    },
    changeIsCompletedValue: (task:any) => {
      task.isCompleted = !task.isCompleted;
      dispatch({ 
        type:UPDATE_TASK,
        value:task
      })
    },
    changeIsImportantValue: (task:any) => {
      task.isImportant = !task.isImportant;
      dispatch({ 
        type:UPDATE_TASK,
        value:task
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
    currentTask: state.currentTask,
    isProcessed : state.isprocessed,
    isShowSteps: state.isShowSteps
  }
}

export default connect(mapStateToProbs, dispatchValue)(Step);