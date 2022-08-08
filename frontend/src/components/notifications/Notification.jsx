// import React, { useEffect, useState } from "react"
// import "./notification.css"
// import { NotificationElement } from "../notification_element/NotificationElement"

// const bookings = [
//   { read: 1, mentorName: "Debraj Bhal2", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal4", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal1", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal3", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal3", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal3", image: "i3.jpg" },
//   { read: 1, mentorName: "Debraj Bhal3", image: "i3.jpg" },
//   { read: 0, mentorName: "Debraj Bhal", image: "i3.jpg" },
// ]
// export default function Notification(props) {
//   function sortOrder(prop) {
//     return function (a, b) {
//       if (a[prop] > b[prop]) return 1
//       else if (a[prop] < b[prop]) return -1
//       else return 0
//     }
//   }
//   return (
//     <div className="Notification">
//       <div className="notificationHeader">
//         <h2>My Notifications</h2>
//         <span>You can check all your notifications from here</span>
//       </div>
//       <div className="notificationContent">
//         <div className="notificationElem ">
//           <div className="notificationElemContent">
//             {/* { console.log(bookings) } */}
//             {bookings.sort(sortOrder("read")).map((booking) => (
//               <NotificationElement booking={booking} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
