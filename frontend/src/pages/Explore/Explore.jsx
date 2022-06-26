import * as React from "react"
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
import SwiperMentor from "../../components/Swiper/Swiper"
import { NavBar } from "../../components/navbar/NavBar"
// import challenges from "../../dummydata/challenges.json.json"
// import Swiper from "swiper"

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

const mentorList = [
  {
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m3.jfif",
  },
  {
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m4.jfif",
  },
  {
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m5.jfif",
  },
  {
    mentorName: "Barenya Kumar Panda",
    role: "UI/UX",
    bio: "Hey this is bk panda how are you guys lets start learning figma with me.",
    img: "m6.jfif",
  },
]

const challengeList = [
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m3.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m4.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m5.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m6.jfif",
  },
]

const sessionList = [
  {
    mentorName: "No Code For Good #2",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m3.jfif",
  },
  {
    mentorName: "No Code For Good #2",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m4.jfif",
  },
  {
    mentorName: "No Code For Good #2",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m5.jfif",
  },
  {
    mentorName: "No Code For Good #2",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m6.jfif",
  },
]




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

  React.useEffect(() => { props.loginCallback(true) }, [props])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const classes = useStyles()

  return (
    <>
      <NavBar public={true}/>
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
              Book and meet mentors for 1:1 mentorship all across different
              colleges, states in our community
            </h3>

            {/* <SearchBar /> */}

            <h1>
              Start <span className="highLight">enhancing</span> and exploring
              new skills{" "}
            </h1>
            <h3>
              Start connecting wirth mentors and let your all doubts drown.{" "}
            </h3>

            <h1 className="centerTitle">How it works</h1>
            <div className="workingSection">
              <div className="pic">
                <img src="./images/1.jpg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem, saepe!
                </p>
              </div>
              <div className="pic">
                <img src="./images/2.jpg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem, saepe!
                </p>
              </div>
              <div className="pic">
                <img src="./images/3.jpg" alt="" />
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Dolorem, saepe!
                </p>
              </div>
              {/* <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, saepe!</p>
              </div> */}
            </div>

            <h1 className="centerTitle">What’s more?</h1>
            <h3>Explore Challenges</h3>
            <SwiperMentor arrayList={challengeList} />

            <div style={{ marginTop: "30px" }}>
              <h2>Join group mentoring </h2>
              <SwiperMentor arrayList={sessionList} />
            </div>
          </div>
        </TabPanel>

        {/* mentor section */}

        <TabPanel value={value} index={1} className={classes.tabStyle}>
          <div className="wrapper">
            <h1>
              Your next <span className="highLight">success</span>, made
              possible by mentoring{" "}
            </h1>
            <h3>
              Bring your confidence as a leader, grow your connections, and
              define your legacy.
            </h3>
            <ThemeProvider theme={theme}>
              <Button variant="contained" style={{ margin: "1rem 0px" }}>
                Become a Mentor
              </Button>
            </ThemeProvider>

            <h1>
              Bring your confidence as a leader, grow your connections, and
              define your legacy.
            </h1>
            <ThemeProvider theme={theme}>
              <Button variant="contained" style={{ margin: "1rem 0px" }}>
                Become a Mentor
              </Button>
            </ThemeProvider>

            {/* next section */}

            <div
              className="helpingSection"
              style={{ backgroundColor: "#FF898B", paddingBottom: "2.5rem", margin: "2rem 0px", borderRadius: ".5rem" }}
            >
              <div className="helpImg">
                <img src="./images/3.jpg" alt="" />
              </div>
              <h1 className="centerTitle">
                How mentors on Eduwarts can help you
              </h1>
              <div className="workingSection">
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Skill enhance</h1>
                  <p style={{ color: "#ffffff" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolorem, saepe!
                  </p>

                  <ThemeProvider theme={theme}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      Explore skills
                    </Button>
                  </ThemeProvider>
                </div>
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Skill enhance</h1>
                  <p style={{ color: "#ffffff" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolorem, saepe!
                  </p>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" style={{ margin: "10px" }}>
                      Explore skills
                    </Button>
                  </ThemeProvider>
                </div>
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Skill enhance</h1>
                  <p style={{ color: "#ffffff" }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Dolorem, saepe!
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
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Book 1:1 Sessions</h1>
                  <p style={{ color: "#ffffff" }}>
                    Schedule a meet and talk any unnecessaaty thing you have until
                    now.
                  </p>
                </div>
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Host Group sessions</h1>
                  <p style={{ color: "#ffffff" }}>
                    Schedule a meet and talk any unnecessaaty thing you have until
                    now.
                  </p>
                </div>
                <div
                  className="pic"
                  style={{ backgroundColor: "#121212", padding: "20px 10px" }}
                >
                  <h1 style={{ color: "#ffffff" }}>Create daily challenges</h1>
                  <p style={{ color: "#ffffff" }}>
                    Schedule a meet and talk any unnecessaaty thing you have until
                    now.
                  </p>
                </div>
                {/* <div className="pic">
                <img src="./images/4.jpg" alt="" />
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, saepe!</p>
              </div> */}
              </div>
            </div>

            {/* faq */}

            <div style={{ margin: "2rem 0px", }}>
              <h1 style={{ marginBottom: "1rem" }}>Frequently asked questions </h1>
              <Faq />
            </div>


            {/* top mentors */}
            <div className="topMentos" style={{ margin: "2rem 0px", background: "#FF898B", padding: "2rem 1rem", borderRadius: ".5rem" }}>
              <h1>Top Mentors</h1>
              <SwiperMentor arrayList={mentorList} />

            </div>

          </div>
        </TabPanel>
      </Box>
    </>
  )
}
