import React, { useState, useEffect } from "react"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { Link } from "react-router-dom"

export default function PostList({ itemData }) {
  const [width, setWidth] = useState(window.innerWidth)
  // setWidth(window.innerWidth);
  const setSlide = (width) => {
    if (width <= 600) {
      return 2
    } else if (width <= 1000) {
      return 3
    } else return 4
  }

  const [slide_val, setSlide_val] = useState(setSlide(width))

  function widthset() {
    setWidth(window.innerWidth)
    // console.log(width)
    setSlide_val(setSlide(width))
  }

  useEffect(() => {
    window.addEventListener("resize", widthset)
  })

  const public_folder = "http://localhost:9000/UserImages/"
  return (
    <div className="postContainer" style={{ marginBottom: "2rem" }}>
      <ImageList cols={slide_val}>
        {itemData.map((item) => (
          <Link to={`/challengeposts/${item._id}`}>
            <ImageListItem key={item._id}>
              <img
                src={`${public_folder + item.solutionImg}`}
                srcSet={`${public_folder + item.solutionImg}`}
                alt={item.title}
                loading="lazy"
                style={{ padding: "0.5rem" }}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </div>
  )
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
]

const challengeList = [
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m3.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m4.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m5.jfif",
  },
  {
    mentorName: "ARTsian Challenge",
    role: "Time limit : 24hrs",
    bio: "By Kumar Barenya",
    img: "m6.jfif",
  },
]
