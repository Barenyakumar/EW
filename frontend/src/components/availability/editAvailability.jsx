// import React, { useState } from "react"
// import "./availability.css"
// import AvailableDay from "./AvailableDay"
// import { Button } from "@mui/material"
// import axios from "axios"

// const weekday = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ]

// export default function EditAvailability(props) {
//   const current = new Date()
//   // const currentDate = `${current.getDate()}/${
//   //   current.getMonth() + 1
//   //   }/${current.getFullYear()}`

//   // const startDay = current.getDay(current.getMonth()+ 2 + " " + current.getDate() + " " + current.get)

//   const weekArr = [
//     current.setDate(current.getDate() + 2),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//     current.setDate(current.getDate() + 1),
//   ]

//   const [timeSlotArr, setTimeSlotArr] = useState([])

//   const timeSlotArrCallback = (data) => {
//     setTimeSlotArr([...timeSlotArr, data])
//   }

//   // console.log(timeSlotArr)
//   const handleEditAvailability = async () => {
//     for (let i = 0; i < timeSlotArr.length; i++) {
//       const res = await axios.post("/availability/", timeSlotArr[i])
//       // console.log(res.data)
//     }
//   }

//   return (
//     <div className="edit-avialability-container">
//       <div className="avialability-heading">
//         <h1> Set your availability</h1>
//       </div>
//       <div className="availability-btn">
//         <Button
//           variant="outlined"
//           onClick={() => props.availabilityCallback(false)}
//         >
//           {" "}
//           Go back
//         </Button>{" "}
//         <Button variant="outlined" onClick={handleEditAvailability}>
//           Apply Changes
//         </Button>
//       </div>

//       <div className="available-hours">
//         {weekArr.map((day) => {
//           return (
//             <AvailableDay
//               weekday={day}
//               timeSlotArrCallback={timeSlotArrCallback}
//             />
//           )
//         })}
//       </div>
//     </div>
//   )
// }
