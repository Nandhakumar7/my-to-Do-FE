import React from 'react';
import './Category.css'
import {ADD_CATEGORY, SET_CURRENT_CATEGORY, SET_CATEGORY_LIST} from '../../../Actions/Action'
import { connect } from 'react-redux';
import CategoryHeader from '../Category-Header/Category-Header'
import CategoryFooter from '../Category-Footer/Category-Footer'
const axios = require('axios')
class Category extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }  
  
  /**
   * get Category data from db and set into redux store.
   */
  async getDataFromDbAndSet() {
    let props:any = this.props;
    return await axios.get('http://192.168.29.254:3400/category').then((data:any) => {
      props.sendDateToStore(data.data.data);
      return data.data.data
    })
  }

  async componentDidMount() {
    let prop:any = this.props;
    let result:any = await this.getDataFromDbAndSet();
    await prop.setCurrentCategory(result[5]);
  }

  render() {
    let prop:any = this.props;
    const addCategory = async(event:any)=> {
      if(event.key == "Enter") {
        await prop.addCategory(event);
        await this.getDataFromDbAndSet();
      }
    }
    return (
      <div className="left-container">
        <CategoryHeader />
        <ul className="list">{(prop.category).map((category:any) =>
          <li className={prop.currentCategory.name == category.name ? "clicked-list" : "listStyle"}
            onClick={() => prop.setCurrentCategory(category)}>
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
    addCategory: async(event:any) => {
      if(event.key == "Enter") {
        let newCategory = {
          "name":event.target.value,
          "isClicked":false,
          "tasks":[],
          "icon":"fas fa-list lefthead-icon"
        }
        let result = await axios.post('http://192.168.29.254:3400/Category/',newCategory);
        dispatch({
          type: ADD_CATEGORY,
          value: result.data 
        })  
        event.target.value= "";
      }

    },
    setCurrentCategory:(name:any) => {
      dispatch({
        type:SET_CURRENT_CATEGORY,
        currentCategory:name
      })
    },
    sendDateToStore:(categoryList:any) => {
      dispatch({
        type:SET_CATEGORY_LIST,
        categoryList:categoryList
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