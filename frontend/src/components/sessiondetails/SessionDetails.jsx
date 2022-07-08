import React, { useEffect, useState } from "react"
import "./sessiondetail.css"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { Button } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import GroupsIcon from "@mui/icons-material/Groups"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import Avatar from "@mui/material/Avatar"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import CardHeader from "@mui/material/CardHeader"
import ShareIcon from "@mui/icons-material/Share"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Slide from "@mui/material/Slide"
import Preloader from "../PreLoader/Preloader"
import { Helmet } from "react-helmet"
import { CopyToClipboard } from "react-copy-to-clipboard"

<<<<<<< HEAD
=======
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

>>>>>>> trial
// const sessionDetail =
//   {
//     sessionName: "Switching to Freelancing by Barenya Kumar Panda",
//     date: "Jun 30",
//     time: " 8:00pm",
//     sessionImg: "images/1.jpg",
//     sessionLink:"123@ffd",
//     description:
//       " If you have ever wondered what switching to freelancing feels like or if you are one of those brave souls to switch to an independent lifestyle, this session is for you. As the world sees freelancers are lucky souls, I am sure most of you know it's not as easy as it looks.",
//     category: "WEB3",
//     mentor: "12333",
//     coHosts: [
//       "123","234","235","236"
//     ],
//   }

export default function SessionDetails() {
  const { user } = useContext(AuthContext)
  const sessionId = useParams().id
  const [sessionDetail, setSessionDetail] = useState({})
  const [mentor, setMentor] = useState({})
  const [sessionLink, setSessionLink] = useState("")
  const [preloader, SetPreloader] = useState(false)

  const sessionDate = new Date(sessionDetail.date + sessionDetail.startTime)
<<<<<<< HEAD

  useEffect(() => {
    const getSessionData = async () => {
      const res = await axios.get(`/session/${sessionId}`)
      setSessionDetail(res.data)
      // console.log(res.data);
    }
    getSessionData()
  }, [])
=======

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const getSessionData = async () => {
      SetPreloader(true)
      const res = await axios.get(`/session/${sessionId}`)
      setSessionDetail(res.data)
      SetPreloader(false)
    }
    getSessionData()
  }, [sessionId])
>>>>>>> trial
  useEffect(() => {
    SetPreloader(true)
    const getMentor = async () => {
      if (sessionDetail.mentor) {
        const mentor = await axios.get(`/users/${sessionDetail.mentor}`)
        setMentor(mentor.data)
        SetPreloader(false)
      }
    }
    getMentor()
  }, [sessionDetail])

  const handlejoin = async () => {
    const role = user._id === sessionDetail.mentor ? "host" : "guest"
    const sessionLink =
      "https://62bd7a31d93831765b61385f--eduwartsmeet.netlify.app" +
      sessionDetail.sessionLink +
      "/" +
      role
<<<<<<< HEAD
    // console.log(sessionLink);
=======
    console.log(sessionLink)
>>>>>>> trial
    window.location.replace(sessionLink)
  }

  const handleShare = () => {
    handleClickOpen()
    setSessionLink(`http://eduwarts.me/getsession/${sessionId}`)
  }

  const [copied, setCopied] = useState(false)

  const public_folder = "http://localhost:9000/UserImages"

  useEffect(() => {
    document.title =
      sessionDetail && mentor
        ? sessionDetail.sessionName + " by " + mentor.name + " | Eduwarts"
        : "Eduwarts"

    // document.getElementsByTagName("META")[2].content="Description"
  }, [sessionDetail,mentor])

  return (
    <div className="sessionContainer">
      <Helmet>
        <meta charSet="utf-8" />
        {sessionDetail.sessionName ? (
          <title>{` ${sessionDetail.sessionName} by ${mentor.name}`}</title>
        ) : (
          "Group session | Eduwarts"
        )}
        <meta
          name="description"
          content="Learn and grow with help from your own skilled seniors"
        />
      </Helmet>
      <div className="group_session_title" style={{ marginTop: "1rem" }}>
        <h1>{sessionDetail.sessionName}</h1>
        <div className="group_session_time" style={{ marginTop: "1rem" }}>
          <span>
            {" "}
            <CalendarMonthIcon />
          </span>
          <span>
            {sessionDetail.date} ,{" "}
            {sessionDate.toLocaleString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="group_session_img" style={{ marginTop: "1rem" }}>
          <img
            src={
              sessionDetail.sessionImg
                ? public_folder + sessionDetail.sessionImg
                : "/images/default-cover.jpg"
            }
            alt={sessionDetail.title}
            loading="lazy"
            style={{ width: "100%", maxHeight: "50vh" }}
          />
        </div>
        <div className="group_session_desc" style={{ marginTop: "1rem" }}>
          <p>{sessionDetail.description}</p>
        </div>
        <div className="host_name" style={{ marginTop: "1rem" }}>
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
<<<<<<< HEAD
                      : "/images/3.jpg"
=======
                      : `/Avatars/${mentor.gender}/${mentor.defaultImage}`
>>>>>>> trial
                  }
                />
              </div>
            }
            title={mentor.name}
            subheader={mentor.expertise}
          />
        </div>
        {/* <div className="cohost_name" style={{ marginTop: "0.5rem" }}>
          <h3>
            <b>Cohosted by : </b>
            {sessionDetail.coHosts.map((cohost) => {
                ;<h4>{cohost}</h4>
              })}
          </h3>
        </div> */}
        <div className="group_topic_of_disc">
          <h3>
            <b>Topic of discussion : </b>
            {sessionDetail.category}
          </h3>
        </div>
        {/* sessionDetail.cohost ? <h3>Hosted by: {sessionDetail.host}</h3> : "" */}
      </div>
<<<<<<< HEAD
      <div className="sessionButtons">
        <Button variant="outlined" component={Link} to={"/home"} size="large">
          <KeyboardBackspaceIcon />
        </Button>
        <Button variant="contained" size="large">
          <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
            Join Session
          </span>
          <GroupsIcon />
        </Button>
      </div>
=======

      {!user || user === undefined ? (
        <div className="joinButtonS" style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
          <Button
            variant="outlined"
            component={Link}
            to={"/login"}
            size="large"
          >
            join
          </Button>
        </div>
      ) : (
        <div className="sessionButtons">
          <Button variant="outlined" component={Link} to={"/home"} size="large">
            <KeyboardBackspaceIcon />
          </Button>
          <Button variant="outlined" onClick={handleShare} size="large">
            <ShareIcon />
          </Button>
          <Button variant="contained" size="large">
            <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
              Join
            </span>
            <GroupsIcon />
          </Button>
        </div>
      )}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Share </DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="share_text">{sessionLink}</div>
        </DialogContent>
        <DialogActions>
          <CopyToClipboard text={sessionLink} onCopy={() => setCopied(true)}>
            <Button>Copy </Button>
          </CopyToClipboard>
          <Button variant="contained" onClick={handleClose}>
            close
          </Button>
        </DialogActions>
      </Dialog>
      {preloader ? <Preloader /> : ""}
>>>>>>> trial
    </div>
  )
}
