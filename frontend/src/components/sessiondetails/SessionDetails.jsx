// import React, { useEffect, useState } from "react"
// import "./sessiondetail.css"
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
// import { Button, getListSubheaderUtilityClass } from "@mui/material"
// import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
// import GroupsIcon from "@mui/icons-material/Groups"
// import { Link, useParams } from "react-router-dom"
// import axios from "axios"
// import Avatar from "@mui/material/Avatar"
// import { useContext } from "react"
// import { AuthContext } from "../../context/AuthContext"
// import CardHeader from "@mui/material/CardHeader"
// import ShareIcon from "@mui/icons-material/Share"
// import Dialog from "@mui/material/Dialog"
// import DialogActions from "@mui/material/DialogActions"
// import DialogContent from "@mui/material/DialogContent"
// import DialogTitle from "@mui/material/DialogTitle"
// import Slide from "@mui/material/Slide"
// import Preloader from "../PreLoader/Preloader"
// import { Helmet } from "react-helmet"
// import { CopyToClipboard } from "react-copy-to-clipboard"

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />
// })

// export default function SessionDetails() {
//   const { user } = useContext(AuthContext)
//   const sessionId = useParams().id
//   const [sessionDetail, setSessionDetail] = useState({})
//   const [mentor, setMentor] = useState({})
//   const [sessionLink, setSessionLink] = useState("")
//   const [preloader, SetPreloader] = useState(false)
//   const [registered, setRegistered] = useState(false)
//   const [membersArr, setMembersArr] = useState([])
//   const sessionDate = new Date(sessionDetail.date + sessionDetail.startTime)

//   const [open, setOpen] = React.useState(false)
//   const [open1, setOpen1] = React.useState(false)

//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }
//   const handleClickOpen1 = () => {
//     setOpen1(true)
//   }

//   const handleClose1 = () => {
//     setOpen1(false)
//   }

//   useEffect(() => {}, [])
//   useEffect(() => {
//     const getSessionData = async () => {
//       SetPreloader(true)
//       const res = await axios.get(`/session/${sessionId}`)
//       setSessionDetail(res.data)
//       if (res.data.members.includes(user._id)) setRegistered(true)
//       else setRegistered(false)
//       SetPreloader(false)
//     }
//     getSessionData()
//   }, [sessionId, registered])
//   useEffect(() => {
//     SetPreloader(true)
//     const getMentor = async () => {
//       if (sessionDetail.mentor) {
//         const mentor = await axios.get(`/users/${sessionDetail.mentor}`)
//         setMentor(mentor.data)
//         SetPreloader(false)
//         if (sessionDetail.members.includes(user._id)) setRegistered(true)
//       }
//     }
//     getMentor()
//   }, [sessionDetail])

//   const handlejoin = async () => {
//     const role = user._id === sessionDetail.mentor ? "host" : "guest"
//     const sessionLink =
//       "https://62bd7a31d93831765b61385f--eduwartsmeet.netlify.app" +
//       sessionDetail.sessionLink +
//       "/" +
//       role
//     console.log(sessionLink)
//     window.location.replace(sessionLink)
//   }

//   const handleShare = () => {
//     handleClickOpen()
//     setSessionLink(`https://eduwarts.me/getsession/${sessionId}`)
//   }

//   const [copied, setCopied] = useState(false)

//   const handleRegistration = async () => {
//     try {
//       const res = await axios.post(`/session/rsvp/${sessionId}`, {
//         userId: user._id,
//       })
//       handleClickOpen1()
//       setRegistered(true)
//       console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleremoveRSVP = async () => {
//     console.log("unenrolled")
//     try {
//       const res = await axios.post(`/session/rsvp/cancel/${sessionId}`, {
//         userId: user._id,
//       })
//       handleClickOpen1()
//       setRegistered(false)
//       console.log(res.data)
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const public_folder = "https://eduwarts.me/UserImages/"

//   // useEffect(() => {
//   //   document.title =
//   //     sessionDetail && mentor
//   //       ? sessionDetail.sessionName + " by " + mentor.name + " | Eduwarts"
//   //       : "Eduwarts"

//   //   // document.getElementsByTagName("META")[2].content="Description"
//   // // }, [sessionDetail,mentor])
//   // console.log(
//   //   new Date(sessionDetail.date + sessionDetail.startTime).getTime() - 1800000 <
//   //     Date.now()
//   // )

