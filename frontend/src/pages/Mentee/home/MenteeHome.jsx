import * as React from "react"
import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
// import Challe
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
import Preloader from "../../../components/PreLoader/Preloader"
import Challenges from "../../../components/challenges/Challenges"
 

const challengeList = [
  {
    id: 1,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m3.jfif",
  },
  {
    id: 2,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m4.jfif",
  },
  {
    id: 3,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m5.jfif",
  },
  {
    id: 4,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m6.jfif",
  },
  {
    id: 5,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m3.jfif",
  },
  {
    id: 6,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m4.jfif",
  },
  {
    id: 7,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m5.jfif",
  },
  {
    id: 8,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m6.jfif",
  },
  {
    id: 9,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m3.jfif",
  },
  {
    id: 10,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m4.jfif",
  },
  {
    id: 11,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m5.jfif",
  },
  {
    id: 12,
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m6.jfif",
  },
]


export default function MenteeHome() {
  const [mentorList, setMentorList] = useState([])
  const [preloader, setpreloader] = useState(false)

  useEffect(() => {
    const allMentors = async () => {
      // setpreloader(true)
      const res = await axios.get("users/mentors")

      setMentorList(res.data)
      // setpreloader(false)
    }

    allMentors()
  }, [])

  // console.log(mentorList)

  return (
    <div className="Menteewrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Platform to connect with leaders | Eduwarts</title>
        <meta
          name="description"
          content="Learn and grow with help from your own skilled seniors"
        />
      </Helmet>
      <h1>
        Learn and <span className="highLight">grow</span> with help from your
        own skilled seniors
      </h1>
      <h3>
        Book and meet mentors to enhance your skills and recognise the diversity
        of various skill sets in our community.
      </h3>

      <SearchBar />
      <br></br>
      <br></br>

      <GroupSession />

      {mentorList.length === 0 ? (
        ""
      ) : (
        <>
          <h1 className="centerTitle">Discover mentors</h1>
          <SwiperMentor arrayList={mentorList} />
        </>
      )}

        {/* <Challenges /> */}
      {/* <SwiperMentor arrayList={userList} /> */}

      {/* <h3 className="centerTitle">Explore Challenges</h3>
      <SwiperMentor arrayList={challengeList} /> */}

      <Challenges/>
      
      {/* <div style={{ marginTop: "30px" }}>
        <h2 className="centerTitle">Join group mentoring </h2>
        <SwiperMentor arrayList={sessionList} />
      </div> */}
      <br></br>
      <br></br>
      <Footer />
      {preloader ? <Preloader /> : ""}
    </div>
  )
}
