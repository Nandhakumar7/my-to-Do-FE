import React from 'react';
import Header from './Components/Header/Header'
import reducer from './Reducer/Reducer';
import *  as redux from 'redux';
import Category from './Components/Category/Category/Category'
import './App.css';
import { Provider } from 'react-redux';
import Task from './Components/Task/Task/Task'
import Step from './Components/Steps/Steps'
const store = redux.createStore(reducer);

class App extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }
  
  render() {
    return  <Provider store={store}>
      <div className="container">
        <Header/>
        <Category/>
        <Task />
        <Step />
      </div>
    </Provider>
  }
}

export default App;


