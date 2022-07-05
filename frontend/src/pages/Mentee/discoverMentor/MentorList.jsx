import React, { useRef, useState, useEffect } from 'react'
import SearchBar from "../../../components/searchBar/SearchBar"
import SearchIcon from "@mui/icons-material/Search"
import SingleCard from '../../../components/Card/Card'
import { Button } from '@mui/material'
import './MentorList.css'
import axios from 'axios'
import Preloader from '../../../components/PreLoader/Preloader'

const mentorList = [
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


const MentorList = () => {
  const [preloader, setPreloader] = useState(false)

  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => {
    async function getSearchResult() {
      setPreloader(true)
      const res = await axios.get(`/users/search?s=${searchText.trim()}`)
      setSearchResult(res.data)
      setPreloader(false)
      // console.log(res.data);
    }
    getSearchResult()
  }, [searchText])
  console.log(searchResult)




  const containerHeight = useRef();
  const [height, setHeight] = useState(0);
  function changeHeight() {
    setHeight(containerHeight.current.getBoundingClientRect().height)
  }
  const containerStyle = {
    maxHeight: (2 * height).toString() + "px",
  }
  console.log(containerStyle)
  return (
    <div className='MentorsWrapper'>
      <div
        className="searchBarIcon searchElem container"
        style={{
          margin: "0px auto",
          width: "80%",
          height: "3rem",
          border: "1px solid grey",
        }}
      >
        <SearchIcon fontSize="medium" />
        <input
          type="text"
          className="searchInput"
          placeholder="Search by name"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div ref={containerHeight} className="MentorList" >
      {searchResult[0] === "No user found. Try again... !!!"
        ? "No user found. Try again... !!!"
        : searchResult.map((elem) => {
            return (
              // <div style={{height:'30rem', width:"15rem", border:"2px solid green"}}>
              <SingleCard
                element={elem}
                height={"16rem"}
                width={"16rem"}
                key={elem._id}
              />
            )
        })}
      </div>
        {/* <Button variant="outlined" className='LoadBtn' onClick={changeHeight}>Load More ...</Button> */}
        {preloader ? <Preloader /> : ""}
    </div>
  )
}

export default MentorList;