import * as React from "react"
import { useState,useEffect } from "react"
// import "./home.css"
// import "../../App.css"

import SearchBar from "../../../components/searchBar/SearchBar"
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import SwiperMentor from "../../../components/Swiper/Swiper"
import "./menteeHome.css"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios"
import GroupSession from "../../../components/groupSessions/GroupSession"
import Footer from "../../../components/footer/Footer"
 

export default function MenteeHome() {
  
  const [mentorList, setMentorList] = useState([])

  useEffect(() => {
   
    const allMentors = async () => {   
      const res = await axios.get("users/search?isMentor=true&s")
      setMentorList(res.data)
    }

    allMentors()
  }, [])
  
  // console.log(mentorList)


  return (
    <div className="Menteewrapper">
      <h1>
        Learn and <span className="highLight">grow</span> with help from your
        own skilled seniors{" "}
      </h1>
      <h3>
        Book and meet mentors for 1:1 mentorship all across different colleges,
        states in our community
      </h3>

      {/* <SearchBar /> */}
      <br></br>
      <br></br>

      <GroupSession />

      <h1 className="centerTitle">Discover mentors</h1>

      <SwiperMentor arrayList={mentorList} />

      {/* <SwiperMentor arrayList={userList} /> */}

      {/* <h3 className="centerTitle">Explore Challenges</h3>
      <SwiperMentor arrayList={challengeList} />

      <div style={{ marginTop: "30px" }}>
        <h2 className="centerTitle">Join group mentoring </h2>
        <SwiperMentor arrayList={sessionList} />
      </div> */}
      <br></br>
      <br></br>
      <Footer />
    </div>
  )
}