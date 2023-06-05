import React, { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
  Alert,
} from "@mui/material"
import Booking from "../../components/bookings/Booking"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

const categoryArr = [
  "python",
  "react",
  "node Js",
  "Cyber security",
  "MongoDB",
  "RDBMS",
  "Big Data",
  "Cloud Computing",
  "Hadoop",
]

const BookingSessionPage = () => {

  const { user: currentUser } = useContext(AuthContext);
  const { id: mentor } = useParams()
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [alert, setAlert] = useState({ severity: "", msg: null })
  const [joinAlert, setJoinAlert] = useState(false)
  const navigate = useNavigate()

  // getting mentor's availability
  const [availableSlot, setAvailableSlot] = useState([])

  useEffect(() => {
    async function getAvailabilty() {
      const res = await axios.get(`/availability/${mentor}`)
      setAvailableSlot(res.data)
      // console.log(res.data)
    }
    getAvailabilty()
  }, [])

  const { user: userInfo } = useContext(AuthContext)

  const handleClick2 =  () => {
    console.log("first")
    // alert("You have scheduled a meet with you mentor with meet link:\n https://meet.google.com/ytj-rmtf-qij?authuser=0")

    // window.open("https://meet.google.com/ytj-rmtf-qij?authuser=0", "_blank")
    setJoinAlert(true)
  }

  const handleClick = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }





    try {
      var token = await axios.get("/session/token")
    } catch (error) {
      console.log(error);
    }

    try {

      var room = await axios.post("/session/createroom", {
        name: Date.now().toString(),
        description: description,
        template: "eduwarts_videoconf_2ac98bb4-8d23-4344-8d84-07b278e2d979",
        token: token.data,
      })
    } catch (error) {
      console.log(error);

    }




    const body = {
      mentor: mentor,
      sessionName: "One to One session",
      sessionType: "OneToOne",
      category: category,
      sessionImg: `/groupSession/${category}.jpg`,
      startTime: time,
      sessionLink: `/${room.data.id}`,
      date: date,
      description: description,
      duration: 30
    }

    // console.log(body)

    const { data, status } = await axios.post(
      `/session/one/${userInfo._id}`,
      body,
      config
    )




    try {

      var groupSession = await axios.post(
        `/session/${currentUser._id}`,
        body
      )
    } catch (error) {
      console.log(error);
    }



    // // console.log(bookingData)
    // if (status === 201 || 200) {
    //   setAlert({
    //     severity: "success",
    //     msg: "Booking session confirmed",
    //   })
    //   setTimeout(() => {
    //     navigate(-1)
    //   }, 500)
    // }

    // setIsLoading(false)

    window.location.replace(`/getsession/${groupSession.data._id}`)
  }

  return (
    <div
      style={{
        height: "calc(92vh - 22px)",
        overflow: "hidden",
        position: "relative",
        top: "25px",
      }}
    >
      {alert.msg !== null && (
        <Alert severity={alert.severity}>{alert.msg}</Alert>
      )}
      <Box>
        <h3>Create 1:1 session bookings</h3>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Choose a category
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Choose a category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryArr.map((d, i) => (
              <MenuItem key={i} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-helper-label">
            Select A Date
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={date}
            label="Select A Date"
            onChange={(e) => setDate(e.target.value)}
          >
            {availableSlot.map((d) => (
              <MenuItem key={d.date} value={d.date}>
                {d.date}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {date !== "" && (
          <>
            <FormControl sx={{ m: 1, minWidth: 300 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Select A Time
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={time}
                label="Select A Date"
                onChange={(e) => setTime(e.target.value)}
              >
                {availableSlot
                  .find((d) => d.date === date)
                  .startTime.map((t, i) => (
                    <MenuItem key={i} value={t}>
                      {t}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </>
        )}
        {time && (
          <>
            <Box marginTop={2}>
              <TextField
                sx={{ width: "70%" }}
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
                <Box margin={2}>
                  <Button variant="contained" onClick={handleClick2}>
                    Confirm
                  </Button>
                </Box>
                {

                  joinAlert?<Alert >"You have scheduled a meet with you mentor with meet link:\n https://meet.google.com/ytj-rmtf-qij?authuser=0"</Alert>:""
                }
              </>
        )}
            </Box>
          </div>
        )
        }

        export default BookingSessionPage
