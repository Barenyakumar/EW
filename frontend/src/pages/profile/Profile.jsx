import React, { useState, useEffect } from "react"
import { useContext } from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { Avatar, Button } from "@mui/material"
import "./Profile.css"
// import SingleCard from "../../components/Card/Card"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useParams } from "react-router-dom"
import { MenteeBadge, MentorBadge } from "../../components/badges/MentorBadge"
// import ViewAvailability from "../../components/availability/viewAvailability"
import Availability from "../../components/availability/Availability"
import { useNavigate } from "react-router-dom"
import Preloader from "../../components/PreLoader/Preloader"
import { Helmet } from "react-helmet"

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

export default function Profile() {
  const [preloader, setpreloader] = useState(false)
  const navigate = useNavigate()

  const [availibility, setAvailibility] = useState([])
  const { user: CurrentUser } = useContext(AuthContext)
  useEffect(() => {
    async function getAvailability() {
      setpreloader(true)
      const res = await axios.get(`/availability/${CurrentUser._id}`)
      setAvailibility(res.data)
      setpreloader(false)
    }
    getAvailability()
  }, [])

  console.log(availibility)

  const [value, setValue] = useState(0)
  const [userProfile, setUserProfile] = useState({})
  const { username } = useParams()
  useEffect(() => {
    setpreloader(true)
    // if (username === CurrentUser.username) {
    //   setUserProfile(CurrentUser)
    //   setpreloader(false)
    // } else {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/?username=${username}`)
        setUserProfile(res.data)
        setpreloader(false)
      } catch (error) {
        navigate(-1)
      }
    }
    fetchUser()
    // }
  }, [username, CurrentUser])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const publicFolder = "http://localhost:9000/UserImages/"
  console.log(publicFolder + userProfile.profileImage)
  return (
    <>
      <div className="Profile">
        <Helmet>
          <meta charSet="utf-8" />
          {userProfile.username ? (
            <title>{`${userProfile.username}'s profile | Eduwarts`}</title>
          ) : (
            "your profile"
          )}
          <meta name="description" content="React application" />
        </Helmet>
        <div className="profileBg">
          <img
            src={
              userProfile.coverImage
                ? publicFolder + userProfile.coverImage
                : "/images/loginbg.jpg"
            }
            alt=""
            style={{ width: "100%", maxHeight: "50vh" }}
          />
        </div>
        <div className="profileDetails">
          <div className="profileName">
            <Avatar
              src={
                userProfile.profileImage
                  ? publicFolder + userProfile.profileImage
                  : `/Avatars/${userProfile.gender}/${userProfile.defaultImage}`
              }
              sx={{
                width: "30vw",
                height: "30vw",
                maxWidth: "10rem",
                maxHeight: "10rem",
              }}
            ></Avatar>
            <span style={{ fontSize: "1.5rem", color: "#535151" }}>
              {userProfile.name}
            </span>
            <div
              style={{
                fontSize: ".8rem",
                color: "#a4a4a4",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              {userProfile.username}{" "}
              {userProfile.isMentor ? <MentorBadge /> : <MenteeBadge />}{" "}
            </div>
          </div>
          {/* {CurrentUser.username !== username ? (
            userProfile.isMentor ? (
              <div style={{ width: "7rem" }}>
                
                <Button
                  variant="contained"
                  size="small"
                  style={{ marginTop: "2rem", marginLeft: ".5rem" }}
                  component={Link}
                  to={`/createbooking/${userProfile._id}`}
                >
                  Book session
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                size="small"
                style={{ marginTop: "2rem" }}
              >
                Follow
              </Button>
            )
          ) : !CurrentUser.isMentor ? (
            <Button
              variant="contained"
              size="small"
              style={{ marginTop: "2rem" }}
            >
              Become a Mentor
            </Button>
          ) : (
            ""
          )} */}
          {/* {
            CurrentUser.username === username && !CurrentUser.isMentor ?
              <Button variant="contained" size="small" style={{ marginTop: "2rem", }}>Become a Mentor
              </Button> :
              userProfile.isMentor ? <Button variant="contained" size="small" style={{ marginTop: "2rem", }}>< FavoriteBorderIcon /></Button> :
                <Button variant="contained" size="small" style={{ marginTop: "2rem", }}>Follow</Button>
          } */}
        </div>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Overview" {...a11yProps(0)} />
              {/* {CurrentUser.username == username || userProfile.isMentor ? (
                <Tab label="Week's Availability" {...a11yProps(1)} />
              ) : (
                ""
              )} */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className="overview">
              <p>{userProfile.bio}</p>
              {userProfile.isMentor && userProfile.expertise ? (
                <div className="expertiseContainer">
                  <h3 style={{ margin: "1rem 0px" }}>Expertise</h3>
                  <div className="expertise">
                    {userProfile.expertise.map((expert) => {
                      return (
                        <Button variant="outlined" size="small">
                          {expert}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              {userProfile.interests ? (
                <div className="InterestsContainer">
                  <h3 style={{ margin: "1rem 0px" }}>Interests</h3>
                  <div className="expertise">
                    {userProfile.interests.map((interest) => {
                      return (
                        <Button variant="outlined" size="small">
                          {interest}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              {userProfile.language ? (
                <div className="languagesContainer">
                  <h3 style={{ margin: "1rem 0px" }}>Fluent in </h3>
                  <div className="expertise">
                    {userProfile.language.map((lang) => {
                      return (
                        <Button variant="outlined" size="small">
                          {lang}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* <div className="educationContainer">
                <h3 style={{ margin: "1rem 0px" }}>Experience </h3>
                <div className="experienceProfile">
                  <div className="expertiseProfile">
                    <h2>UX Designer</h2>
                    <span>Eduwarts</span>
                  </div>
                  <Button variant="outlined">Present</Button>
                </div>
              </div>
              <div className="educationContainer">
                <h3 style={{ margin: "1rem 0px" }}>Education </h3>
                <div className="experienceProfile">
                  <div className="expertiseProfile">
                    <h2>UX Designer</h2>
                    <span>Eduwarts</span>
                  </div>
                  <Button variant="outlined">Present</Button>
                </div>
              </div> */}
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Availability CurrentUser={userProfile} />
          </TabPanel>
        </Box>
      </div>
      {preloader ? <Preloader /> : ""}
    </>
  )
}
