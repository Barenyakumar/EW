import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function InvalidURL () {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexWrap: "wrap",
      }}
    >
      <img
        src="/images/invalid.jpg"
        alt="Invalid URL"
        style={{ height: "30rem", width: "30rem" }}
      />
      <div
        className=""
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          flexDirection: "column",
          height: "16rem",
        }}
      >
        <div style={{ fontSize: "2rem", textAlign: "center" }}>
          You are lost somewhere.
        </div>
        <div className="">
          <Button variant="contained" component={Link} to={"/home"}>
            {" "}
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}

