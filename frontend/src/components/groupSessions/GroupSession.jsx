import React, {useState, useEffect} from "react"
import PropTypes from "prop-types"
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
} from "@mui/material"
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiCardComplex from "../muiCard/MuiCardComplex"
import {SwiperSession} from "../Swiper/Swiper"
import axios from "axios"
import { useContext } from "react"
import {AuthContext} from "../../context/AuthContext"
import { Link } from 'react-router-dom';

// const card = (
//   <React.Fragment>
//     <CardContent>
//       <Typography variant="h5" color="text.secondary" gutterBottom>
//         Mentorship session with Amisha
//       </Typography>
//       <Typography sx={{ fontSize: 14 }} component="div">
//         Mar 28,2022 at 6.30pm
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         <Accordion>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls="panel1a-content"
//             id="panel1a-header"
//           >
//             <Typography>Details</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             <Typography>
//               Notes added: I am trying to learn about UX but there is no valid
//               resources anywhere. I can’t understand where ti start end. Please
//               help me out.
//             </Typography>
//           </AccordionDetails>
//         </Accordion>
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Send email</Button>
//       <Button size="small">Reschedule this session</Button>
//     </CardActions>
//     <CardActions>
//       <Button size="small" color="error">
//         Cancel
//       </Button>
//     </CardActions>
//   </React.Fragment>
// )

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
          <Typography component={"span"}>{children}</Typography>
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

export default function GroupSession() {
  const {user} = useContext(AuthContext)

  const [UpcomingGroupSessions, setUpcomingGroupSessions] = useState([]);
  const [pastGroupSession, setPastGroupSession] = useState([])
  useEffect(() => {
    async function getUpcomingData(){
      const res = await axios.get("/session/activegroup")
      setUpcomingGroupSessions(res.data);
    }
    async function getPastData(){
      const res = await axios.get("/session/pastgroup")
      setPastGroupSession(res.data);
    }
    getUpcomingData();
    getPastData();

  }, [])
  


  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="Booking">
      <h2>Group Sessions</h2>
      <h3>The bookings are done as per your request attempeted</h3>
      {user.isMentor ? (
        <Button
          variant="outlined"
          component={Link}
          to={"/newgroupsession"}
          style={{
            float: "right",
          }}
        >
          Create Session
        </Button>
      ) : (
        ""
      )}
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
        {UpcomingGroupSessions.length > 0 ? (
          <div className="MuiCardComplex">
            <SwiperSession arrayList={UpcomingGroupSessions} />
          </div>
        ) : (
          "No upcoming sessions available..."
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="MuiCardComplex">
          {pastGroupSession.length > 0 ? pastGroupSession.map((elem) => (
            <div className="singleComplexCard" key={elem._id}>
              <MuiCardComplex element={elem} />
            </div>
          )) : "No sessions found..."}
        </div>
      </TabPanel>
    </div>
  )
}

