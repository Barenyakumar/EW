import React, { useEffect, useState } from "react"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { Button, IconButton } from "@mui/material"
import Avatar from "@mui/material/Avatar"

export const NotificationElement = (props) => {
  const [unreadStyle, setUnreadStyle] = useState("white")

  useEffect(() => {
    // console.log(props.booking)
    if (props.booking.read === 0) {
      setUnreadStyle("#a4a2a270")
    }
  }, [])
  return (
    <div
      className="notificationElemContentNotf"
      style={{ background: unreadStyle }}
    >
      <div className="photo">
        <Avatar
          alt="Remy Sharp"
          sx={{ bgcolor: "#344CB7 ", width: 56, height: 56 }}
          src="./images/3.jpg"
        />
      </div>
      <div className="info">
        <span className="notfDesc">Booking confirmed by Debraj Bhal</span>

        <IconButton aria-label="delete" color="primary">
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  )
}
