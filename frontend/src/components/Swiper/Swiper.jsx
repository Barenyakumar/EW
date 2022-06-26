import React, { useRef, useState, useEffect } from "react"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import SingleCard from "../Card/Card"
import "./Swiperstyles.css"
 
// import required modules
import { Pagination, Navigation } from "swiper"
 
export default function SwiperMentor({arrayList}) {
  const [width, setWidth] = useState(window.innerWidth)
  // setWidth(window.innerWidth);
  const setSlide = (width) => {
    if (width <= 600) {
      return 1
    }
    else if(width<=990)
      return 2;
    else if (width <= 1200) {
      return 3
    } else return 3
  }

  const [slide_val, setSlide_val] = useState(setSlide(width))

  function widthset() {
    setWidth(window.innerWidth)
    console.log(width)
    setSlide_val(setSlide(width))
  }

  useEffect(() => {
    window.addEventListener("resize", widthset)
  })

  return (
    <>
      <Swiper
        slidesPerView={slide_val}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {arrayList.map(element=><SwiperSlide><SingleCard element={element}/></SwiperSlide>)}
      </Swiper>
    </>
  )
}
