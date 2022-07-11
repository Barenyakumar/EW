import React, { useEffect, useState } from "react"
import axios from "axios"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"
import "./explore.css"
import "../../App.css"
import SearchBar from "../../components/searchBar/SearchBar"
import { makeStyles } from "@mui/styles"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import Faq from "../../components/FAQ/Faq"
// import Swiper from "../../components/searchBar/Swiper"
import SwiperMentor, { SwiperSession } from "../../components/Swiper/Swiper"
import { NavBar } from "../../components/navbar/NavBar"
import Footer from "../../components/footer/Footer"
// import challenges from "../../dummydata/challenges.json.json"
// import Swiper from "swiper"
import { Helmet } from "react-helmet"


const useStyles = makeStyles({
  tabStyle: {
    padding: "-24px",
  },
})

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          backgroundColor: "#344CB7",
          size: "large",
        },
      },
    },
  },
})


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

export default function Explore(props) {
  const [value, setValue] = React.useState(0)

  React.useEffect(() => {
    props.loginCallback(true)
  }, [props])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()
  
  //dynamic call of mentorlist
  const [mentorList, setMentorList] = useState([])

  useEffect(() => {
    const allMentors = async () => {
      const res = await axios.get("users/mentors")
      setMentorList(res.data)
    }

    allMentors()
  }, [])

  //dynamic data of group session
   const [UpcomingGroupSessions, setUpcomingGroupSessions] = useState([])
   useEffect(() => {
     async function getUpcomingData() {
       const res = await axios.get("/session/activegroup")
       setUpcomingGroupSessions(res.data)
     }
    
     getUpcomingData()
   }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Learn and grow with help from your own skilled seniors | Eduwarts
        </title>
        <meta
          name="description"
          content="Book and meet mentors to enhance your skills and recognise the diversity of various skill sets in our community."
        />
      </Helmet>
      <NavBar public={true} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            fullWidth={true}
          >
            <Tab label="Mentee" {...a11yProps(0)} />
            <Tab label="Mentor" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} className={classes.tabStyle}>
          <div className="wrapper">
            <h1>
              Learn and <span className="highLight">grow</span> with help from
              your own skilled seniors{" "}
            </h1>
            <h3>
              Book and meet mentors to enhance your skills and recognise the
              diversity of various skill sets in our community.
            </h3>

            {/* <SearchBar /> */}

            <h1 style={{ marginTop: "2rem" }}>
              Start <span className="highLight">enhancing</span> and exploring
              new skills{" "}
            </h1>
            <h3>
              Start connecting wirth mentors and let your all doubts drown.{" "}
            </h3>

            <h1 className="centerTitle">How it works</h1>
            <div className="workingSection">
              <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Choose a particular skill and mentor from our community</p>
              </div>
              <div className="pic">
                <img src="./images/2.jpg" alt="" />
                <p>
                  Schedule a group mentorship session to make goal-setting
                  easier.
                </p>
              </div>
              <div className="pic">
                <img src="./images/3.jpg" alt="" />
                <p>You're all set to improve your skills !</p>
              </div>
              {/* <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, saepe!</p>
              </div> */}
            </div>

            <h1 className="centerTitle">What’s more?</h1>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
              Know your mentors !
            </h3>
            <SwiperMentor arrayList={mentorList} />

            <div style={{ marginTop: "30px" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                Join group mentoring{" "}
              </h3>
              <SwiperSession arrayList={UpcomingGroupSessions} />
            </div>
          </div>
        </TabPanel>

        {/* mentor section */}

        <TabPanel value={value} index={1} className={classes.tabStyle}>
          <div className="wrapper">
            <h1>
              Your first step to
              <span className="highLight">success</span>, made possible by
              mentoring
            </h1>
            <h3>
              Bring your confidence as a leader, grow your connections, and
              define your legacy.
            </h3>
            {/* <ThemeProvider theme={theme}>
              <Button variant="contained" style={{ margin: "1rem 0px" }}>
                Become a Mentor
              </Button>
            </ThemeProvider> */}

            <h1 style={{ margin: "2rem 0px" }}>
              Build yourself as a leader, expand your network, and establish
              your legacy.
            </h1>
            <ThemeProvider theme={theme}>
              <Button variant="contained" style={{ margin: "1rem 0px" }}>
                Become a Mentor
              </Button>
            </ThemeProvider>

            {/* next section */}

            <div
              className="helpingSection"
              style={{
                backgroundColor: "#FF898B",
                paddingBottom: "2.5rem",
                margin: "2rem 0px",
                borderRadius: ".5rem",
              }}
            >
              <div className="helpImg">
                <img src="./images/3.jpg" alt="" />
              </div>
              <h1 className="centerTitle">Why mentorship at Eduwarts?</h1>
              <div className="workingSection">
                <div
                  className="pic picBlack"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h2 style={{ color: "#ffffff" }}> Enhance skill</h2>
                  <p style={{ color: "#ffffff" }} className="blackContent">
                    Learn from your experienced seniors to expose yourself to
                    various expertise.
                  </p>

                  <ThemeProvider theme={theme}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      Explore skills
                    </Button>
                  </ThemeProvider>
                </div>
                <div
                  className="pic picBlack"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h2 style={{ color: "#ffffff" }}>Career improvements</h2>
                  <p style={{ color: "#ffffff" }} className="blackContent">
                    Learn from your more experienced seniors to expose yourself
                    to the various abilities that are available.
                  </p>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      Explore skills
                    </Button>
                  </ThemeProvider>
                </div>
                <div
                  className="pic picBlack"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Skill enhance</h1>
                  <p style={{ color: "#ffffff" }} className="blackContent">
                    Learn from seniors to boost your self-confidence.
                  </p>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      Explore skills
                    </Button>
                  </ThemeProvider>
                </div>
                {/* <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, saepe!</p>
              </div> */}
              </div>
            </div>

            {/* next section */}
            <div className="whatsNextContainer" style={{ margin: "2rem 0px" }}>
              <h1 style={{ margin: "1rem 0px" }}>
                What’s next <span className="highLight">Eduwarts</span>?{" "}
              </h1>
              <div className="workingSection">
                <div className="hostSessionImg">
                  <img src="./images/hostSession.png" alt="" />
                </div>
                <div
                  className="pic picBlack"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.8)",
                    padding: "20px 10px",
                  }}
                >
                  <h1 style={{ color: "#ffffff" }}>Host Group sessions</h1>
                  <p style={{ color: "#ffffff" }}>
                    Schedule a meeting and discuss any unnecessary items you
                    have accumulated up to this point.
                  </p>
                </div>

                {/* <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, saepe!</p>
              </div> */}
              </div>
            </div>

            {/* faq */}

            <div style={{ margin: "2rem 0px" }}>
              <h1 style={{ marginBottom: "1rem" }}>
                Frequently asked questions{" "}
              </h1>
              <Faq />
            </div>

            {/* top mentors */}
            {/* <div
              className="topMentos"
              style={{
                margin: "2rem 0px",
                background: "#FF898B",
                padding: "2rem 1rem",
                borderRadius: ".5rem",
              }}
            >
              <h1>Top Mentors</h1>
              <SwiperMentor arrayList={mentorList} />
            </div> */}
          </div>
        </TabPanel>
      </Box>
      <Footer />
    </>
  )
}
