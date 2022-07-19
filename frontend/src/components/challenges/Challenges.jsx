import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Tabs, Tab, Typography, Box, Button } from "@mui/material"
// import SearchBar from "../searchBar/SearchBar"
import { SwiperChallenge } from "../Swiper/Swiper"
import MuiCardComplex from "../muiCard/MuiCardComplex"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      category="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

const challengeList = [
  {
    mentor: "ARTsian Challenge",
    challengeName: "ARTsian Challenge",
    category: "Time limit : 24hrs",
    endDate: "24th",
    endTime: "2015-07",
    description: "By Kumar Barenya",
    challengeImg: "m3.jfif",
  },
  {
    mentor: "ARTsian Challenge",
    challengeName: "ARTsian Challenge",
    category: "Time limit : 24hrs",
    endDate: "24th",
    endTime: "2015-07",
    description: "By Kumar Barenya",
    challengeImg: "m4.jfif",
  },
  {
    mentor: "ARTsian Challenge",
    challengeName: "ARTsian Challenge",
    category: "Time limit : 24hrs",
    endDate:"24th",
    endTime: "2015-07",
    description: "By Kumar Barenya",
    challengeImg: "m5.jfif",
  },
  {
    mentor: "ARTsian Challenge",
    challengeName: "ARTsian Challenge",
    category: "Time limit : 24hrs",
    endDate:"24th",
    endTime: "2015-07",
    description: "By Kumar Barenya",
    challengeImg: "m6.jfif",
  },
] 


export default function Challenges() {
  const {user} = useContext(AuthContext)
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const [upcomingChallenges, setUpcomingChallenges] = useState([])
  const [pastChallenges, setPastChallenges] = useState([])

  useEffect(() => {
    const upcomingChallengeList = async () => { 
      const res = await axios.get("/challenge/activeChallenges")
      setUpcomingChallenges(res.data)
    }

    const pastChallengeList = async () => {
      const res = await axios.get("/challenge/pastChallenges")
      setPastChallenges(res.data)
    }

    upcomingChallengeList()
    pastChallengeList()
    
  }, [])
  

  return (
    <div className="Challenges">
      <h1>Explore Challenges</h1>
      <h3>Participate in challenges</h3>
      {user.isMentor ? (
        <Button
          variant="outlined"
          component={Link}
          to={"/createnewchallenge"}
          style={{
            float: "right",
          }}
        >
          Create challenge
        </Button>
      ) : (
        ""
      )}
      <div style={{ height: "100%", width: "100%" }}>
        {/* <SearchBar /> */}

        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Upcoming" {...a11yProps(0)} />
              <Tab label="Past" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <SwiperChallenge arrayList={upcomingChallenges} />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <SwiperChallenge arrayList={pastChallenges} />
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  )
}
