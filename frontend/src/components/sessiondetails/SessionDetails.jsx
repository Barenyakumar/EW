import React from 'react'
import './sessiondetail.css'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

const sessiondetail = [
  {
    sessionName: "Switching to Freelancing by Barenya Kumar Panda",
    date: "Jun 30",
    time: " 8:00pm",
    sessionImg: "images/1.jpg",
    sessionLink:"123@ffd",
    description:
      " If you have ever wondered what switching to freelancing feels like or if you are one of those brave souls to switch to an independent lifestyle, this session is for you. As the world sees freelancers are lucky souls, I am sure most of you know it's not as easy as it looks.",
    category: "WEB3",
    mentor: "12333",
    coHosts: [
      "123","234","235","236"
    ],
  },

]



export default function SessionDetails() {
  return (
    <div className="sessionContainer">
      {sessiondetail.map((item) => (
        <div className="group_session_title" style={{ marginTop: "1rem" }}>
          <h1>{item.sessionName}</h1>
          <div className="group_session_time" style={{ marginTop: "1rem" }}>
            <span>
              {" "}
              <CalendarMonthIcon />
            </span>
            <span>
              {item.date} , {item.time}
            </span>
          </div>
          <div className="group_session_img" style={{ marginTop: "1rem" }}>
            <img
              src={item.sessionImg}
              alt={item.title}
              loading="lazy"
              style={{ width: "100%", maxHeight: "50vh" }}
            />
          </div>
          <div className="group_session_desc" style={{ marginTop: "1rem" }}>
            <p>{item.description}</p>
          </div>Q
          <div className="host_name" style={{ marginTop: "1rem" }}>
            <h3>
              <b>Hosted by : </b>
              {item.mentor}
            </h3>
          </div>
          <div className="cohost_name" style={{ marginTop: "0.5rem" }}>
            <h3>
              <b>Cohosted by : </b>
              {item.coHosts.map((cohost) => {
                ;<h4>{cohost}</h4>
              })}
            </h3>
          </div>
          <div className="group_topic_of_disc">
            <h3>
              <b>Topic of discussion : </b>
              {item.category}
            </h3>
          </div>
          {/* item.cohost ? <h3>Hosted by: {item.host}</h3> : "" */}
        </div>
      ))}
    </div>
  )
}


