import React, { useState, useEffect } from "react"
import Avatar from "@mui/material/Avatar"
import EditIcon from "@mui/icons-material/Edit"
import Fab from "@mui/material/Fab"
import "./feed.css"
import Dialog from "@mui/material/Dialog"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"
import {Post} from "../post/post"
import { Share } from "../share/Share"

export const Feed = (username) => {
  //adding responsiveness using inner width of device----------------------------------------------------
  const [width, setWidth] = useState(window.innerWidth)
  function widthset() {
    setWidth(window.innerWidth)
  }

//   useEffect(() => {
//     window.addEventListener("resize", widthset)
//   })

//   // dialog box opening function -------------------------------------------------------------------------
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [post, setPost] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      // const res = username.username ?
      //   await axios.get("/posts/profile/" + username.username) :
      //   await axios.get("/posts/timeline/" + user._id);

      const res = await axios.get("/posts/all")
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        })
      )
    }
    fetchPost()
  }, [post])

  // console.log(post)

  return (
    <div className="feedContainer">
      {width <= 900 ? (
        <div className="addPost">
          <Fab
            sx={{ bgcolor: "#344CB7 " }}
            aria-label="edit"
            onClick={handleClickOpen}
          >
            <EditIcon />
          </Fab>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth="lg"
            fullWidth={true}
          >
            <CloseIcon
              sx={{ position: "absolute", right: "0", marginBottom: "1rem" }}
              onClick={handleClose}
            />
            <Share />
          </Dialog>
        </div>
      ) : (
        <div className="card">
          <Share />
        </div>
      )}
      {post.map((p) => {
        return <Post key={p._id} post={p} />
      })}
    </div>
  )
}