//   useEffect(()=>{
//     if(sessionDetail.members){
//       const res =  axios.all(sessionDetail.members.map(m=> axios.get(`/users/${m}`))).then((data)=>setMembersArr(data))
//     }
//   },[sessionDetail])
//   console.log(membersArr)
//   return (
//     <div className="sessionContainer">
//       <Helmet>
//         <meta charSet="utf-8" />
//         {sessionDetail.sessionName ? (
//           <title>{` ${sessionDetail.sessionName} by ${mentor.name}`}</title>
//         ) : (
//           "Group session | Eduwarts"
//         )}
//         <meta
//           name="description"
//           content="Learn and grow with help from your own skilled seniors"
//         />
//       </Helmet>
//       <div className="group_session_title" style={{ marginTop: "1rem" }}>
//         <h1>{sessionDetail.sessionName}</h1>
//         <div className="group_session_time" style={{ marginTop: "1rem" }}>
//           <span>
//             {" "}
//             <CalendarMonthIcon />
//           </span>
//           <span>
//             {sessionDetail.date} ,{" "}
//             {sessionDate.toLocaleString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//             })}
//           </span>
//         </div>
//         <div className="group_session_img" style={{ marginTop: "1rem" }}>
//           <img
//             src={
//               sessionDetail.sessionImg
//                 ? sessionDetail.sessionImg
//                 : "/images/default-cover.jpg"
//             }
//             alt={sessionDetail.title}
//             loading="lazy"
//             style={{ width: "100%", maxHeight: "50vh" }}
//           />
//         </div>
//         <div className="group_session_desc" style={{ marginTop: "1rem" }}>
//           <p>{sessionDetail.description}</p>
//         </div>
//         <div className="host_name" style={{ marginTop: "1rem" }}>
//           <h3>
//             <b>Hosted by : </b>
//           </h3>
//           <CardHeader
//             avatar={
//               <div className="avatar">
//                 <Avatar
//                   alt="Remy Sharp"
//                   sx={{ bgcolor: "#344CB7 " }}
//                   src={
//                     mentor.profileImage
//                       ? public_folder + mentor.profileImage
//                       : `/Avatars/${mentor.gender}/${mentor.defaultImage}`
//                   }
//                 />
//               </div>
//             }
//             title={mentor.name}
//             subheader={mentor.expertise}
//           />
//         </div>
//         {/* <div className="cohost_name" style={{ marginTop: "0.5rem" }}>
//           <h3>
//             <b>Cohosted by : </b>
//             {sessionDetail.coHosts.map((cohost) => {
//                 ;<h4>{cohost}</h4>
//               })}
//           </h3>
//         </div> */}
//         <div className="group_topic_of_disc">
//           <h3>
//             <b>Topic of discussion : </b>
//             {sessionDetail.category}
//           </h3>
//         </div>
//         {/* sessionDetail.cohost ? <h3>Hosted by: {sessionDetail.host}</h3> : "" */}
//       </div>

//       {!user || user === undefined ? (
//         <div
//           className="joinButtonS"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {/* <Button
//             variant="outlined"
//             component={Link}
//             to={"/login"}
//             size="large"
//           >
//             join
//           </Button> */}
//           <Button
//             variant="outlined"
//             component={Link}
//             to={"/login"}
//             size="large"
//           >
//             RSVP
//           </Button>
//         </div>
//       ) : (
//         <div className="sessionButtons">
//           <Button variant="outlined" component={Link} to={"/home"} size="large">
//             <KeyboardBackspaceIcon />
//           </Button>
//           <Button variant="outlined" onClick={handleShare} size="large">
//             <ShareIcon />
//           </Button>
//           {/* {new Date(sessionDetail.date + sessionDetail.startTime).getTime() -
//             1800000 < Date.now() ? (
//             <Button variant="contained" size="large">
//               <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
//                 Join
//               </span>
//               <GroupsIcon />
//             </Button>
//           ) : (
//             ""
//           )} */}
//           {sessionDetail.mentor !== user._id ? (
//             !registered ? (
//               <Button
//                 variant="contained"
//                 onClick={handleRegistration}
//                 to={"/login"}
//                 size="large"
//               >
//                 RSVP
//               </Button>
//             ) : new Date(
//                 sessionDetail.date + sessionDetail.startTime
//               ).getTime() -
//                 1800000 <
//               Date.now() ? (
//               sessionDetail.isActive && (
//                 <Button variant="contained" size="large">
//                   <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
//                     Join
//                   </span>
//                   <GroupsIcon />
//                 </Button>
//               )
//             ) : (
//               <>
//                 <Button variant="outlined" disabled size="large">
//                   you've registered!
//                 </Button>{" "}
//                 <br />
//                 <span
//                   style={{ color: "red", cursor: "pointer" }}
//                   onClick={handleremoveRSVP}
//                 >
//                   Cancel registration
//                 </span>
//               </>
//             )
//           ) : new Date(sessionDetail.date + sessionDetail.startTime).getTime() -
//               1800000 <
//             Date.now() ? (
//             <Button variant="contained" size="large">
//               <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
//                 Join
//               </span>
//               <GroupsIcon />
//             </Button>
//           ) : (
//             <span style={{ color: "red", cursor: "pointer" }}>
//               *Join button will be active, 30 mins before the session time.
//             </span>
//           )}

