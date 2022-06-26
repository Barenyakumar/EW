import React from "react"
import "./badge.css"
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"

export const MentorBadge = () => {
  return (
    <div className="badgeContainer">
      <MilitaryTechRoundedIcon className="badgeIcon" />
      <span className="badgeName">Mentor</span>
    </div>
  )
}
export const MenteeBadge = () => {
  return (
    <div className="badgeContainer">
      <SchoolRoundedIcon className="badgeIcon" />
      <span className="badgeName">Mentee</span>
    </div>
  )
}
