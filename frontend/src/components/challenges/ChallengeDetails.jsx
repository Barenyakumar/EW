import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import "./singleChallenge.css"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
// import Overlay from "../overlay/Overlay"
import PostList from "../postList/PostList"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Preloader from "../PreLoader/Preloader"
import { Helmet } from "react-helmet"
import { CopyToClipboard } from "react-copy-to-clipboard"
import {
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import GroupsIcon from "@mui/icons-material/Groups"
import ShareIcon from "@mui/icons-material/Share"
import SubmitChallenge from "../submission/SubmitChallenge"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
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

export default function ChallengeDetails() {
  const { user } = useContext(AuthContext)
  const challengeId = useParams().id
  const [challengeDetail, setChallengeDetail] = useState({})
  const [mentor, setMentor] = useState({})
  const [challengeLink, setChallengeLink] = useState("")
  const [preloader, setPreloader] = useState(false)
  const [submissions, setSubmissions] = useState([])

  const challengeDate = new Date(
    challengeDetail.endDate + challengeDetail.endTime
  )
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  //getting challenge data
  useEffect(() => {
    const getChallengeData = async () => {
      setPreloader(true)
      //get challenge by challengeId
      const res = await axios.get(`/challenge/${challengeId}`)
      setChallengeDetail(res.data)
      setPreloader(false)
    }
    getChallengeData()

    const getsubmissions = async() => {
      const submission = await axios.get(
        `/submitchallenge/challenge/${challengeId}`
      )
      setSubmissions(submission.data)
      console.log(submission.data)
    }

    getsubmissions()
  }, [challengeId])

  //get mentor
  useEffect(() => {
    setPreloader(true)
    const getMentor = async () => {
      if (challengeDetail.mentor) {
        const mentor = await axios.get(`/users/${challengeDetail.mentor}`)
        setMentor(mentor.data)
        setPreloader(false)
      }
    }
    getMentor()
  }, [challengeDetail])

  const handleShare = () => {
    handleClickOpen()
    setChallengeLink(`http://eduwarts.com/getchallenge/${challengeId}`)
  }

  const [copied, setCopied] = useState(false)

  const public_folder = "http://localhost:9000/UserImages"

  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const challengeText = "Start Challange"

  return (
    <div className="singleChallenge">
      <Helmet>
        <meta charSet="utf-8" />
        {challengeDetail.challengeName ? (
          <title>{` ${challengeDetail.challengeName} by ${mentor.name}`}</title>
        ) : (
          "Challenge | Eduwarts"
        )}
        <meta
          name="description"
          content="Learn and grow with help from your own skilled seniors"
        />
      </Helmet>
      <div className="SingleChallengeImg">
        <img
          src={
            challengeDetail.challengeImg
              ? public_folder + challengeDetail.challengeImg
              : "/images/default-cover.jpg"
          }
          alt={challengeDetail.title}
          loading="lazy"
          style={{ width: "100%", maxHeight: "50vh" }}
        />
        {/* <img
          src="./images/3.jpg"
          alt=""
          style={{ width: "100%", maxHeight: "50vh" }}
        /> */}
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="About" {...a11yProps(0)} />
            <Tab label="Posts" {...a11yProps(1)} />
            {/* <Tab label="Stats" {...a11yProps(2)} /> */}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="challengeDetails">
            <div className="takeChallenge">
              <h1>{challengeDetail.challengeName}</h1>
            </div>
          </div>

          <div className="aboutContainer">
            <div className="aboutProfile">
              <h3>
                <b>Hosted by : </b>
              </h3>
              <CardHeader
                avatar={
                  <div className="avatar">
                    <Avatar
                      alt="Remy Sharp"
                      sx={{ bgcolor: "#344CB7 " }}
                      src={
                        mentor.profileImage
                          ? public_folder + mentor.profileImage
                          : `/Avatars/${mentor.gender}/${mentor.defaultImage}`
                      }
                    />
                  </div>
                }
                title={mentor.name}
                subheader={mentor.expertise}
              />
            </div>
          </div>
          <div className="challengeDesc">
            <p>{challengeDetail.description}</p>
          </div>
          <div className="challengeCategory">
            <h3>
              <b>Topic of discussion : </b>
              {challengeDetail.category}
            </h3>
          </div>

          <div className="buttonChallenge">
            {!user || user === undefined ? (
              <div
                className="joinButtonS"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  component={Link}
                  to={"/login"}
                  size="large"
                >
                  Start
                </Button>
              </div>
            ) : (
              <div className="sessionButtons">
                <Button
                  variant="outlined"
                  component={Link}
                  to={"/home"}
                  size="large"
                >
                  <KeyboardBackspaceIcon />
                </Button>
                <Button variant="outlined" onClick={handleShare} size="large">
                  <ShareIcon />
                </Button>
                <Link to={`/submitchallenge/${challengeDetail._id}`}>
                  <Button variant="outlined" size="large">
                    Take challenge
                  </Button>
                </Link>
                {/* <div className="overlayChallenge">
                  <SubmitChallenge
                    // challengeText={challengeText}
                    title={challengeDetail.challengeName}
                    author={mentor.name}
                  />
                </div> */}
              </div>
            )}

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle> Share </DialogTitle>
              <DialogContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div className="share_text">{challengeLink}</div>
              </DialogContent>
              <DialogActions>
                <CopyToClipboard
                  text={challengeLink}
                  onCopy={() => setCopied(true)}
                >
                  <Button>Copy </Button>
                </CopyToClipboard>
                <Button variant="contained" onClick={handleClose}>
                  close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostList itemData={submissions} />
        </TabPanel>

        {/* <TabPanel value={value} index={2}>
          <h1>Top performers</h1>
          <div className="stats">
            <Avatar alt="Remy Sharp" src="./images/3.jpg" />
            <span>Barenya Kumar Panda </span>
            <span>12398</span>
          </div>
          <div className="stats">
            <Avatar alt="Remy Sharp" src="./images/3.jpg" />
            <span>Barenya Kumar Panda </span>
            <span>12398</span>
          </div>
          <div className="stats">
            <Avatar alt="Remy Sharp" src="./images/3.jpg" />
            <span>Barenya Kumar Panda </span>
            <span>12398</span>
          </div>
        </TabPanel> */}
      </Box>
      {preloader ? <Preloader /> : ""}
    </div>
  )
}
