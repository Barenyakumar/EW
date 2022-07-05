import React, { useContext, useEffect, useRef } from 'react'
import { Link, Navigate } from "react-router-dom"
import { Button } from '@mui/material'
import "./login.css"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import Popup from '../popup-box/Popup'
import Preloader from '../PreLoader/Preloader'
const Login = (props) => {

  const email = useRef();
  const password = useRef();
  useEffect(() => { props.loginCallback(true) }, [props])

  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  const loginHandler = async e => {
    e.preventDefault();
    const loginData ={
      email: email.current.value,
      password: password.current.value
    }
    loginCall(loginData,dispatch )
  }

  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/login", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data))
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
    }
  }

  return (
    <div className='loginContainer'>
      <div className="logincontent">
        <img src="/images/login.png" alt="" className="loginImg" />
        <form action="" className="loginForm" method='post' onSubmit={loginHandler}>
          <input type="email" placeholder='Email' name='email' ref={email} required={true} />
          <input type="password" placeholder='Password' name="passoword" ref={password} minLength={6} required={true} />
          <Button variant='contained' type='submit' className='loginBtn' disabled={isFetching}>{isFetching?"Loading":"Login"}</Button>

          <Link to="/register" className='redirectLink'>New to Eduwarts? </Link>
          {
            error?
            <Popup flag={true} message={error.response.data}/>:""
          }
        </form>
      </div>
      {isFetching ? <Preloader /> : ""}
    </div>
  )
}

export default Login