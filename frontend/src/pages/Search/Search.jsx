import React, { useState, useRef } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect } from "react"
import axios from "axios"
import SingleCard from "../../components/Card/Card"

export default function SearchPage() {
  const [searchText, setSearchText] = useState("")
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => {
    async function getSearchResult() {
      const res = await axios.get(`/users/search?s=${searchText.trim()}`)
      setSearchResult(res.data)
      // console.log(res.data);
    }
    getSearchResult()
  }, [searchText])
  // console.log(searchResult)

  const containerHeight = useRef()
  const [height, setHeight] = useState(0)
  function changeHeight() {
    setHeight(containerHeight.current.getBoundingClientRect().height)
  }
  const containerStyle = {
    maxHeight: (2 * height).toString() + "px",
  }

  return (
    <div className="userSearchContainer">
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
      <div className="Mentors_Wrapper_class" style={{ margin: "1rem 0px" }}>
        <div
          ref={containerHeight}
          className="MentorList"
          style={{ overflowY: "auto" }}
        >
          {searchResult[0] === "No user found. Try again... !!!"
            ? "No user found. Try again... !!!"
            : searchResult.map((elem) => {
                return (
                  // <div style={{height:'30rem', width:"15rem", border:"2px solid green"}}>
                  <SingleCard
                    element={elem}
                    height={"17rem"}
                    width={"17rem"}
                    key={elem._id}
                  />
                )
              })}
        </div>
      </div>
    </div>
  )
}
