import React from 'react'
import { Link } from 'react-router-dom'
import './logo.css'

export const Logo = () => {
  return (
    <Link to={`/home`} style={{ textDecoration: "none" }}>
      <div className="logo">EDUWARTS</div>
    </Link>
  )
}