//           <Dialog
//             open={open1}
//             TransitionComponent={Transition}
//             keepMounted
//             onClose={handleClose1}
//             aria-describedby="alert-dialog-slide-description"
//           >
//             <DialogTitle>{"🎊🎉Congratulations! 🎉🎊"}</DialogTitle>
//             <DialogContent>
//               You have registered for the session!!!
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleClose1}>ok</Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       )}

//       <Dialog
//         open={open}
//         TransitionComponent={Transition}
//         keepMounted
//         onClose={handleClose}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>Share </DialogTitle>
//         <DialogContent
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             flexWrap: "wrap",
//           }}
//         >
//           <div className="share_text">{sessionLink}</div>
//         </DialogContent>
//         <DialogActions>
//           <CopyToClipboard text={sessionLink} onCopy={() => setCopied(true)}>
//             <Button>Copy </Button>
//           </CopyToClipboard>
//           <Button variant="contained" onClick={handleClose}>
//             close
//           </Button>
//         </DialogActions>
//       </Dialog>
//       {preloader ? <Preloader /> : ""}
//     </div>
//   )
// }





// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState } from "react"
import "./sessiondetail.css"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { AvatarGroup, Button } from "@mui/material"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


function GetDetails({ category }) {
  const public_folder = "https://eduwarts.me/UserImages/"
  let src = category.data.profileImage
    ? public_folder + category.data.profileImage
    : `/Avatars/${category.data.gender}/${category.data.defaultImage}`
  return (
    <Avatar alt={category.data.name} src={src}>
    </Avatar>
  );
}


