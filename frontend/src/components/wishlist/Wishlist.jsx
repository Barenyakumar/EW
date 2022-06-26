import React from "react"
import MuiCardComplex from "../muiCard/MuiCardComplex"
import './wishlist.css'

export default function Wishlist() {
  return (
    <div className="Wishlist">
      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <span>You can check all your wishlist from here</span>
      </div>
      <div className="MuiCardComplex wishlistContent">
        {wishlist.map((elem) => (
          <div className="singleComplexCard">
            <MuiCardComplex element={elem} />
          </div>
        ))}
      </div>
    </div>
  )
}

const wishlist = [
  {
    id: 1,
    img: "3.jpg",
    sessionName: "Snigdha",
    experience: "Eduwarts intern",
  },
  {
    id: 2,
    img: "3.jpg",
    sessionName: "Snigdha",
    experience: "Eduwarts intern",
  },
  {
    id: 3,
    img: "3.jpg",
    sessionName: "Snigdha",
    experience: "Eduwarts intern",
  },
  {
    id: 4,
    img: "3.jpg",
    sessionName: "Snigdha",
    experience: "Eduwarts intern",
  },
  {
    id: 5,
    img: "3.jpg",
    sessionName: "Snigdha",
    experience: "Eduwarts intern",
  },
]
