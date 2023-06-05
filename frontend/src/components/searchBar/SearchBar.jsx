import  React,{useState} from "react"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import MenuItem from "@mui/material/MenuItem"
import Autocomplete from "@mui/material/Autocomplete"
import Button from "@mui/material/Button"
import "./searchBar.css"
import SearchIcon from "@mui/icons-material/Search"
import { LANGUAGES } from "../../pages/register/Signup"
import Backdrop from '@mui/material/Backdrop';
import axios from "axios"

export default function SearchBar(props) {
  const [open, setOpen] = useState(false);

  const [intrest, setIntrest] = useState(names[0]);
  const [searchVal, setSearchVal] = useState("")
  const [searchLang, setSearchLang] = useState("")
  const [mentorOutput, setMentorOutput] = useState([]);
  const handleClose = () => {
    setOpen(false);
  };

const [mentorList, setMentorList] = useState([]);

  const [finalList, setFinalList] = useState([]);
  


  const handleToggle = () => {
    setOpen(!open);
    MentorByIntrest();

    if(searchLang){
      const result = mentorList.filter(checkLang)
      console.log(result);
      setMentorOutput(result);
      return ;
    }

    setMentorOutput(mentorList);
    return mentorList;
  };
  
 function checkLang(mentor){
    if(mentor.language.includes(searchLang))
      return mentor;
  }

  async function MentorByIntrest(){
    try {
      const res = await axios.get(`/auth/${intrest}`)
      setMentorList(res.data);

    } catch (error) {
      console.log(error)
    }

  }
  const handleChange = (event) => {
    setIntrest(event.target.value)

  }

  console.log(mentorOutput);
  return (
    <>
      <div className="searchContainer">
        <div className="inputDiv">
          <input
            type="text"
            className="textInputEl"
            placeholder="Search by name"
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        <div className="languageSelectionDiv">
          <select className="selectionEl" onChange={(e) => setSearchLang(e.target.value)}>
            {
              LANGUAGES.map(m => {
                return (
                  <option className="options" value={m}>
                    {m}
                  </option>)
              })
            }
          </select>
        </div>

        <div className="categorySelectionDiv">
          <select className="selectionEl" onChange={handleChange}>
            {
              names.map(m => {
                return (
                  <option className="options" value={m}>
                    {m}
                  </option>)
              })
            }
          </select>
        </div>

        <button className="submitSearch" onClick={handleToggle}>Submit</button>
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div style={{ display: "block", backgroundColor: "white", width: "50%", color: "black", padding: "20px" }}>No user Found!</div>
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