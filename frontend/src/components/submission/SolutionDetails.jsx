import { Avatar, CardHeader } from "@mui/material"
import './submitchallenge.css'
import React, { useContext } from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
const axios = require("axios")

export default function SolutionDetails() {
  const { user } = useContext(AuthContext)
  const [submissionDetails, setSubmissionDetails] = useState([])
  const { id: solutionId } = useParams()
  const [participant, setParticipant] = useState({})
  const [challenge, setChallenge] = useState({})
  useEffect(() => {
    const getsolutionData = async () => {
      try {
        const res = await axios.get(`/submitchallenge/${solutionId}/`)
        console.log(res.data)
        setSubmissionDetails(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getsolutionData()
  }, [])
  useEffect(() => {
    const getchallenge = async () => {
      if (submissionDetails) {
        try {
          const res = await axios.get(
            `/challenge/${submissionDetails.challengeId}`
          )
          setChallenge(res.data)
          const participant = await axios.get(
            `/users/${submissionDetails.participantId}`
          )
          setParticipant(participant.data)
        } catch (error) {}
      }
    }
    getchallenge()
  }, [submissionDetails])

  const public_folder = "http://localhost:9000/UserImages/"
  return (
    <div>
      <div className="solutionbody" style={{ width: "100%" }}>
        <div className="aboutProfile">
          <Avatar
            alt="Remy Sharp"
            sx={{ bgcolor: "#344CB7 " }}
            src={
              user.profileImage
                ? public_folder + user.profileImage
                : `/Avatars/${user.gender}/${user.defaultImage}`
            }
          />
          <span style={{ fontSize: "1.5rem" }}>{participant.name}</span>
        </div>
        <img
          src={public_folder + submissionDetails.solutionImg}
          alt=""
          style={{ width: "100%", maxWidth: "30rem", margin: "0px auto" }}
        />
        <p>{submissionDetails.solutionDesc}</p>
      </div>
      <div className="aboutContainer" style={{margin:"1rem 0px"}}>
        Submitted on: 
        <h2>{challenge.challengeName}</h2>
      </div>
    </div>
  )
}
