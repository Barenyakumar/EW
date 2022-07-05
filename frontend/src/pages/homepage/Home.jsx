import React, { useState, useEffect, useContext } from "react"
import "./home.css"
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
  useRoutes,
} from "react-router-dom"
import { NavBar } from "../../components/navbar/NavBar"
import { MenuBar } from "../../components/navbar/menuBar"
import { MainContent } from "../../components/main_content/MainContent"
import { Sidebar } from "../../components/sidebar/Sidebar"
import { BottomNav } from "../../components/bottom_Nav/BottomNav"
import { Feed } from "../../components/Feed/Feed"
import Explore from "../Explore/Explore"
import MenteeHome from "../Mentee/home/MenteeHome"
import MentorList from "../Mentee/discoverMentor/MentorList"
import SingleChallenge from "../Mentee/discoverChallenges/SingleChallenge"
import Challenges from "../Mentee/discoverChallenges/Challenges"
import Booking from "../../components/bookings/Booking"
import MyProfile from "../../components/myprofile/MyProfile"
import GroupSession from "../../components/groupSessions/GroupSession"
import Notification from "../../components/notifications/Notification"
import Wishlist from "../../components/wishlist/Wishlist"
import MentorForm from "../../components/mentorForm/MentorForm"
import Profile from "../profile/Profile"
import Login from "../../components/Auth/Login"
import SignUp from "../../components/Auth/Signup"
import { AuthContext } from "../../context/AuthContext"
import EmailNotification from "../../components/Email-notification/EmailNotification"
import Faq from "../../components/FAQ/Faq"
import Setting from "../Setting/Setting"
import Availability from "../../components/availability/Availability"
import SearchPage from "../Search/Search"
import BookingSessionPage from "../BookingSession/BookingSessionPage"
import Createsession from "../../components/groupSessions/CreateSession"
import SessionDetails from "../../components/sessiondetails/SessionDetails"
import Footer from "../../components/footer/Footer"
import Preloader from "../../components/PreLoader/Preloader"
import SignupWelcome from "../../components/emailTemplates/SignupWelcome"

export const Home = () => {
  const { user } = useContext(AuthContext)
  // EmailNotification();

  ////////////////////////////////////////  ROUTES HANDELING /////////////////////////////////////////////////////

  function AppRoutes() {
    const routes = useRoutes([
      {
        path: "/",
        element: user ? (
          <Navigate to="/home" />
        ) : (
          <Explore loginCallback={loginCallback} public={true} />
        ),
      },
      {
        path: "/register",
        element: user ? (
          <Navigate to="/home" />
        ) : (
          <SignUp loginCallback={loginCallback} />
        ),
      },
      {
        path: "/login",
        element: user ? (
          <Navigate to="/home" />
        ) : (
          <Login loginCallback={loginCallback} />
        ),
      },
      {
        path: "/home",
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <MenteeHome loginCallback={loginCallback(false)} />
          ),
      },
      // {
      //   path: "/mentor",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <MentorList />,
      // },
      // {
      //   path: "/challanges",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <Challenges />,
      // },
      // {
      //   path: "/singlechallange",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <SingleChallenge />,
      // },
      {
        path: "/booking",
        element:
          !user || user === undefined ? <Navigate to="/login" /> : <Booking />,
      },
      // {
      //   path: "/myprofile",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <MyProfile />,
      // },
      {
        path: `/profile/:username`,
        element:
          !user || user === undefined ? <Navigate to="/login" /> : <Profile />,
      },
      // {
      //   path: "/groupsession",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <GroupSession />,
      // },
      // {
      //   path: "/notification",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <Notification />,
      // },
      // {
      //   path: "/wishlist",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <Wishlist />,
      // },
      // {
      //   path: "/mentorform",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <MentorForm />,
      // },
      // {
      //   path: "/menteehome",
      //   element: !user || user === undefined? <Navigate to="/login" /> : <MenteeHome />,
      // },
      {
        path: "/settings",
        element:
          !user || user === undefined ? <Navigate to="/login" /> : <Setting />,
      },
      {
        path: "/availability",
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <Availability />
          ),
      },
      {
        path: "/search",
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <MentorList />
          ),
      },
      {
        path: `/createbooking/:id`,
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <BookingSessionPage />
          ),
      },
      {
        path: `/session/:id`,
        element:<SessionDetails />,
      },
      {
        path: `/newgroupsession`,
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <Createsession />
          ),
      },
      {
        path: `/prelaoder`,
        element: <Preloader />,
      },
      {
        path: `/signupwelcome`,
        element:
          !user || user === undefined ? (
            <Navigate to="/login" />
          ) : (
            <SignupWelcome />
          ),
      },
    ])
    return routes
  }

  /////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// HIDE BOTTOM NAV FROM LOGIN AND SIGNUP//////////////////////////

  const [loginFlag, setLoginFlag] = useState(false)

// console.log(loginFlag)
  const loginCallback = (data) => setLoginFlag(data)

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const [width, setWidth] = useState(window.innerWidth)
  // setWidth(window.innerWidth);
  const setSlide = (width) => {
    if (width <= 900) return true
    else return false
  }

  const [slide_val, setSlide_val] = useState(setSlide(width))

  function widthset() {
    setWidth(window.innerWidth)
    setSlide_val(setSlide(width))
  }

  useEffect(() => {
    window.addEventListener("resize", widthset)
  })
  return (
    <>
      <div
        className="homeContainer"
        style={{ maxWidth: "55rem", margin: "0px auto", width:"98%" }}
      >
        {!loginFlag ? <NavBar /> : ""}
        <AppRoutes />
        {!loginFlag ? slide_val ? <BottomNav /> : "" : ""}
      </div>
    </>
  )
}
