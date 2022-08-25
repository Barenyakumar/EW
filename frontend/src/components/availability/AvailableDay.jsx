import React, { useState, useRef, useEffect } from "react"
import Timeslot from "../timeRange/Timeslot"
import AddIcon from "@mui/icons-material/Add"
import DoneIcon from "@mui/icons-material/Done"
import CloseIcon from "@mui/icons-material/Close"
import "./availability.css"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function AvailableDay(props) {
  const preSetTimeSolt = [
    "1:00 AM",
    "1:30 AM",
    "2:00 AM",
    "2:30 AM",
    "3:00 AM",
    "3:30 AM",
    "4:00 AM",
    "4:30 AM",
    "5:00 AM",
    "5:30 AM",
    "6:00 AM",
    "6:30 AM",
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 AM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
    "5:00 PM",
    "5:30 PM",
    "6:00 PM",
    "6:30 PM",
    "7:00 PM",
    "7:30 PM",
    "8:00 PM",
    "8:30 PM",
    "9:00 PM",
    "9:30 PM",
    "10:00 PM",
    "10:30 PM",
    "11:00 PM",
    "11:30 PM",
    "12:00 PM",
    "12:30 AM",
  ]

  let day = new Date(props.weekday).toString()
  day = day.substring(0, 15)
  const { user } = useContext(AuthContext)

  const [slotSelection, setSlotSelection] = useState({})

  const [toggle, setToggle] = useState(false)

  const [startTimeArr, setStartTimeArr] = useState([])
  const [endTimeArr, setEndTimeArr] = useState([])

  const [timeElemToBeDeleted, setTimeElemToBeDeleted] = useState([])

  const newTimeElemCallback = (data) => {
    setTimeElemToBeDeleted(data)
    const index1 = startTimeArr.indexOf(data[0])
    if (index1 >= 0) {
      // console.log(index + " " + timeElemToBeDeleted)
      startTimeArr.splice(index1, 1)
    }
    const index2 = endTimeArr.indexOf(data[1])
    if (index2 >= 0) {
      // console.log(index + " " + timeElemToBeDeleted)
      endTimeArr.splice(index2, 1)
    }
  }

  const startTime = useRef()
  const endTime = useRef()

  const newTime = () => {
    const time = startTime.current.value
    setStartTimeArr([...startTimeArr, time])
    const end_time = endTime.current.value
    setEndTimeArr([...endTimeArr, end_time])

    handleClose()

    // console.log(startTimeArr)
  }

  useEffect(() => {
    setSlotSelection({
      date: day,
      startTime: startTimeArr,
      endTime: endTimeArr,
      mentorId: user._id,
    })
  }, [startTimeArr, endTimeArr])

  useEffect(() => {
    if (slotSelection.startTime && slotSelection.endTime)
      props.timeSlotArrCallback(slotSelection)
  }, [timeElemToBeDeleted, slotSelection])

  // console.log(slotSelection)
  let i = 0

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // console.log(props.weekday)
  // const saveSlot = () => {

  // }

  useEffect(() => {
    if (!toggle) {
      setSlotSelection({
        date: day,
        mentorId: user._id,
        startTime: [],
        endTime: [],
      })
    }
  }, [toggle])

  return (
    <div className="set-available-hours">
      <div className="set-available-hours-form-days">
        <div className="set-available-hours-form">
          <label className="switch">
            <input
              type="checkbox"
              onChange={() => {
                setToggle(!toggle)
              }}
              name="day"
            />

            <span className="slider round"></span>
          </label>
        </div>

        <div className="set-available-hours-form-label">
          <h3 style={{ fontSize: "1rem" }}>
            {new Date(day).toLocaleDateString("default", { weekday: "short" })}
          </h3>
          <h3 style={{ fontSize: ".8rem" }}>
            {/* {day.getDate()} , {months[day.getMonth()]} */}
            {day.substring(4, 16)}
          </h3>
        </div>
      </div>

      <div className="set-available-hours-form-time-list">
        <div className="availability-toogle">
          {toggle ? (
            startTimeArr.map((time, index) => {
              return (
                <Timeslot
                  startTime={time}
                  endTime={endTimeArr[index]}
                  key={index}
                  deleteCallback={newTimeElemCallback}
                />
              )
            })
          ) : (
            <h3 style={{ margin: "0px 1rem", fontSize: ".8rem" }}>
              Not Available
            </h3>
          )}
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{ width: "20rem", height: "15rem", margin: "0px auto" }}
          >
            <h3 style={{ fontSize: "1.5rem" }}>Select slot</h3>
            <div
              className="set-available-hours-form-time available"
              style={{
                height: "60%",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <div className="fromTime">
                <select
                  name="fromTime"
                  id="fromTime"
                  ref={startTime}
                  style={{
                    border: "1px solid grey",
                    height: "3rem",
                    width: "7rem",
                    color: "grey",
                    fontSize: "1.2rem",
                    outline: "none",
                  }}
                >
                  {preSetTimeSolt.map((slot) => {
                    return <option value={slot}>{slot}</option>
                  })}
                </select>
              </div>
              <div style={{ fontSize: "1.2rem", color: "grey" }}>to</div>
              <div className="toTime">
                <select
                  name="toTime"
                  id="toTime"
                  ref={endTime}
                  style={{
                    border: "1px solid grey",
                    height: "3rem",
                    width: "7rem",
                    color: "grey",
                    fontSize: "1.2rem",
                    outline: "none",
                  }}
                >
                  {preSetTimeSolt.map((slot) => {
                    return <option value={slot}>{slot}</option>
                  })}
                </select>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button variant="outlined" onClick={newTime}>
                <DoneIcon />
              </Button>
              <Button variant="outlined" onClick={handleClose}>
                <CloseIcon />
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="set-available-hours-form-addanother">
        <Button
          disabled={!toggle}
          variant="outlined"
          onClick={handleClickOpen}
          size="small"
          sx={{ margin: "0px 10px" }}
        >
          <AddIcon fontSize="small" />
        </Button>
        {/* <Button disabled={!toggle}  onClick={saveSlot}>
          Done
        </Button> */}
      </div>
    </div>
  )
}
