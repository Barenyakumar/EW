import React from 'react'

export default function AvatarSelection({elem,AvatarCallback,AvatarVal,Gender}) {

  return (
    <div
      className="avatarSelectionContainer"
      onClick={() => AvatarCallback(elem)}
      style={AvatarVal === elem ? { border: "10px solid #344cb7" } : {}}
    >
      <img
        src={`/Avatars/${Gender}/${elem}`}
        alt=""
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  )
}
