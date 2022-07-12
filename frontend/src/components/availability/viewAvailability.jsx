import React, { useState, useRef, useEffect, useContext } from "react"
import "./availability.css"
import { Button } from "@mui/material"
import AvailableDay from "./AvailableDay"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function ViewAvailability(props) {
  // const [toggle, setToggle] = useState(false)
  // const [startTime,setStartTime] = useState([])
  // const newTimeArr = []
  // const timeslotDiv = useRef()

  // const [slot, setSlot] = useState({
  //   day: "",
  //   timeSlotStart: "",
  //   timeSlotEnd: "",
  // })

  // let name, value;
  // const handleChange = (e) => {
  //   console.log(e)
  //   name = e.target.name
  //   value = e.target.value
  //   setSlot({...slot, [name]:value})
  // }

  // const element = []

  const { user } = useContext(AuthContext)

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const current = new Date()
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`

  const [availableSlot, setAvailableSlot] = useState([])
  useEffect(() => {
    const getSlot = async () => {
      const res = await axios.get(`/availability/${user._id}`)
      setAvailableSlot(res.data)
      console.log(res.data)
    }
    getSlot()
  }, [])

  return (
    <div className="avialability-container">
      <div className="avialability-heading">
        <h3 style={{ fontSize: "1.5rem" }}>Your availability</h3>
        {user._id === props.currentUser._id ? (
          <Button
            variant="outlined"
            onClick={() => props.availabilityCallback(true)}
          >
            Edit
          </Button>
        ) : (
          ""
        )}
      </div>

      {availableSlot.map((elem) => {
        return (
          <>
            <div className="available-days-timeSlots">
              <div className="avialable-days">
                <p>{elem.date.substring(4, 16)}</p>
                <h3>
                  {new Date(elem.date).toLocaleDateString("default", {
                    weekday: "long",
                  })}
                </h3>
              </div>
              <div className="availabile-timeSlots">
                {elem.startTime.map((time) => {
                  return <div className="startTime">{time}</div>
                })}
              </div>
            </div>
          </>
        )
      })}
      <hr></hr>
    </div>
  )
}
