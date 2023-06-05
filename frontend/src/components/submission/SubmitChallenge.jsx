import React, { useState,useEffect } from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import "./submitchallenge.css"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import PreviewImg from "../Preview/Preview"
import Preloader from "../PreLoader/Preloader"
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link, useParams } from "react-router-dom"
import Popup from "../popup-box/Popup"
import { CreatePost } from "../create_post/CreatePost"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
}

export default function SubmitChallenge(props) {
  const [open, setOpen] = React.useState(false)

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [solutionDesc, setSolutionDesc] = useState("")
  const descCallback = (data) => {
    setSolutionDesc(data)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [selectedImage, setSelectedImage] = useState("")
  const ImageCallback = (data) => setSelectedImage(data);

  const {user : currentUser} = useContext(AuthContext)
  const challengeId = useParams().id 

  const handleSubmitChallenge = async() => {
    const submissionBody = {
      challengeId: challengeId,
      participantId: currentUser._id,
      solutionDesc: solutionDesc,
    }

    if (selectedImage !== "") {
      submissionBody.solutionImg =
        selectedImage;
    }

    console.log(submissionBody)
    try {
      setIsLoading(true)
      var challengeSubmission = await axios.post(
        `/submitchallenge/create`,
        submissionBody
      )
      console.log(challengeSubmission.data)
    } catch (error) { 
      setIsLoading(false)
      setError(true)
    }


    setIsLoading(false)
    setOpen(false)
    // window.location.replace(
    //   `/submittedchallenge/${challengeSubmission.data._id}`
    // )
    console.log("done")
  }

  const [submissionPost, setSubmissionPost] = useState([])

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(`/submitchallenge/challenge/${challengeId}`)
      console.log(res.data)
    }
    getPost()
  }, [])
  


  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Take Challenge
      </Button>

      <form onSubmit={handleSubmitChallenge}>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          maxWidth="md"
          fullWidth={true}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            <h2>{props.title}</h2> <br />
            hosted by : {props.author}
          </BootstrapDialogTitle>
          <DialogContent dividers>
            {/* <textarea id="txtid" name="txtname" className="textarea">
              Caption was here!
            </textarea> */}
            {/* <div className="upload">
            <label htmlFor="uploadImg">
              <AddPhotoAlternateIcon fontSize="large" />
              <div className="uplText">Upload Image</div>
            </label>
            <input type="file" name="uploadImg" id="uploadImg" />
          </div> */}

            {/* <PreviewImg ImageCallback={ImageCallback} text="upload Image" /> */}

            <CreatePost
              ImageCallback={ImageCallback}
              handleSubmitChallenge={handleSubmitChallenge}
              descCallback={descCallback}
            />
          </DialogContent>

          {error ? (
            <Popup
              flag={true}
              message={"Something went wrong. Try again later."}
            />
          ) : (
            ""
          )}
        </BootstrapDialog>
      </form>
      {isLoading ? <Preloader /> : ""}
    </div>
  )
}
