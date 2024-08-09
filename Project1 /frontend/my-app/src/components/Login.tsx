import React, {useState} from 'react';




const Login_:React.FC =  () => {
const API_URL = 'http://localhost:8080/users';
const [pass,setPass] = useState("");
const [username,setUserName] = useState("");

const handlePassChange = (e:any) => {
  setPass(e.target.value);
  console.log("pass is " + pass)


};
const handleUserNameChange = (e:any) => {
  const v = e.target.value
  setUserName(v);
  console.log("username is " + v)
}
const handleEnterButton = () => {
  if (username === "" && pass === ""){

  }

}
    return(
        <div>
        <label className='passLabel'>
        Enter Username:
        <input type="text"
        value ={username}
        onChange={handleUserNameChange}
        placeholder="Username Here"
        />
      </label>
      <label className='passLabel'>
        Enter Password:
        <input type="password"
        value ={pass}
        onChange={handlePassChange}
        placeholder="Password Here"
        />
      </label>
      <button className='passLabel'
      onClick={handleEnterButton}
      >
        Enter
      </button>

            
        
        
        
        </div>
    )



}


export default Login_;