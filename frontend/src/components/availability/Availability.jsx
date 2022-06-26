import React, { useState, useRef } from "react"
import "./availability.css"

import AvailableDay from "./AvailableDay"
import ViewAvailability from "./viewAvailability"
import EditAvailability from "./editAvailability"
 
export default function Availability(props) {
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

  const [availabilityFlag, setAvailabilityFlag] = useState(false)
  const availabilityCallback = (data) => {
    setAvailabilityFlag(data)
  }
  console.log(availabilityFlag)

  return (
    <div className="availabilityContent">
      {!availabilityFlag ? (
        <ViewAvailability availabilityCallback={availabilityCallback} currentUser ={props.CurrentUser} />
      ) : (
        <EditAvailability availabilityCallback={availabilityCallback} />
      )}
    </div>
  )
}
