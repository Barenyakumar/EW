
import React,{useState} from 'react'
import { useEffect } from 'react'

export default function AvatarSelection({elem,AvatarCallback,AvatarVal}) {
  const [selectedImg, setSelectedImg] = useState("")

  useEffect(()=>{
    AvatarCallback(selectedImg)
  },[selectedImg])

  // console.log(selectedImg)

  return (
    <div className="avatarSelectionContainer" onClick={()=>setSelectedImg(elem)} style={AvatarVal===elem?{border:"10px solid #344cb7"}:{}}>
      <img src={`/Avatars/Male/${elem}`} alt="" style={{height: "100%" , width: "100%" }} />
    </div>
  )
}
