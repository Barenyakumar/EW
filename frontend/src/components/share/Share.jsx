import React, { useState, useRef, useContext } from "react"
import "./share.css"
import Avatar from "@mui/material/Avatar"
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack"
import Button from "@mui/material/Button"
import CloseIcon from "@mui/icons-material/Close"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import Popup from "../popup-box/Popup"

export const Share = () => {
    const [file, setFile] = useState(null)
    const [error, setError] = useState(false)


    const imgFile = useRef()
    const [imgData, setImgData] = useState("")
    const imagePreview = (e) => {
        console.log(e.target.files[0])
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
    const desc = useRef()
    const { user } = useContext(AuthContext)
    const publicFolder = "http://localhost:9000/UserImages/"
    // console.log(imgFile.current ? console.log(imgFile.current.files) : "")

    const filechange = (e) => {
        imagePreview(e)
        setFile(e.target.files[0])
    }
    const handlePost = async () => {
        if (file) {
            const data = new FormData()
            const fileName = Date.now() + file.name.replace(/ /g, "-")
            data.append("name", fileName)
            data.append("file", file)
            try {
                await axios.post("/upload", data)

                const submissionBody = {
                    userId: user._id,
                    postDesc: desc.current.value,
                    postImg: fileName,
                }
                try {
                    var challengeSubmission = await axios.post(
                        `/posts/`,
                        submissionBody
                    )

                } catch (error) {
                    setError(true)
                }

            } catch (err) {
                setError(true)

            }
        }
    }
    return (
        <div className="createPostContainer">
            <div id="avatar">
                <Avatar
                    className="avatarBadge"
                    sx={{ bgcolor: "#344CB7 " }}
                    src={
                        user.profileImage
                            ? publicFolder + user.profileImage
                            : `/Avatars/${user.gender}/${user.defaultImage}`
                    }
                    alt={user.name}
                ></Avatar>
            </div>
            <div className="postInput">
                <textarea
                    name="postDesc"
                    id="postTextArea"
                    placeholder={`What's in your mind...`}
                    ref={desc}
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
                            onChange={filechange}
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
                    <Button
                        variant="contained"
                        className="createBtn"
                        onClick={handlePost}
                    >
                        Post
                    </Button>
                </div>
                {error ? (
                    <Popup
                        flag={true}
                        message={"Something went wrong while file upload. Please try again later."}
                    />
                ) : (
                    ""
                )}
            </div>
        </div>
    )
}
