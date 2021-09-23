import { useHistory } from 'react-router-dom';
import { GETTING_REFRESH } from '../../Actions/Action'
import { connect } from 'react-redux';

function Error(props:any){
  const history = useHistory();
  function refresh(){
    history.push("/to-do");
    props.refreshPage(); 
  }
  return(
    <div>
      <h1>Something Went Wrong! please try Again</h1>
      <p>{props.errorMessage}</p>
      <button onClick={refresh}>Tap to Refresh...</button>
    </div>
  )
}

const dispatcher = (dispatch:any) => {
  return {
    refreshPage: () => {
      dispatch({
        type:GETTING_REFRESH
      })
    }
  }
}

const mapSatetoProp = (state:any) => {
  return {
    errorMessage: state.errorMessage
  }
}

export default connect(mapSatetoProp, dispatcher)(Error);