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
  const { id: mentor } = useParams()
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [description, setDescription] = useState("")
  const [alert, setAlert] = useState({ severity: "", msg: null })

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

  const handleClick = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const getEndTime = (time) => {
      const i = time.indexOf(":")
      const newTime = time.substring(0, i + 1) + "3" + time.substring(i + 2)
      return newTime
    }

    const body = {
      mentor: mentor,
      sessionType: "OneToOne",
      category: category,
      startTime: time,
      endTime: getEndTime(time),
      date: date,
      description: description,
    }
    // console.log(body)

    const { data, status } = await axios.post(
      `/session/${userInfo._id}`,
      body,
      config
    )
    const { data: bookingData } = await axios.post(
      "/booking/",
      { sessionId: data._id, mentorId: mentor },
      config
    )
    // console.log(bookingData)
    if (status === 201 || 200) {
      setAlert({
        severity: "success",
        msg: "Booking session confirmed",
      })
      setTimeout(() => {
        navigate(-1)
      }, 500)
    }
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
              <Button variant="contained" onClick={handleClick}>
                Confirm
              </Button>
            </Box>
          </>
        )}
      </Box>
    </div>
  )
}

export default BookingSessionPage
