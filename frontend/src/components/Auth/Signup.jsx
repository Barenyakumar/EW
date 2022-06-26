import React, {useState, useEffect, useRef, useContext } from 'react'
import { Link } from "react-router-dom"
import { Button, Dialog } from '@mui/material'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"
import Popup from '../popup-box/Popup'



const SignUp = (props) => {
  useEffect(() => { props.loginCallback(true) }, [props])

  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const menteeName = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const rePassword = useRef()
  const gender = useRef()
  const [errMessage, setErrMessage] = useState("")
  useEffect(()=>{
    if(error){
      if(error.response.data.code == 11000){
        setErrMessage("Duplicate entry in "+ Object.keys(error.response.data.keyValue)+" try other rather than " +Object.values(error.response.data.keyValue))
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
      if(error.response.data.code == 11600 || error.response.data.code == 211){
        setErrMessage("Database server is down...\n Try again after sometime...")
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
    }
  },[error])

  // console.log(rePassword.current.value)

  const submithandler = (e) => {
    e.preventDefault();


    const signupData = {
      name: menteeName.current.value,
      email: email.current.value,
      username: username.current.value,
      password: password.current.value,
      gender: gender.current.value
    }
    loginCall(signupData, dispatch);

  }
  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/register", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });

    }
  }

  return (
    < div className = 'loginContainer' >
      <div className="logincontent">
        <img src="/images/login.png" alt="" className="loginImg" />
        <form action="" className="loginForm" method='post' onSubmit={submithandler}>
          <input type="text" ref={menteeName} placeholder='Name' name='name' required={true} />
          <input type="email" ref={email} placeholder='Email' name='email' required={true} />
          <input type="text" ref={username} placeholder='Username' name='username' minLength={4} maxLength={10} required={true} />
          <input type="password" ref={password} placeholder='Password' name="passoword" minLength={6} required={true} />
          <input type="password" ref={rePassword} placeholder='Confirm password' name="passoword" minLength={6} required={true} />
          <label htmlFor="gender"> Gender:
            <select ref={gender} name="gender" id="gender">
              <option value="Male" selected>Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select></label>
          <Button variant='contained' type='submit' className='loginBtn' disabled={isFetching}>{isFetching ? "Loading" : "Sign up"}</Button>

          <Link to="/login" className='redirectLink'>Alredy registered! </Link>
          
          {
            error?
            <Popup flag={true} message={errMessage} />:""
          }

        </form>
      </div>
    </div >
  )
}

export default SignUp