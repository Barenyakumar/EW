// import React, { useState, useEffect } from "react"
// import { CreatePost } from "../create_post/CreatePost"
// import { PostCard } from "../post/post"
// import Avatar from "@mui/material/Avatar"
// import EditIcon from "@mui/icons-material/Edit"
// import Fab from "@mui/material/Fab"
// import "./feed.css"
// import Dialog from "@mui/material/Dialog"
// import CloseIcon from "@mui/icons-material/Close"

// export const Feed = () => {
//   //adding responsiveness using inner width of device----------------------------------------------------
//   const [width, setWidth] = useState(window.innerWidth)
//   function widthset() {
//     setWidth(window.innerWidth)
//   }

//   useEffect(() => {
//     window.addEventListener("resize", widthset)
//   })

//   // dialog box opening function -------------------------------------------------------------------------
//   const [open, setOpen] = React.useState(false)
//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }
//   return (
//     <div className="feedContainer">
//       {width <= 900 ? (
//         <div className="addPost">
//           <Fab
//             sx={{ bgcolor: "#344CB7 " }}
//             aria-label="edit"
//             onClick={handleClickOpen}
//           >
//             <EditIcon />
//           </Fab>
//           <Dialog
//             open={open}
//             onClose={handleClose}
//             aria-labelledby="responsive-dialog-title"
//             maxWidth="lg"
//             fullWidth={true}
//           >
//             <CloseIcon
//               sx={{ position: "absolute", right: "0", marginBottom: "1rem" }}
//               onClick={handleClose}
//             />
//             <CreatePost />
//           </Dialog>
//         </div>
//       ) : (
//         <div className="card">
//           <CreatePost />
//         </div>
//       )}

//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//       <div className="card">
//         <PostCard />
//       </div>
//     </div>
//   )
// }
