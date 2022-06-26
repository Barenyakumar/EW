import React, { useContext } from 'react'
import "./bottomNav.css"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import { Link } from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

export const BottomNav = () => {
  const {user}= useContext(AuthContext)
  return (
    <div className="bottomContainer">
      <Link to='/home' style={{textDecoration:"none", color:"white"}}>
        <div className="bottomElement"><HomeOutlinedIcon/></div>
      </Link>
      <Link to='/search' style={{textDecoration:"none", color:"white"}}>
        <div className="bottomElement"><TravelExploreOutlinedIcon/></div>
      </Link>
      <Link to={`/profile/${user.username}`} style={{textDecoration:"none", color:"white"}}>
        <div className="bottomElement"><AccountCircleRoundedIcon /></div>
      </Link>
    </div>
  )
}
