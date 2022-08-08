// import React from "react"
// import "./navbar.css"
// import HomeIcon from "@mui/icons-material/Home"
// import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"
// import GroupIcon from "@mui/icons-material/Group"
// import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
// import BookRoundedIcon from "@mui/icons-material/BookRounded"
// import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
// import SettingsIcon from "@mui/icons-material/Settings"
// import Avatar from "@mui/material/Avatar"
// import TravelExploreIcon from "@mui/icons-material/TravelExplore"
// import { Link } from "react-router-dom"

// export const MenuBar = () => {

//     return (
//         <div className="navContent">
//             <ul className="navContentList list1">
//                 <Link to='/' style={{textDecoration:"none", color:"black"}}>
//                     <li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><HomeIcon fontSize='small' /></Avatar><span className='listValue avatarSpan'>Home</span></li>
//                 </Link>
//                 <Link to='/explore' style={{textDecoration:"none",color:"black"}}>
//                     <li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><TravelExploreIcon fontSize='small' /></Avatar><span className='listValue avatarSpan'>Explore</span></li> </Link>
//                 <Link to='/booking' style={{textDecoration:"none",color:"black"}}>
//                     <li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><BookmarkAddedIcon /></Avatar><span className='listValue avatarSpan'>My Bookings</span></li></Link>
//                 <Link to='/challanges' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><GroupIcon /></Avatar><span className='listValue avatarSpan'>Challanges</span></li> </Link>
//                 <Link to='/' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><GroupIcon /></Avatar><span className='listValue avatarSpan'>Group Session</span></li> </Link>
//                 <Link to='/mentor' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><AccountCircleRoundedIcon /></Avatar><span className='listValue avatarSpan'>Find Mentors</span></li> </Link>
//             </ul>
//             <ul className="navContentList list2">
//                 <Link to='/profile' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><AccountCircleRoundedIcon /></Avatar><span className='listValue avatarSpan'>My Profile</span></li> </Link>
//                 <Link to='/' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><BookRoundedIcon /></Avatar><span className='listValue avatarSpan'>Wishlist</span></li> </Link>
//                 <Link to='/' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><WorkspacePremiumRoundedIcon /></Avatar> <span className='listValue avatarSpan'>Become a Mentor</span></li> </Link>
//             </ul>
//             <ul className="navContentList list3">
//                 <Link to='/' style={{textDecoration:"none",color:"black"}}><li className="navValues"><Avatar sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}><SettingsIcon /></Avatar><span className='listValue avatarSpan'>Settings</span></li></Link>
//             </ul>
//         </div>
//     )}
