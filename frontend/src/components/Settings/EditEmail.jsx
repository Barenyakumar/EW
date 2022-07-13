import React, { useContext, useState } from "react"
import { FormControl, TextField, Button, Box } from "@mui/material"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
// import DoneIcon from '@mui/icons-material/Done';

const EditEmail = () => {
  const { user } = useContext(AuthContext)

  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [OTP, setOTP] = useState("")
  const [pass, setPass] = useState("")

  async function handleEmailOtp() {
    // console.log(email)
    const res = await axios.post("email/otp", {
      reciever: email,
    })
    setOTP(res.data)
  }

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  const handleEmailChange = async () => {
    // console.log("hey")
    if (OTP === otp) {
      // console.log("matched!!!")
      const emailres = await axios.post(
        `users/${user._id}/updatemail`,
        {
          userId: user._id,
          password: pass,
          email: email,
        },
        config
      )
      // console.log(emailres.data)
    } 
    else
      // console.log("otp not matched" + OTP)
  }
  return (
    <>
      <Box>
        <FormControl>
          <TextField
            sx={{ width: "300px", margin: "1rem" }}
            id="outlined-name"
            name="email"
            label=" New Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleEmailOtp}>send otp</Button>
          <TextField
            sx={{ width: "300px", margin: "1rem" }}
            id="outlined-name"
            name="OTP"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <TextField
            sx={{ width: "300px", margin: "1rem" }}
            id="outlined-name"
            name="password"
            label="Enter Password"
            value={pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
          />
        </FormControl>
      </Box>
      <Button
        sx={{ marginTop: "20px" }}
        variant="contained"
        onClick={handleEmailChange}
      >
        Submit
      </Button>
    </>
  )
}

export default EditEmail
