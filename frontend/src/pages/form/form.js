import React, { useState } from "react";
import {useParams, useNavigate} from 'react-router-dom'
import { Rating } from "react-simple-star-rating";
import "./Form.css";
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useContext } from "react"
import { TextField} from "@mui/material"

export default function Form() {

  const navigate = useNavigate();
    // const { sessionId } = useParams();
    const {id, mentorId} = useParams()
    // console.log(sessionId)
  const [rating1, setRating1] = useState(100);
  const handleRating1 = rate => {
    setRating1(rate);
  };
  const [rating2, setRating2] = useState(100);
  const handleRating2 = rate => {
    setRating2(rate);
  };
  const [rating3, setRating3] = useState(100);
  const handleRating3 = rate => {
    setRating3(rate);
  };
  const [rating4, setRating4] = useState(100);
  const handleRating4 = rate => {
    setRating4(rate);
  };

  const [anythingForHost, setAnythingForHost] = useState("")
  const [otherFeedbacks, setOtherFeedbacks] = useState("")
 
  const { user: CurrentUser } = useContext(AuthContext)

  const updateMentorRating = async () => {
    const mentorRatingAPI = await axios.get(`/session/mentor/${mentorId}`)
    const upd = await axios.patch(`/auth/rating/${mentorId}`, {mentorRating: mentorRatingAPI.data})
  }

  const Submit =  async (e) =>{
    e.preventDefault()
    try{
        var feedback= await axios.post(`/feedback/${CurrentUser._id}`,{
            session_id: id,
            mentorId: mentorId,
            overall_experience: (rating1/20),
            ui_experience: (rating2/20),
            session_informative_experience: (rating3/20),
            liking_mentor_experience: (rating4/20),
            about_host: anythingForHost,
            other_feedback: otherFeedbacks
        });
        // console.log("done"+feedback)
        updateMentorRating()
        navigate(-1)
    }catch(error){
        console.log(error)
    }
  }

   console.log(CurrentUser)

  return (
    <div className="form">
      <h1>Leave Feedback</h1>
      <p
        style={{
          textAlign: "center",
          background: "lightblue",
          padding: "20px",
          borderRadius: "20px",
        }}
      >
        We Value your feedback.
        <br />
        Please complete the following form and help us to improve our customer
        experience.
      </p>
      <div className="radio-btn">
        <form>
          <div className="stars">
            <label>Overall experince experience</label>
            <Rating onClick={handleRating1} ratingValue={rating1} />
          </div>
          <div className="stars">
            <label>Ui experience</label>
            <Rating onClick={handleRating2} ratingValue={rating2} />
          </div>
          <div className="stars">
            <label>Session informative</label>
            <Rating onClick={handleRating3} ratingValue={rating3} />
          </div>
          <div className="stars">
            <label>Did you like the mentor</label>
            <Rating onClick={handleRating4} ratingValue={rating4} />
          </div>
          <div className="stars">
            <TextField
                id="outlined-multiline-flexible"
                label="Anything For Host"
                multiline
                maxRows={4}
                onChange={(e) => setAnythingForHost(e.target.value)}
                fullWidth
              />
          </div>
          <div className="stars">
            <TextField
                id="outlined-multiline-flexible"
                label="Other Feedbacks"
                multiline
                maxRows={4}
                onChange={(e) => setOtherFeedbacks(e.target.value)}
                fullWidth
              />
          </div>
        </form>
      </div>
      <div style={{ width: "100%" }}>
        <button class="button-5" role="button" onClick={Submit}>
          Submit
        </button>
      </div>
    </div>
  );
}