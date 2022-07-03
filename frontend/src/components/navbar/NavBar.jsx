import React, { useContext, useState } from "react"
import "./navbar.css"
import { Logo } from "../Logo/Logo"
import Avatar from "@mui/material/Avatar"
import SearchIcon from "@mui/icons-material/Search"
import SwipeableDrawer from "@mui/material/SwipeableDrawer"
import HomeIcon from "@mui/icons-material/Home"
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded"
import GroupIcon from "@mui/icons-material/Group"
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded"
import BookRoundedIcon from "@mui/icons-material/BookRounded"
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded"
import SettingsIcon from "@mui/icons-material/Settings"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import { Button } from "@mui/material"
import { Link, Navigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import LogoutIcon from "@mui/icons-material/Logout"

export const NavBar = (props) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setOpen(open)
  }

  const { user } = useContext(AuthContext)

  return (
    <>
      <div className="topBar">
        <div className="logo">
          <Logo />
        </div>
        {/* {props.public ? (
          ""
        ) : (
          <div className="search">
            <SearchIcon fontSize="medium" className="searchIcon" />

            <input type="search" name="search" id="search" />
          </div>
        )} */}
        {props.public ? (
          <div className="loginBtncontainer">
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to="/login"
            >
              login
            </Button>
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to="/register"
            >
              signup
            </Button>
          </div>
        ) : (
          user && (
            <>
              <div className="avatar">
                <span className="avatarName avatarSpan">{user.username}</span>
                <Avatar
                  className="avatarBadge"
                  sx={{ bgcolor: "#344CB7 " }}
                  onClick={toggleDrawer(true)}
                >
                  P
                </Avatar>
                <SwipeableDrawer
                  anchor={"right"}
                  open={open}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
                  <div className="navContent">
                    <ul className="navContentList list1">
                      <Link
                        onClick={toggleDrawer(false)}
                        to="/home"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <HomeIcon fontSize="small" />
                          </Avatar>
                          <span className="listValue">Home</span>
                        </li>
                      </Link>
                      {/* <Link
                        onClick={toggleDrawer(false)}
                        to="/explore" 
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <TravelExploreIcon fontSize="small" />
                          </Avatar>
                          <span className="listValue">Explore</span>
                        </li>{" "}
                      </Link> */}
                      {/* <Link
                        onClick={toggleDrawer(false)}
                        to="/booking"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <BookmarkAddedIcon />
                          </Avatar>
                          <span className="listValue">My Bookings</span>
                        </li>
                      </Link> */}
                      {/* <Link
                        onClick={toggleDrawer(false)}
                        to="/challanges"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <GroupIcon />
                          </Avatar>
                          <span className="listValue">Challanges</span>
                        </li>{" "}
                      </Link> */}
                      <Link
                        onClick={toggleDrawer(false)}
                        to="/groupsession"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <GroupIcon />
                          </Avatar>
                          <span className="listValue">Group Session</span>
                        </li>{" "}
                      </Link>
                      <Link
                        onClick={toggleDrawer(false)}
                        to="/search"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <TravelExploreIcon fontSize="small" />
                          </Avatar>
                          <span className="listValue">Search</span>
                        </li>{" "}
                      </Link>
                    </ul>
                    <ul className="navContentList list2">
                      <Link
                        onClick={toggleDrawer(false)}
                        to={`/profile/${user.username}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <AccountCircleRoundedIcon />
                          </Avatar>
                          <span className="listValue">My Profile</span>
                        </li>{" "}
                      </Link>
                      {/* <Link
                        onClick={toggleDrawer(false)}
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <BookRoundedIcon />
                          </Avatar>
                          <span className="listValue">Wishlist</span>
                        </li>{" "}
                      </Link> */}
                      {/* <Link
                        onClick={toggleDrawer(false)}
                        to="/"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <WorkspacePremiumRoundedIcon />
                          </Avatar>{" "}
                          <span className="listValue">Become a Mentor</span>
                        </li>{" "}
                      </Link> */}
                    </ul>
                    <ul className="navContentList list3">
                      <Link
                        onClick={toggleDrawer(false)}
                        to="/settings"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <SettingsIcon />
                          </Avatar>
                          <span className="listValue">Settings</span>
                        </li>
                      </Link>
                      <button
                        onClick={() => {
                          localStorage.removeItem("ed_pr_bk_gj_12_34")
                          window.location.replace("/")
                        }}
                        style={{
                          textDecoration: "none",
                          color: "black",
                          border: "none",
                          background: "transparent",
                          outline: "none",
                        }}
                      >
                        <li className="navValues">
                          <Avatar
                            sx={{ bgcolor: "#344CB7 ", width: 30, height: 30 }}
                          >
                            <LogoutIcon />
                          </Avatar>
                          <span className="listValue">Logout</span>
                        </li>
                      </button>
                    </ul>
                  </div>
                </SwipeableDrawer>
              </div>
            </>
          )
        )}
      </div>
    </>
  )
}