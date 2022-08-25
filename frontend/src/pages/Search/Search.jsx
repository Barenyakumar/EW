// import React, { useState, useRef } from "react"
// import SearchIcon from "@mui/icons-material/Search"
// import { useEffect } from "react"
// import axios from "axios"
// import SingleCard from "../../components/Card/Card"

// export default function SearchPage() {
//   const [searchText, setSearchText] = useState("")
//   const [searchResult, setSearchResult] = useState([])
//   useEffect(() => {
//     async function getSearchResult() {
//       const res = await axios.get(`/users/search?s=${searchText.trim()}`)
//       setSearchResult(res.data)
//       // console.log(res.data);
//     }
//     getSearchResult()
//   }, [searchText])
//   console.log(searchResult)

//   const containerHeight = useRef()
//   const [height, setHeight] = useState(0)
//   function changeHeight() {
//     setHeight(containerHeight.current.getBoundingClientRect().height)
//   }
//   const containerStyle = {
//     maxHeight: (2 * height).toString() + "px",
//   }

//   return (
//     <div className="userSearchContainer">
//       <div
//         className="searchBarIcon searchElem container"
//         style={{
//           margin: "0px auto",
//           width: "80%",
//           height: "3rem",
//           border: "1px solid grey",
//         }}
//       >
//         <SearchIcon fontSize="medium" />
//         <input
//           type="text"
//           className="searchInput"
//           placeholder="Search by name"
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>
//       <div className="Mentors_Wrapper_class" style={{ margin: "1rem 0px" }}>
//         <div
//           ref={containerHeight}
//           className="MentorList"
//           style={{ overflowY: "auto" }}
//         >
//           {searchResult[0] === "No user found. Try again... !!!"
//             ? "No user found. Try again... !!!"
//             : searchResult.map((elem) => {
//                 return (
//                   // <div style={{height:'30rem', width:"15rem", border:"2px solid green"}}>
//                   <SingleCard
//                     element={elem}
//                     height={"17rem"}
//                     width={"17rem"}
//                     key={elem._id}
//                   />
//                 )
//               })}
//         </div>
//       </div>
//     </div>
//   )
// }




import * as React from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import "./searchBar.css"
import Backdrop from '@mui/material/Backdrop';
import SearchIcon from "@mui/icons-material/Search"

export default function SearchBar(props) {
  const [intrest, setIntrest] = React.useState(names[0]);
  const [searchVal, setSearchVal] = React.useState("")
  // React.useEffect(()=>{
  //    props.searchCallBack(searchVal)
  // },[searchVal])
  const handleChange = (event) => {
    setIntrest(event.target.value)
  }


    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
      setOpen(false);
    };
    const handleToggle = () => {
      setOpen(!open);
      console.log("hi")
    };

  console.log(intrest);
  console.log(searchVal);
  return (
    <>
      {/* <div >
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          className="container"
        >
          <div className="element">
            <SearchIcon/>
          </div>
          <div className="searchInput element">
          <TextField fullWidth={true} id="standard-basic" label="Search" variant="standard" />

          </div>

          <div className="dropdown element">
          <TextField
          inputProps={{style: {fontSize: 40}}} 
          className="searchLen"
            id="standard-select-currency"
            select
            label="Search by name "
            value={currency}
            onChange={handleChange}
            // helperText="Please select your currency"
            variant="standard"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          </div>

          <div className="searchBut element">
          <Button variant="outlined" size='large'>Search</Button>
          </div>

        </Box>
        
      </div> */}
      <div className="container">
        <div className="searchContainer">
          <div className="searchBarIcon searchElem">
            <SearchIcon fontSize="medium" />
            <input
              type="text"
              className="searchInput"
              placeholder="Search by name"
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>
          <div className="dropdown searchElem">
            <select className="selection" onChange={handleChange}>
              {
                names.map(m => {
                  return (
                    <option className="options" value={m}>
                      {m}
                    </option>)
                })
              }
              {/* <option className="options" value="2" selected="selected">
                test2
              </option>
              <option className="options" value="3">
                test3
              </option> */}
            </select>
          </div>

          <Button className="SubmitBtn" onClick={handleToggle}>Submit</Button>
        </div>
      </div>
      <Backdrop
        sx={{ color: '#fff',  zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        onClick={handleClose}
      >
        <div style= {{display: "block", backgroundColor: "white", width: "50%",color:"black", padding:"20px"}}>No users found!!!</div>
      </Backdrop>
    </>
  )
}

const names = [
  "----- Select Intrests -----",
  "Art & Graphic Design",
  "Dance",
  "Music",
  "Photography & Film making",
  "Blockchain",
  "Cloud Computing",
  "UI and UX",
  "Data Science",
  "Web Development",
  "Buisness Analytics",
  "Content Writing & SEO",
  "Digital Marketing",
  "Information Security",
  "Product Management",
  "Event Management",
  "Competitive Coding",
  "Software Engineering",
  "Interview Preparation",
  "DevOps",
  "Hackathons",
  "Others",
]