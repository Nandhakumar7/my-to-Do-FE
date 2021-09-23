import React from 'react';
import './Category.css'
import { ADD_CATEGORY, 
  GET_CATEGORY, 
  GET_CURRENT_CATEGORY, 
  SET_CURRENT_CATEGORY_TASKS } from '../../../Actions/Action'
import { connect } from 'react-redux';
import CategoryHeader from '../Category-Header/Category-Header'
import CategoryFooter from '../Category-Footer/Category-Footer'

class Category extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }  

  async componentDidMount() {
    let prop:any = this.props;
    await prop.getCategory();
    await prop.setCurrentCategory()
  }

  render() {
    let prop:any = this.props;
    const addCategory = async(event:any)=> {
      if(event.key == "Enter") {
        let newCategory = {
          "name":event.target.value,
          "isClicked":false,
          "tasks":[],
          "icon":"fas fa-list lefthead-icon"
        }
        await prop.addCategory(newCategory);
        prop.getCategory();
        event.target.value = "";
      }
    }
   
    return (
      <div className="left-container">
        <CategoryHeader />
        <ul className="list">{(prop.category).map((category:any) =>
          <li className={prop.currentCategory.name == category.name ? "clicked-list" : "listStyle"}
            onClick={() => prop.getCurrentCategory(category)}>
            <i className={category.icon}></i>
            <span className={prop.currentCategory.name == category.name 
              ? "listvalue-style listvalue-style-color-blue" : "listvalue-style"}>{category.name}</span>
          </li>)}
        </ul>
        <div className="new-listform">
          <i id ="addIcon" className="fas fa-plus lefthead-icon"></i>
          <input className="text-box" type="text" placeholder="New List" onKeyPress={addCategory} id="newList"></input>
          <i className="far fa-square lefthead-icon"></i>
        </div>
        <CategoryFooter />
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
    getCategory: () => {
      dispatch({
        type:GET_CATEGORY
      })
    },
    addCategory: (newCategory:any) => {
      dispatch({
        type: ADD_CATEGORY,
        value: newCategory 
      })  
    },
    getCurrentCategory: (currentCategoryId:any) => {
      dispatch({
        type:GET_CURRENT_CATEGORY,
        categoryId:currentCategoryId._id
      })
    },
    setCurrentCategory: () => {
      dispatch({
        type:SET_CURRENT_CATEGORY_TASKS,
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
    category: state.category,
    currentCategory: state.currentCategory,
    isprocessed: state.isprocessed
  }
}

export default connect(mapStateToProbs, dispatchValue)(Category);