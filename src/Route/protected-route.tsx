import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }:any) {
  let auth = false;
  let test:any;
  if(localStorage.getItem("isAuthenticated") == "true"){
    auth = true;
    test =  <Route
    {...rest}
    render={(props) =>
      auth ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
  }

  return 
  (
    <div>
   {test}
   </div>
  );
}

export default ProtectedRoute;
