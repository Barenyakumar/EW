import React, { useState, useEffect, useContext } from "react"
import { Box, Tabs, Tab, Button, Typography } from "@mui/material"
import { AuthContext } from "../../context/AuthContext"
import EditProfile from "../../components/Settings/EditProfile"
import EditEmail from "../../components/Settings/EditEmail"
import EditPassword from "../../components/Settings/EditPassword"
import EditImage from "../../components/Settings/EditImage"

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

function TabPanel(props) {
  const { children, value, index, ...other } = props
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className="bdContainer"
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Setting = () => {
  const [value, setValue] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }
  const [user, setUser] = useState({
    name: "",
    email: "",
    bio: "",
    language: [],
    interests: [],
    linkedIn: "",
  })
  const { user: userInfo } = useContext(AuthContext)

  console.log(user)
  useEffect(() => {
    setUser({
      name: userInfo.name,
      email: userInfo.email,
      bio: userInfo.bio,
      language: userInfo.language,
      interests: userInfo.interests,
      linkedIn: userInfo.otherLinks,
    })
  }, [])
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleTabChange}
          aria-label="basic tabs example"
          fullWidth={true}
        >
          <Tab label="Edit Profile" {...a11yProps(0)} />
          <Tab label="Edit Email" {...a11yProps(1)} />
          <Tab label="Edit Password" {...a11yProps(2)} />
          <Tab label="Upload Images" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EditProfile
          userInfo={userInfo}
          user={user}
          handleChange={handleChange}
          setUser={setUser}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EditEmail email={user.email} handleChange />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EditPassword />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EditImage />
      </TabPanel>
    </>
  )
}

export default Setting
