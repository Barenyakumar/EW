import React from 'react'
import PropTypes from "prop-types"
import {
  Tabs,
  Tab,
  Typography,
  Box,
  
} from "@mui/material"
import PostList from '../postList/PostList'
import MuiCardComplex from '../muiCard/MuiCardComplex'
import './myprofile.css'


function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

export default function MyProfile() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="MyProfile">
      <h2>My Profile</h2>
      <span>All posts and challenges will be be visible here</span>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Posts" {...a11yProps(0)} />
            <Tab label="Challenges" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <PostList />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="MuiCardComplex">
            {mychallenges.map((elem) => (
              <div className="singleComplexCard">
                <MuiCardComplex element={elem} />
              </div>
            ))}
          </div>
        </TabPanel>
      </Box>
    </div>
  )
}


const mychallenges = [
  {
    id: 1,
    img:"3.jpg",
    challengeName: "Canvas Challenge",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
  },
  {
    id: 2,img:"3.jpg",
    challengeName: "Canvas Challenge",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
  },
  {
    id: 3,img:"3.jpg",
    challengeName: "Canvas Challenge",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
  },
  {
    id: 4,img:"3.jpg",
    challengeName: "Canvas Challenge",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
  },
  {
    id: 5,img:"3.jpg",
    challengeName: "Canvas Challenge",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
  },
]