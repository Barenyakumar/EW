import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiCard from "../muiCard/MuiCard"
import "./booking.css"
import { useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

const card = (
  <React.Fragment>
    <CardContent>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        Mentorship session with Amisha
      </Typography>
      <Typography sx={{ fontSize: 14 }} component="div">
        Mar 28,2022 at 6.30pm
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Notes added: I am trying to learn about UX but there is no valid
              resources anywhere. I can’t understand where ti start end. Please
              help me out.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Send email</Button>
      <Button size="small">Reschedule this session</Button>
    </CardActions>
    <CardActions>
      <Button size="small" color="error">
        Cancel
      </Button>
    </CardActions>
  </React.Fragment>
)

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

export default function Booking() {
  const [value, setValue] = React.useState(0)
  const [sessionList, setSessionList] = useState([])
  const [upcomingSession, setUpcomingSession] = useState([])
  const [pendingSession, setPendingSession] = useState([])
  const { user: CurrentUser } = useContext(AuthContext)

  useEffect(() => {
    async function getSessionData() {
      const res = await axios.get(`/booking/${CurrentUser._id}`)
      setSessionList(res.data)
      sessionList.forEach(async (element) => {
        if (element.isApproved) {
          let result = await axios.get(`/session/${element.sessionId}`)
          let dummy = [...upcomingSession, result.data]
          setUpcomingSession(dummy)
        } else {
          let result = await axios.get(`/session/${element.sessionId}`)
          let dummy = [...pendingSession, result.data]
          setPendingSession(dummy)
        }
      })
    }

    getSessionData()
  }, [sessionList, upcomingSession, pendingSession])

  console.log(pendingSession)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="Booking">
      <h2>Bookings</h2>
      <h3>The bookings are done as per your request attempeted</h3>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Upcoming" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          <Tab label="Past" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {upcomingSession.map((elem) => (
          <div className="bookingCard">
            <MuiCard element={elem} key={elem._id} />
          </div>
        ))}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {pendingSession.length > 0 &&
          pendingSession.map((elem) => (
            <div className="bookingCard">
              <MuiCard element={elem} key={elem._id} />
            </div>
          ))}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {booking.map((elem) => (
          <div className="bookingCard">
            <MuiCard element={elem} key={elem._id} />
          </div>
        ))}
      </TabPanel>
    </div>
  )
}

const booking = [
  {
    id: 1,
    mentorName: "Amisha",
    date: "Mar 28,2022 at 6.30pm",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eius maxime. Laborum quae neque fuga.",
  },
  {
    id: 2,
    mentorName: "Lorem",
    date: "Mar 28,2022 at 6.30pm",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eius maxime. Laborum quae neque fuga.",
  },
  {
    id: 3,
    mentorName: "Amisha",
    date: "Mar 28,2022 at 6.30pm",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eius maxime. Laborum quae neque fuga.",
  },
  {
    id: 4,
    mentorName: "Barenya",
    date: "Mar 28,2022 at 6.30pm",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eius maxime. Laborum quae neque fuga.",
  },
  {
    id: 5,
    mentorName: "Snigdha",
    date: "Mar 28,2022 at 6.30pm",
    details:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam, eius maxime. Laborum quae neque fuga.",
  },
]
