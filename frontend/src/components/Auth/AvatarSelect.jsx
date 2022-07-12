import React, { useState, useContext, useEffect } from 'react'
import AvatarSelection from './AvatarSelection'
import './avatarselect.css'
import { Alert, Button, IconButton } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import Popup from '../popup-box/Popup';
import Preloader from '../PreLoader/Preloader';
import { Link } from 'react-router-dom';

export default function AvatarSelect(props) {
  const avatars = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",]
  const [AvatarVal, setAvatarVal] = useState("");
  const AvatarCallback = data => setAvatarVal(data)
  const { user, isFetching, error, dispatch } = useContext(AuthContext)
  const [preloader, setPreloader] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const [err, setErr] = useState(false)
  const errCallback = () => { setErr(false) };

  const userDetails = props.userCredentials;


  const submithandler = async () => {
    setPreloader(true)
    userDetails.defaultImage = AvatarVal;



    try {
      const res = await axios.post("auth/register", userDetails);
      localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

    } catch (error) {
      setPreloader(false)
      setErr(true)
      if (error.response.data.code === 11000) {
        setErrMessage("Duplicate entry in " + Object.keys(error.response.data.keyValue) + " try other rather than " + Object.values(error.response.data.keyValue) + ".Try logging in.")
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
      else if (error.response.data.code === 11600 || error.response.data.code === 211) {
        setErrMessage("Database server is down...\n Try again after sometime...")
        // setErrMessage("Duplicate entry in "+ JSON.stringify(error.response.data.keyValue))
      }
      else {
        setErrMessage("Something went wrong. Please try again...")
      }

    }



    // dispatch({type:"LOGIN_START"})
    // try {
    //   const res= await axios.post("auth/register", userDetails);
    //   localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data));
    //   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    // } catch (error) {
    //   setPreloader(false)
    //   setErr(error)
    // }
    // setPreloader(false)
    // loginCall(props.userCredentials, dispatch)
  }
  const loginCall = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("auth/register", userCredentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setPreloader(false)
      localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data))
    } catch (error) {
      // dispatch({ type: "LOGIN_FAILURE", payload: error });
      console.log(error)
      setPreloader(false)
      setErr(true)
    }
  }
  console.log(err);
  return (
    <>
      
      <div
        className="avatarHeading"
        style={{
          margin: "1rem 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Select your Avatar that suits you! </h1>
      </div>
      <div className="AvatarSelectContainerOuts">
        {avatars.map((elem) => {
          return (
            <AvatarSelection
              key={elem}
              elem={elem}
              AvatarCallback={AvatarCallback}
              AvatarVal={AvatarVal}
              Gender={props.gender}
            />
          )
        })}
      </div>
      <div className="buttonAvatar">
        <IconButton aria-label="delete" size="small" component={Link} to={"/login"} >
          LogIn
        </IconButton>
        <Button
          variant="contained"
          onClick={submithandler}
          disabled={isFetching}
        >
          {isFetching ? "Loading" : "Sign up"}
        </Button>

        {err ? <Popup flag={true} message={errMessage} errCallback={errCallback} /> : ""}
        {preloader ? <Preloader /> : ""}
      </div>
    </>
  )
}
