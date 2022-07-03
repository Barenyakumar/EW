import React, { useState } from "react"
import PreviewImg from "../Preview/Preview"
import { Box, TextField, OutlinedInput, Button } from "@mui/material"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
// import TextField from '@mui/material/TextField';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import Popup from "../popup-box/Popup"
import Preloader from "../PreLoader/Preloader"

// import DatePickers from '../DatePicker/DatePicker'

const names = [
  "Art & Graphic Design",
  "Dance",
  "Music",
  "Photography & Film making",
  "Blockchain",
  "UI/UX",
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
  "Others",
]
export default function Createsession() {
  const minDate = new Date()
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [category, setCategory] = useState("")
  const [sessionName, setSessionName] = useState("")
  const [sessionDesc, setSessionDesc] = useState("")
  const [dateTime, setDateTime] = useState(
    minDate.setDate(minDate.getDate() + 1)
  )
  const [selectedImage, setSelectedImage] = useState()
  const [duration, setDuration] = useState(60)
  const [userMail, setUserMail] = useState([])
  const { user: currentUser } = useContext(AuthContext)
  const ImageCallback = (data) => setSelectedImage(data)

  // console.log(new Date().setDate(new Date()+1));
  // console.log(minDate.setDate(minDate.getDate()+1))

  const handleGroupSession = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      var token = await axios.get("/session/token")
    } catch (error) {
      setIsLoading(false)
      setError(true)
    }
    // console.log(token.data)
    try {
      setIsLoading(true)

      var room = await axios.post("/session/createroom", {
        name: Date.now().toString(),
        description: sessionDesc,
        template: "eduwarts_videoconf_2ac98bb4-8d23-4344-8d84-07b278e2d979",
        token: token.data,
      })
    } catch (error) {
      setIsLoading(false)

      setError(true)
    }

    const sessionDate = new Date(dateTime).toString()

    console.log(sessionDate)
    // console.log(room.data);
    const sessionBody = {
      mentor: currentUser._id,
      sessionName: sessionName,
      sessionType: "Group",
      category: category,
      description: sessionDesc,
      sessionLink: `/${room.data.id}`,
      duration: duration,
      startTime: sessionDate.substring(15, 55),
      date: sessionDate.substring(0, 15),
    }
    console.log(room)
    try {
      setIsLoading(true)

      var groupSession = await axios.post(
        `/session/${currentUser._id}`,
        sessionBody
      )
    } catch (error) {
      setIsLoading(false)

      setError(true)
    }

    // console.log(groupSession);

    const usersMail = await axios.get("/users/all");
    setUserMail(usersMail.data);
    console.log(usersMail.data);

   
    setIsLoading(false)

    // window.location.replace(`/session/${groupSession.data._id}`)
  }

  return (
    <div>
      <h2>Let’s publish this session to the community.</h2>
      <Box
        sx={{
          width: "100%",
          border: "1px solid black",
          borderRadius: ".5rem",
          padding: "1rem",
        }}
      >
        <form onSubmit={handleGroupSession}>
          <FormControl
            fullWidth
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div
              className="category_group"
              style={{
                width: "45%",
                minWidth: "300px",
                marginBottom: "1rem",
              }}
            >
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%" }}
              >
                {names.map((element) => (
                  <MenuItem key={element} value={element}>
                    {element}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              className="sessionName_Group "
              style={{
                width: "45%",
                minWidth: "300px",
                marginBottom: "1rem",
              }}
            >
              <TextField
                fullWidth
                required
                label="Session name"
                id="fullWidth"
                onChange={(e) => setSessionName(e.target.value)}
              />
            </div>
            <div
              className="desc_Group"
              style={{
                width: "100%",
                marginBottom: "1rem",
                minWidth: "300px",
              }}
            >
              <TextField
                id="outlined-multiline-flexible"
                label="Description  "
                multiline
                required
                maxRows={4}
                onChange={(e) => setSessionDesc(e.target.value)}
                fullWidth
              />
            </div>
            {/* <PreviewImg ImageCallback={ImageCallback} /> */}
            <div
              className="date_group"
              style={{
                width: "45%",
                minWidth: "300px",
                marginBottom: "1rem",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  renderInput={(params) => <TextField {...params} />}
                  label="Session date and time"
                  value={dateTime}
                  onChange={(newValue) => {
                    setDateTime(newValue)
                  }}
                  minDateTime={dateTime}
                />
              </LocalizationProvider>
            </div>
            <div
              className="duration_group"
              style={{
                width: "45%",
                minWidth: "300px",
                marginBottom: "1rem",
              }}
            >
              <TextField
                id="standard-number"
                label="Duration in mins"
                required
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            {/* {console.log(error)} */}
            <div
              className="buttons_group"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button variant="contained" component={Link} to={"/home"}>
                Go back
              </Button>
              <Button type="submit" variant="contained">
                Publish
              </Button>
            </div>
            {error ? (
              <Popup
                flag={true}
                message={"Something went wrong. Try again later."}
              />
            ) : (
              ""
            )}
          </FormControl>
        </form>
      </Box>
      {isLoading ? <Preloader /> : ""}
    </div>
  )
}
