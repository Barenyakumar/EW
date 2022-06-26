import React from "react"
import PropTypes from "prop-types"
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from "@mui/material"
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import MuiCardComplex from "../muiCard/MuiCardComplex"

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

export default function GroupSession() {

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className="Booking">
      <h2>Group Sessions</h2>
      <h3>The bookings are done as per your request attempeted</h3>
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
        <div className="MuiCardComplex">
          {groupsession.map((elem) => (
            <div className="singleComplexCard">
              <MuiCardComplex element={elem} />
            </div>
          ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="MuiCardComplex">
          {groupsession.map((elem) => (
            <div className="singleComplexCard">
              <MuiCardComplex element={elem} />
            </div>
          ))}
        </div>
      </TabPanel>
    </div>
  )
}

const groupsession = [
  {
    id: 1,
    img: "3.jpg",
    sessionName: "Introducing to Photography",
    date: "Mar 28,2022 at 6.30pm",
    conductorImg: "3.jpg",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
    attendees: "43",
    avatar: [
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
    ],
  },
  {
    id: 2,
    img: "3.jpg",
    sessionName: "Introducing to Photography",
    conductorImg: "3.jpg",
    date: "Mar 28,2022 at 6.30pm",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
    attendees: "43",
    avatar: [
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
    ],
  },
  {
    id: 3,
    img: "3.jpg",
    sessionName: "Introducing to Photography",
    date: "Mar 28,2022 at 6.30pm",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
    attendees: "43",
    avatar: [
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
    ],
  },
  {
    id: 4,
    img: "3.jpg",
    sessionName: "Introducing to Photography",
    date: "Mar 28,2022 at 6.30pm",
    conductorImg: "3.jpg",
    timeLimit: "24hrs",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
    attendees: "43",
    avatar: [
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
    ],
  },
  {
    id: 5,
    img: "3.jpg",
    sessionName: "Introducing to Photography",
    conductorImg: "3.jpg",
    date: "Mar 28,2022 at 6.30pm",
    conductor: "Barenya Kumar Panda",
    role: "UX designer",
    attendees: "43",
    avatar: [
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
      {
        img1: "3.jpg",
        alt: "lorem",
      },
    ],
  },
]
