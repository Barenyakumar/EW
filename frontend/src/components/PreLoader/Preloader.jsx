import React from 'react'
import './prelaoder.css'
import { Helmet } from "react-helmet"


export default function Preloader() {
  return (
    <div className="preLoaderBody">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Loading... </title>
        <meta name="description" content="Loading... " />
      </Helmet>
      <div className="pl">
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__text">Eduwarts...</div>
      </div>
    </div>
  )
}
