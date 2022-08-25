import React, { useRef, useState, useEffect } from "react"
import SearchBar from "../../../components/searchBar/SearchBar"
import SearchIcon from "@mui/icons-material/Search"
import SingleCard from "../../../components/Card/Card"
import { Button } from "@mui/material"
import "./MentorList.css"
import axios from "axios"
import Preloader from "../../../components/PreLoader/Preloader"
import { Helmet } from "react-helmet"

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

  const containerHeight = useRef()
  const [height, setHeight] = useState(0)
  function changeHeight() {
    setHeight(containerHeight.current.getBoundingClientRect().height)
  }
  const containerStyle = {
    maxHeight: (2 * height).toString() + "px",
  }
  console.log(containerStyle)
  return (
    <div className="MentorsWrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search your mentor,mentee | Eduwarts</title>
        <meta
          name="description"
          content="Learn and grow with help from your own skilled seniors"
        />
      </Helmet>
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
      <div ref={containerHeight} className="MentorList">
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

export default MentorList


// export function MentorListBox() {
//   return (
//     <div ref={containerHeight} className="MentorList">
//       {searchResult[0] === "No user found. Try again... !!!"
//         ? "No user found. Try again... !!!"
//         : searchResult.map((elem) => {
//           return (
//             // <div style={{height:'30rem', width:"15rem", border:"2px solid green"}}>
//             <SingleCard
//               element={elem}
//               height={"16rem"}
//               width={"16rem"}
//               key={elem._id}
//             />
//           )
//         })}
//     </div>
//   )
// }

