import { Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { MenteeBadge, MentorBadge } from "../badges/MentorBadge"

// role is the generic name for mentor role/ chllanges timelimit/ session time
// name is the generic name for metor name/ challanges title, session title
// bio is the generic name for mentor bio/ challanges organiser/ session organiser

import "./Card.css"

export default function SingleCard(props) {
  const [cardStyle, setCardStyle] = useState({})
  useEffect(() => {
    if (props.height || props.width) {
      setCardStyle({
        height: props.height,
        width: props.width,
        margin: ".3rem .5rem",
      })
      // console.log("run" + cardStyle)
    }
  }, [props])

  // const arrElem = {};
  // if (props.element.mentorName)
  //   arrElem.Name = props.element.mentorName;
  // else if (props.element.challangeName)
  //   arrElem.Name = props.element.challangeName;
  // else if (props.element.sessionTitle)
  //   arrElem.Name = props.element.sessionTitle;

  const publicFolder = "http://localhost:9000/UserImages/"

  return (
    <Link to={`/profile/${props.element.username}`}>
      <div className="cardcontainer" style={cardStyle}>
        <div className="img">
          <img
            src={
              props.element.profileImage
                ? publicFolder + props.element.profileImage
                : `/Avatars/${props.element.gender}/${props.element.defaultImage}`
            }
            alt=""
          />

          <div className="des">
            <div className="name">
              <span className="mentor_List element">{props.element.name}</span>
              <div style={{display: 'flex', alignItems: 'flex-end',justifyContent: 'space-between', width:"100%"}}>

              <span className="role element">{props.element.username}</span>
              {props.element.isMentor ? (
                <div className="mentor_Badge">
                  <MentorBadge />
                  <span className="role element">
                    {props.element.expertise}
                  </span>
                </div>
              ) : (
                <MenteeBadge />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
export function SessionCard(props) {
  const [cardStyle, setCardStyle] = useState({})
  const { user } = useContext(AuthContext)
  useEffect(() => {
    if (props.height || props.width) {
      setCardStyle({
        height: props.height,
        width: props.width,
        margin: ".3rem .5rem",
      })
      // console.log("run" + cardStyle)
    }
  }, [props])

  // const arrElem = {};
  // if (props.element.mentorName)
  //   arrElem.Name = props.element.mentorName;
  // else if (props.element.challangeName)
  //   arrElem.Name = props.element.challangeName;
  // else if (props.element.sessionTitle)
  //   arrElem.Name = props.element.sessionTitle;

  const publicFolder = "http://localhost:9000/UserImages/"
  const role = user
    ? user._id === props.element.mentor
      ? "host"
      : "guest"
    : ""
  return (
    <Link to={`/getsession/${props.element._id}`}>
      <div className="cardcontainer" style={cardStyle}>
        <div className="img">
          <img
            src={
              props.element.sessionImg
                ? publicFolder + props.element.sessionImg
                : "/images/default-cover.jpg"
            }
            alt=""
          />

          <div className="des">
            <div className="name">
              <span className="mentor_List element">
                {props.element.sessionName}
              </span>
              <span className="role element">
                {props.element.date},{" "}
                {new Date(
                  props.element.date + props.element.startTime
                ).toLocaleString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <div className="sessionListDesc">
                <span className="role element">{props.element.category}</span>
                <span className="role element">
                  {props.element.duration} mins
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
