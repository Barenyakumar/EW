import React, { useEffect, useState } from 'react'
import './sessiondetail.css'
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import GroupsIcon from '@mui/icons-material/Groups';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import CardHeader from "@mui/material/CardHeader"




// const sessionDetail =
//   {
//     sessionName: "Switching to Freelancing by Barenya Kumar Panda",
//     date: "Jun 30",
//     time: " 8:00pm",
//     sessionImg: "images/1.jpg",
//     sessionLink:"123@ffd",
//     description:
//       " If you have ever wondered what switching to freelancing feels like or if you are one of those brave souls to switch to an independent lifestyle, this session is for you. As the world sees freelancers are lucky souls, I am sure most of you know it's not as easy as it looks.",
//     category: "WEB3",
//     mentor: "12333",
//     coHosts: [
//       "123","234","235","236"
//     ],
//   }



export default function SessionDetails() {
  const {user} = useContext(AuthContext)
  const sessionId = useParams().id;
  const [sessionDetail, setSessionDetail] = useState({})
  const [mentor, setMentor] = useState({})
  const [sessionLink, setSessionLink] = useState("")

  const sessionDate = new Date(sessionDetail.date + sessionDetail.startTime);

  useEffect(() => {
    const getSessionData = async () => {
      const res = await axios.get(`/session/${sessionId}`);
      setSessionDetail(res.data);
      console.log(res.data);
    }
    getSessionData();



  }, [])
  useEffect(() => {
    const getMentor = async () => {
      if (sessionDetail.mentor) {
        const mentor = await axios.get(`/users/${sessionDetail.mentor}`);
        setMentor(mentor.data);
      }
    }
    getMentor();

  }, [sessionDetail])


  const handlejoin = async ()=>{
    const role = user._id === sessionDetail.mentor ?"host":"guest"
    const sessionLink = "https://62bd7a31d93831765b61385f--eduwartsmeet.netlify.app"+sessionDetail.sessionLink+"/"+role;
    console.log(sessionLink);
    window.location.replace(sessionLink);
  }

  const public_folder = "http://localhost:9000/UserImages"
  return (
    <div className="sessionContainer">
      <div className="group_session_title" style={{ marginTop: "1rem" }}>
        <h1>{sessionDetail.sessionName}</h1>
        <div className="group_session_time" style={{ marginTop: "1rem" }}>
          <span>
            {" "}
            <CalendarMonthIcon />
          </span>
          <span>
            {sessionDetail.date} , {sessionDate.toLocaleString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
        <div className="group_session_img" style={{ marginTop: "1rem" }}>
          <img
            src={sessionDetail.sessionImg ? public_folder + sessionDetail.sessionImg : "/images/default-cover.jpg"}
            alt={sessionDetail.title}
            loading="lazy"
            style={{ width: "100%", maxHeight: "50vh" }}
          />
        </div>
        <div className="group_session_desc" style={{ marginTop: "1rem" }}>
          <p>{sessionDetail.description}</p>
        </div>
        <div className="host_name" style={{ marginTop: "1rem" }}>
          <h3>
            <b>Hosted by : </b>
          </h3>
            <CardHeader
          avatar={
            <div className="avatar">
              <Avatar
                alt="Remy Sharp"
                sx={{ bgcolor: "#344CB7 " }}
                src={mentor.profileImage ? public_folder + mentor.profileImage : "/images/3.jpg"}
              />
            </div>
          }
          title={mentor.name}
          subheader={mentor.expertise}
        />
        </div>
        <div className="cohost_name" style={{ marginTop: "0.5rem" }}>
          <h3>
            <b>Cohosted by : </b>
            {/* {sessionDetail.coHosts.map((cohost) => {
                ;<h4>{cohost}</h4>
              })} */}
          </h3>
        </div>
        <div className="group_topic_of_disc">
          <h3>
            <b>Topic of discussion : </b>
            {sessionDetail.category}
          </h3>
        </div>
        {/* sessionDetail.cohost ? <h3>Hosted by: {sessionDetail.host}</h3> : "" */}
      </div>
      <div className="sessionButtons">
        <Button variant='outlined' component ={Link} to={"/groupsession"} size='large'>< KeyboardBackspaceIcon /></Button>
        <Button variant='contained' size='large'><span style={{ margin: "0px .5rem" }} onClick={handlejoin}>Join Session</span><GroupsIcon /></Button>
      </div>
    </div>
  )
}


