import React, { useState } from "react"
import { Box, FormControl, TextField, Button, Alert } from "@mui/material"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Preloader from "../PreLoader/Preloader"
import Popup from "../popup-box/Popup"

const EditPassword = () => {
  const [preloader, setPreloader] = useState(false)
  const [error, setError] = useState(false)
  const [errMessage, setErrMessage] = useState("")
  const { user } = useContext(AuthContext)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [userOtp, setUserOtp] = useState("")
  const [alert, setAlert] = useState({
    severity: "",
    msg: null,
  })

  const handleClick = () => {
    setPreloader(true)
    if (password !== "" && password === confirmPassword) {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
      const getOtp = async () => {
        const { data } = await axios.post(
          "email/otp",
          { reciever: user.email },
          config
        )
        setOtp(data)
        setPreloader(false)
      }

      getOtp()
      console.log("mail sent")
    } else {
      setError(true)
      setErrMessage("Password doest not match. Try again...")
      setPreloader(false)
      setConfirmPassword("")
    }
  }

  const handleSubmit = async () => {
    setPreloader(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
    const res = await axios.post(
      `users/${user._id}/updatepassword`,
      { userId: user._id, password: password },
      config
    )
    setPreloader(false)
    if (res.status === 200)
      setAlert({ severity: "success", msg: "Password Updated Succesfully" })
  }

  return (
    <>
      {alert.msg !== null && (
        <Alert severity={alert.severity}>{alert.msg}</Alert>
      )}
      <Box>
        <FormControl sx={{ marginY: "20px", maxWidth: "80vw" }}>
          <TextField
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            name="password"
            type="password"
            placeholder="confirm password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Box marginTop={2}>
            <Button variant="contained" onClick={handleClick}>
              Generate OTP
            </Button>
          </Box>
          {otp !== "" && (
            <Box sx={{ marginY: "10px" }}>
              <TextField
                sx={{ marginTop: "20px" }}
                id="outlined-name"
                name="linkedIn"
                label="Enter Otp"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <Box marginY={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          )}
          {error ? <Popup flag={true} message={errMessage} /> : ""}
        </FormControl>
      </Box>
      {preloader ? <Preloader /> : ""}
    </>
  )
}

export default EditPassword
