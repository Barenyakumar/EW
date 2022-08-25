import * as React from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import "./searchBar.css"
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

          <button className="SubmitBtn">Submit</button>
        </div>
      </div>
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