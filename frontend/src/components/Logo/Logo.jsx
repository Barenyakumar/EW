import React from 'react'
import { Link } from 'react-router-dom'
import './logo.css'

export const Logo = () => {
  return (
    <Link to={`/home`} style={{textDecoration:"none" ,color: '#121212'}}>
      <div className="logo">EDUWARTS</div>
    </Link>
  )
}
