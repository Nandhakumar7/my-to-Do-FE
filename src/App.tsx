import React from 'react';
import Header from './Components/Header/Header'
import Category from './Components/Category/Category/Category'
import './App.css';
import Error from './Components/Error/error'
import { connect } from 'react-redux';
import Task from './Components/Task/Task/Task'
import Step from './Components/Steps/Steps'

class App extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    this.state = {};
  }
  
  render() {
    let prop:any = this.props;
    if(prop.error) {
      return <Error/>;
    } else {
      return <div className="container">
        <Header/>
        <Category/>
        <Task />
        <Step />
      </div>
    }
  }
}

const mapStateToProbs = (state:any) => {
  return {
    error: state.errorOccured,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProbs, null)(App);


