import React, { useState, useRef } from "react"
import "./createPost.css"
import Avatar from "@mui/material/Avatar"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"

export const CreatePost = () => {
  const imgFile = useRef()
  const [imgData, setImgData] = useState("")
  const imagePreview = (e) => {
    // console.log(e.target.files[0])
    var reader = new FileReader()
    reader.onload = function (event) {
      // The file's text will be printed here
      setImgData(event.target.result)
    }

    reader.readAsDataURL(e.target.files[0])
  }
  const removePreview = () => {
    setImgData("")
    imgFile.current.value = ""
  }

  // console.log(imgFile.current ? console.log(imgFile.current.files) : "")
  return (
    <div className="createPostContainer">
      <div id="avatar">
        <Avatar className="avatarBadge" sx={{ bgcolor: "#344CB7 " }}>
          P
        </Avatar>
      </div>
      <div className="postInput">
        <textarea
          name="postDesc"
          id="postTextArea"
          placeholder={`What's in your mind...`}
        ></textarea>
        {imgData ? (
          <div className="previewImg">
            <div className="imgClose">
              <CloseIcon onClick={removePreview} />
            </div>
            <img src={imgData} alt="" id="previewImg" />
          </div>
        ) : (
          ""
        )}
        <div className="postBtn">
          <div className="uploadFiles">
            <label htmlFor="uploadImg">
              <AddPhotoAlternateIcon fontSize="large" />
            </label>
            <input
              type="file"
              ref={imgFile}
              name="postImg"
              id="uploadImg"
              accept="image/*"
              onChange={(e) => imagePreview(e)}
            />
            <label htmlFor="uploadVideo">
              <VideoCameraBackIcon fontSize="large" />
            </label>
            <input
              type="file"
              name="postImg"
              id="uploadVideo"
              accept="video/*"
            />
          </div>
          <Button variant="contained" className="createBtn">
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
