import React, { useState } from 'react'
import AvatarSelection from './AvatarSelection'
import './avatarselect.css'
import { Button } from '@mui/material';

export default function AvatarSelect() {
  const avatars = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",]
  const [AvatarVal, setAvatarVal] = useState("");
  const AvatarCallback = data => setAvatarVal(data)

  // console.log(AvatarVal);
  return (
    <>
      <div
        className="avatarHeading"
        style={{
          margin: "1rem 0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Select your Avatar that suits you! </h1>
      </div>
      <div className="AvatarSelectContainerOuts">
        {avatars.map((elem) => {
          return (
            <AvatarSelection
              key={elem}
              elem={elem}
              AvatarCallback={AvatarCallback}
              AvatarVal={AvatarVal}
            />
          )
        })}
      </div>
      <div
        className="buttonAvatar"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem 0px",
        }}
      >
        <Button variant="contained">Clone this Avatar</Button>
      </div>
    </>
  )
}
