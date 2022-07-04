import React from 'react'
import CopyrightIcon from "@mui/icons-material/Copyright"
import { Logo } from '../Logo/Logo'

export default function Footer() {
  return (
    <div
      className="footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "20vh",
        width: "100%",
        margin: "0px auto",
        marginTop: "1rem",
        border: "1px solid grey",
        // position: "absolute",
        // bottom: "0px",
        // background: "linear-gradient(180deg, rgba(47,47,47,1) 0%, rgba(64,64,64,1) 50%, rgba(134,134,134,1) 100%)",
        // background: "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(103,103,103,1) 60%, rgba(0,0,0,1) 100%)",
        background: "#121212",
        color: "#fff",
        fontSize: "16px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Logo />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CopyrightIcon /> 2022 Eduwarts | All rights reserved.
      </div>
    </div>
  )
}
