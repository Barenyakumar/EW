import React, { useState } from 'react'
import AvatarSelection from './AvatarSelection'
import './avatarselect.css'
import { Button } from '@mui/material';

export default function AvatarSelect() {
  const avatars = ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png", "7.png", "8.png", "9.png", "10.png",]
  const [AvatarVal, setAvatarVal] = useState("");
  const AvatarCallback = data => setAvatarVal(data)

  console.log(AvatarVal);
  return (
    <>
      <h1>Select your Avatar</h1>
      <div className="AvatarSelectContainerOuts">
        {
          avatars.map(elem => {
            return (
              <AvatarSelection key={elem} elem={elem} AvatarCallback={AvatarCallback} AvatarVal={AvatarVal} />
            )
          })
        }
      </div>
      <Button variant='outlined'>done</Button>
    </>
  )
}
