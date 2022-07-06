import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link } from "react-router-dom"
import { Button } from '@mui/material'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import "./login.css"
import Popup from '../popup-box/Popup'
import Preloader from '../PreLoader/Preloader'
import { Helmet } from "react-helmet"



const SignUp = (props) => {
  useEffect(() => { props.loginCallback(true) }, [props])

  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const menteeName = useRef()
  const email = useRef()
  const username = useRef()
  const password = useRef()
  const rePassword = useRef()
  const gender = useRef()
  const otp = useRef()
  const [err, setErr] = useState(error)


  const [errMessage, setErrMessage] = useState("")
  useEffect(() => {
    if (error) {
      if (error.response.data.code === 11000) {
        setErrMessage("Duplicate entry in " + Object.keys(error.response.data.keyValue) + " try other rather than " + Object.values(error.response.data.keyValue)+".Try logging in.")
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
      if (error.response.data.code === 11600 || error.response.data.code === 211) {
        setErrMessage("Database server is down...\n Try again after sometime...")
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
    }
  }, [error])

  // console.log(rePassword.current.value)

  const submithandler = (e) => {
    
    setPreloader(true)
    e.preventDefault();
    if (otpMatched) {
      const signupData = {
        name: menteeName.current.value,
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        gender: gender.current.value
      }
      loginCall(signupData, dispatch);
    }
    else{
      setPreloader(false)
      setErr("authenticate email")
      setErrMessage("OTP doesn't match. Please try again.")
    }
  }
  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/register", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setPreloader(false)
      localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data))
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error });
      setPreloader(false)

    }
  }


  // send opt handler
  const [otpSent, setotpSent] = useState(false)
  const [Otp, setOtp] = useState("")
  const [otpMatched, setOtpMatched] = useState(false)
  const [preloader, setPreloader] = useState(false)

  async function sendOTPHandler(e) {
    setPreloader(true)
    e.preventDefault();
    try {
      if (email.current.value !== "") {
        const res = await axios.post("/email/otp", { reciever: email.current.value })
        setPreloader(false)
        setotpSent(true);
        setOtp(res.data);
      }
      else {
        setPreloader(false)
        setErr("Wrong email!!!")
        setErrMessage("Please enter a valid email id")
      }
    } catch (error) {
      setPreloader(false)
      setErr("Wrong email!!!")
      setErrMessage("Something went wrong while sending otp. Please try again...")
    }

  }

  function matchOTP(){
    if (otp.current.value === Otp) {
      setOtpMatched(true);
      setotpSent(false);
    }
  }

  return (
    <div className="loginContainer">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sign up and get started | Eduwarts</title>
        <meta
          name="description"
          content="Sign up to connect with future leaders"
        />
      </Helmet>
      <div className="logincontent">
        <img src="/images/signup.jpg" alt="" className="loginImg" />
        <form
          action=""
          className="loginForm"
          method="post"
          onSubmit={submithandler}
        >
          <input
            type="text"
            ref={menteeName}
            placeholder="Name"
            name="name"
            required={true}
            autoComplete="off"
          />
          <div className="email_div">
            <input
              type="email"
              ref={email}
              placeholder="Email"
              name="email"
              required={true}
              style={
                otpMatched
                  ? { boxShadow: "0px 0px 7px red", border: "none" }
                  : { boxShadow: "0px 0px 7px red", border: "none" }
              }
            />
            <a
              onClick={sendOTPHandler}
              disabled={true}
              style={{ fontSize: "1rem", textDecoration: "underline" }}
            >
              {!otpMatched ? (otpSent ? "Resend" : "Verify") : ""}
            </a>
          </div>
          {otpSent ? (
            <div className="otp_div">
              <input type="text" ref={otp} placeholder="Enter OTP" required />
              <button onClick={matchOTP}>Submit</button>
            </div>
          ) : (
            ""
          )}
          <input
            type="text"
            ref={username}
            placeholder="Username"
            name="username"
            minLength={4}
            maxLength={10}
            required={true}
            autoComplete="none"
          />
          <input
            type="password"
            ref={password}
            placeholder="Password"
            name="passoword"
            minLength={6}
            required={true}
          />
          <input
            type="password"
            ref={rePassword}
            placeholder="Confirm password"
            name="passoword"
            minLength={6}
            required={true}
          />
          <label htmlFor="gender">
            {" "}
            Gender:
            <select ref={gender} name="gender" id="gender">
              <option value="Male" selected>
                Male
              </option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <Button
            variant="contained"
            type="submit"
            className="loginBtn"
            disabled={isFetching || !otpMatched}
          >
            {isFetching ? "Loading" : "Sign up"}
          </Button>

          <Link to="/login" className="redirectLink">
            Alredy registered!{" "}
          </Link>

          {err ? <Popup flag={true} message={errMessage} /> : ""}
        </form>
      </div>
      {preloader ? <Preloader /> : ""}
    </div>
  )
}

export default SignUp