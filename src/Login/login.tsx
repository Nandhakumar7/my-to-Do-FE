import React , {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail]= useState("");
  const [password, setPassword]=useState("")
  const history = useHistory();
  async function login(){
    console.warn(email, password)
    let item = {"email":email, "password":password, "strategy":"local"}
    let result:any = await fetch("http://192.168.29.254:3400/authentication", {
      method:'POST',
      headers: {
        "content-Type":"application/json",
        "Accept":"application/json"
      },
      body:JSON.stringify(item)
    })
    result = await result.json();
    if(result.accessToken){
      localStorage.setItem("isAuthenticated", "true");
      history.push("/to-do")
    } else {
      history.push("/")
    }
  }
  return (
    <div>
      <h1>LogIn Page</h1>
      <input type="text" onChange={(e)=>setEmail(e.target.value)}></input>
      <input type="text" onChange={(e)=>setPassword(e.target.value)}></input>
      <button onClick={login}>Submit</button>
    </div>
  )
}

export default Login;