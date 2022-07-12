import React, { useState, useEffect } from "react"
import { Box, Input, Alert } from "@mui/material"
import axios from "axios"

const EditImage = () => {
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [alert, setAlert] = useState({
    severity: "",
    msg: null,
  })

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    setImage(e.target.value)

    const formData = new FormData()
    formData.append("file", file)

    console.log(formData)

    setUploading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }

      console.log(file.name)

      const { data } = await axios.post("/upload", formData, config)

      console.log(data)
      setAlert({ severity: "success", msg: "File uploaded success" })
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  return (
    <>
      {alert.msg !== null && (
        <Alert severity={alert.severity}>{alert.msg}</Alert>
      )}

      <Box>
        <Input
          accept="image/*"
          id="contained-button-file"
          value={image}
          onChange={uploadFileHandler}
          type="file"
          sx={{ marginY: "20px" }}
        />
        {/* <Button variant="contained" component="span" onClick={uploadFileHandler}>
        Upload
      </Button> */}
      </Box>
    </>
  )
}

export default EditImage
