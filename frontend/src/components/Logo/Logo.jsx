import React from 'react'
import { Link } from 'react-router-dom'
import './logo.css'

export const Logo = (props) => {
  return (
    <Link to={`/home`} style={{ textDecoration: "none", color: '#121212', }}>
      <div className="logo" style={{ color: props.color }}><span style={{ color: "#607dff" }}>Edu</span>warts <span className='beta_logo'>β</span></div>
      {/* <img src="./images/logo.png" alt="" className='logoImg' /> */}
    </Link>
  )
}
