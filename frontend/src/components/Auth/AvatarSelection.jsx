import React,{useState} from 'react'

export default function AvatarSelection() {

  const [selectedImg, setSelectedImg] = useState("")

  return (
    <div className="avatarSelectionContainer" >
      <img src="/Avatars/Male/1.png" alt="" style={{height: "100%" , width: "100%" ,}} />
    </div>
  )
}
