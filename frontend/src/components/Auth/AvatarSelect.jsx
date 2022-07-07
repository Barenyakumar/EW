import React, { useContext, useState,useEffect } from 'react'
import AvatarSelection from './AvatarSelection'
import './avatarselect.css'
import { Button } from '@mui/material';
import axios from "axios"
import {AuthContext} from "../../context/AuthContext"
import Preloader from '../PreLoader/Preloader';

export default function AvatarSelect(props) {
  
  useEffect(() => { props.loginCallback(true) }, [props])


  useEffect(() => { 
    function setUser(){
      var {user}= useContext(AuthContext)
    }
    setUser()
   }, [localStorage])
  
  const avatars = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",]
  const [AvatarVal, setAvatarVal] = useState("");
  const AvatarCallback = data => setAvatarVal(data)
  const [preloader, setPreloader] = useState(false)

  // console.log(AvatarVal);
  const Gender = user.gender;

  const handleAvatar=async ()=>{
    console.log(`auth/setavatar/${user._id}`)
    setPreloader(true)
    const res = await axios.post(`auth/setavatar/${user._id}`,{img:AvatarVal})
    localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(res.data))
    setPreloader(false)
    console.log(user);
  }


  return (
    <>
      <h1>Select your Avatar</h1>
      <div className="AvatarSelectContainerOuts">
        {
          avatars.map(elem => {
            return (
              <AvatarSelection key={elem} elem={elem} AvatarCallback={AvatarCallback} AvatarVal={AvatarVal} Gender={Gender} />
            )
          })
        }
      </div>
      <Button variant='outlined' onClick={handleAvatar}>done</Button>
      {preloader ? <Preloader /> : ""}
    </>
  )
}
