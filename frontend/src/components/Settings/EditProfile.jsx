import React, { useState } from "react"
import {
  Box,
  FormControl,
  Button,
  TextField,
  Stack,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
  MenuItem,
  Alert,
} from "@mui/material"
import axios from 'axios'
import Preloader from "../PreLoader/Preloader"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const LANGUAGES = [
  "Hindi",
  "English",
  "Chinese",
  "Japanese",
  "Russian",
  "French",
]

const INTERESTS = [
  "Art & Graphic Design",
  "Dance",
  "Music",
  "Photography & Film making",
  "Blockchain",
  "UI/UX",
  "Data Science",
  "Web Development",
  "Buisness Analytics",
  "Content Writing & SEO",
  "Digital Marketing",
  "Information Security",
  "Product Management",
  "Event Management",
  "Competitive Coding",
  "Software Engineering",
  "Interview Preparation",
  "DevOps",
  "Others",
]

const EditProfile = ({ user, userInfo, handleChange }) => {
  const [alert, setAlert] = useState({
    severity: "",
    msg: null,
  })
  const [loading, setLoading] = useState(false)
  const handleClick = async (e) => {
    setLoading(true)
    e.preventDefault()
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }

    const userData = {
      userId: userInfo._id,
      name: user.name,
      bio: user.bio,
      linkedIn: user.linkedIn,
    }

    if (user.language[0]) userData["lOne"] = user.language[0]
    if (user.language[1]) userData["lTwo"] = user.language[1]
    if (user.language[2]) userData["lThree"] = user.language[2]

    if (user.interests[0]) userData["iOne"] = user.interests[0]
    if (user.interests[1]) userData["iTwo"] = user.interests[1]
    if (user.interests[2]) userData["iThree"] = user.interests[2]

    const { data } = await axios.put(`users/${userInfo._id}`, userData, config)
    localStorage.setItem("ed_pr_bk_gj_12_34", JSON.stringify(data.user))
    setLoading(false)
    setAlert({ severity: "success", msg: "Profile Updated Succesfully" })
  }
  return (
    <>
      {alert.msg !== null && (
        <Alert severity={alert.severity}>{alert.msg}</Alert>
      )}
      {user.language.length > 3 && (
        <Alert variant="filled" severity="error">
          Max 3 languages
        </Alert>
      )}
      <Box>
        <FormControl sx={{ marginY: "20px", maxWidth: "80vw" }}>
          <TextField
            id="outlined-name"
            name="name"
            label="Name"
            value={user.name}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="outlined-multiline-static"
            label="Bio"
            name="bio"
            multiline
            rows={4}
            value={user.bio}
            onChange={handleChange}
          />
          <TextField
            sx={{ marginTop: "20px" }}
            id="outlined-name"
            name="linkedIn"
            label="LinkedIn Profile"
            value={user.linkedIn}
            onChange={handleChange}
          />
          <Stack sx={{ marginTop: "20px" }} direction="row" spacing={2}>
            <FormControl sx={{ width: "300px" }}>
              <InputLabel id="demo-multiple-chip-label">Language</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name="language"
                value={user.language}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Language" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {LANGUAGES.map((l) => (
                  <MenuItem
                    key={l}
                    value={l}
                  //style={getStyles(l, personl, theme)}
                  >
                    {l}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "300px" }}>
              <InputLabel id="demo-multiple-chip-label">Interests</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                name="interests"
                value={user.interests}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Interest" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {INTERESTS.map((i) => (
                  <MenuItem
                    key={i}
                    value={i}
                  //style={getStyles(l, personl, theme)}
                  >
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </FormControl>
      </Box>
      <Button onClick={handleClick} variant="contained">
        Submit
      </Button>
      {loading ? <Preloader /> : ""}
    </>
  )
}

export default EditProfile