export default function SessionDetails() {
  const { user } = useContext(AuthContext)
  const sessionId = useParams().id
  const [sessionDetail, setSessionDetail] = useState({})
  const [userDetails, setUserDetails] = useState([])
  const [mentor, setMentor] = useState({})
  const [sessionLink, setSessionLink] = useState("")
  const [preloader, SetPreloader] = useState(false)
  const [registered, setRegistered] = useState(false)

  const sessionDate = new Date(sessionDetail.date + sessionDetail.startTime)

  const [open, setOpen] = React.useState(false)
  const [open1, setOpen1] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const handleClickOpen1 = () => {
    setOpen1(true)
  }

  const handleClose1 = () => {
    setOpen1(false)
  }

  const handleClickOpen2 = () => {
    setOpen2(true)
  }

  const handleClose2 = () => {
    setOpen2(false)
  }

  useEffect(() => {
    const getSessionData = async () => {
      // SetPreloader(true)
      const res = await axios.get(`/session/${sessionId}`)
      setSessionDetail(res.data)
      if (res.data.members.includes(user._id)) setRegistered(true)
      else setRegistered(false)
    }
    SetPreloader(false)
    getSessionData()
  }, [sessionId, registered])
  useEffect(() => {
    // SetPreloader(true)
    const getMentor = async () => {
      if (sessionDetail.mentor) {
        const mentor = await axios.get(`/users/${sessionDetail.mentor}`)
        setMentor(mentor.data)
        SetPreloader(false)
        if (sessionDetail.members.includes(user._id)) setRegistered(true)
      }
    }
    getMentor()
  }, [sessionDetail])


  useEffect(() => {
    if (sessionDetail.members) {
      const res = axios.all(sessionDetail.members.map(m => axios.get(`/users/${m}`))).then((data) => { setUserDetails(data); console.log(data) })
    }
  }, [sessionDetail])

  console.log(userDetails);

  let Image = userDetails.map((userDetails) =>
    <GetDetails category={userDetails}></GetDetails>
  );

  const handlejoin = async () => {
    const role = user._id === sessionDetail.mentor ? "host" : "guest"
    const sessionLink =
      "https://62bd7a31d93831765b61385f--eduwartsmeet.netlify.app" +
      sessionDetail.sessionLink +
      "/" +
      role
    console.log(sessionLink)
    window.location.replace(sessionLink)
  }

  const handleShare = () => {
    handleClickOpen()
    setSessionLink(`https://eduwarts.me/getsession/${sessionId}`)
  }

  const [copied, setCopied] = useState(false)

  const handleRegistration = async () => {
    try {
      const res = await axios.post(`/session/rsvp/${sessionId}`, {
        userId: user._id,
      })
      handleClickOpen1()
      setRegistered(true)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleremoveRSVP = async () => {
    console.log("unenrolled")
    try {
      const res = await axios.post(`/session/rsvp/cancel/${sessionId}`, {
        userId: user._id,
      })
      handleClickOpen2()
      setRegistered(false)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const public_folder = "https://eduwarts.me/UserImages/"

  // useEffect(() => {
  //   document.title =
  //     sessionDetail && mentor
  //       ? sessionDetail.sessionName + " by " + mentor.name + " | Eduwarts"
  //       : "Eduwarts"

  //   // document.getElementsByTagName("META")[2].content="Description"
  // }, [sessionDetail,mentor])
  console.log(
    new Date(sessionDetail.date + sessionDetail.startTime).getTime() - 1800000 <
    Date.now()
  )

  console.log(sessionDetail)

  const container_background = {
    backgroundImage: `url(${sessionDetail.sessionImg
      ? sessionDetail.sessionImg
      : "/images/default-cover.jpg"})`,

    backgroundSize: "contain"
  }
  return (
    <div className="sessionContainer" style={container_background}>
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
      {/* <div className="group_session_img">
        <img
          src={
            sessionDetail.sessionImg
              ? sessionDetail.sessionImg
              : "/images/default-cover.jpg"
          }
          alt={sessionDetail.title}
          loading="lazy"
          style={{ width: "100%", maxHeight: "50vh" }}
        />
       
      </div> */}

      <div className="group_session_title">
        <h1>{sessionDetail.sessionName}</h1>
        <div className="group_session_time">
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
        <div className="group_details_all">

          <div className="group_details">
            <div className="host_name_out">
              <div className="host_name">
                <CardHeader
                  avatar={
                    <div className="avatar">
                      <p style={{ paddingRight: "10px" }}>Host:</p>
                      <Avatar
                        alt={mentor.name}
                        sx={{ bgcolor: "#344CB7 ", margin: "0px", padding: "0px" }}
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
              <div className="host_name">
                <CardHeader
                  avatar={
                    <div className="avatar">
                      <p style={{ paddingRight: "10px" }}>Speaker:</p>
                      <Avatar
                        alt={mentor.name}
                        sx={{ bgcolor: "#344CB7 ", margin: "0px", padding: "0px" }}
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

            <div className="group_session_desc">
              <p>{sessionDetail.description}</p>
              <p className="group_session_desc_p">Registered: </p>
              <AvatarGroup max={4}>
                {Image}
              </AvatarGroup>
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
        </div>
        {!user || user === undefined ? (
          <div
            className="joinButtonS"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <Button
            variant="outlined"
            component={Link}
            to={"/login"}
            size="large"
          >
            join
          </Button> */}
            <Button
              variant="outlined"
              component={Link}
              to={"/login"}
              size="large"
            >
              RSVP
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
            {/* {new Date(sessionDetail.date + sessionDetail.startTime).getTime() -
            1800000 < Date.now() ? (
            <Button variant="contained" size="large">
              <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
                Join
              </span>
              <GroupsIcon />
            </Button>
          ) : (
            ""
          )} */}
            {sessionDetail.mentor !== user._id ? (
              !registered ? (
                <Button
                  variant="contained"
                  onClick={handleRegistration}
                  to={"/login"}
                  size="large"
                >
                  RSVP
                </Button>
              ) : new Date(
                sessionDetail.date + sessionDetail.startTime
              ).getTime() -
                1800000 <
                Date.now() ? (
                sessionDetail.isActive && (
                  <Button variant="contained" size="large">
                    <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
                      Join
                    </span>
                    <GroupsIcon />
                  </Button>
                )
              ) : (
                <>
                  <Button variant="outlined" disabled size="large">
                    you've registered!
                  </Button>{" "}
                  <br />
                  <span className="cancel_registration"
                    style={{ backgroundColor: "red", padding: "10px 10px 10px 10px", borderRadius: "10px", color: "white", cursor: "pointer" }}
                    onClick={handleremoveRSVP}
                  >
                    Cancel registration
                  </span>
                </>
              )
            ) : new Date(sessionDetail.date + sessionDetail.startTime).getTime() -
              1800000 <
              Date.now() ? (
              <Button variant="contained" size="large">
                <span style={{ margin: "0px .5rem" }} onClick={handlejoin}>
                  Join
                </span>
                <GroupsIcon />
              </Button>
            ) : (
              <span style={{ color: "red", cursor: "pointer" }}>
                *Join button will be active, 30 mins before the session time.
              </span>
            )}

            <Dialog
              open={open1}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose1}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"🎊🎉Congratulations! 🎉🎊"}</DialogTitle>
              <DialogContent>
                You have registered for the session!!!
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose1}>ok</Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={open2}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose2}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"🎊🎉Congratulations! 🎉🎊"}</DialogTitle>
              <DialogContent>
                Registration Cancelled
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose2}>ok</Button>
              </DialogActions>
            </Dialog>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", marginTop: '30px' }}>
          <Link to={`/feedbackform/${sessionDetail._id}/${sessionDetail.mentor}`}>
            <button style={{ outline: "none", border: "none", boxShadow: "none", padding: "15px 20px", color: "white", background: "#FFB200" }} >FEEDBACK</button>
          </Link>
        </div>
      </div>



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
    </div>
  )
}