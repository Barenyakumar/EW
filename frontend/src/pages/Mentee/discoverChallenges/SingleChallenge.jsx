// import * as React from "react"
// import PropTypes from "prop-types"
// import Tabs from "@mui/material/Tabs"
// import Tab from "@mui/material/Tab"
// import Typography from "@mui/material/Typography"
// import Box from "@mui/material/Box"
// import Overlay from "../../../components/overlay/Overlay"
// import PostList from "../../../components/postList/PostList"
// import Avatar from "@mui/material/Avatar"
// import './singleChallenge.css'


// function TabPanel(props) {
//   const { children, value, index, ...other } = props

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   )
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// }

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   }
// }

// export default function SingleChallenge() {
//   const [value, setValue] = React.useState(0)

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }
//   const text = "Start Challange"

//   return (
//     <div className="singleChallenge">
//       <div className="SingleChallengeImg">
//         <img
//           src="./images/3.jpg"
//           alt=""
//         />
//       </div>
//       <Box sx={{ width: "100%" }}>
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="basic tabs example"
//           >
//             <Tab label="About" {...a11yProps(0)} />
//             <Tab label="Posts" {...a11yProps(1)} />
//             <Tab label="Stats" {...a11yProps(2)} />
//           </Tabs>
//         </Box>
//         <TabPanel value={value} index={0}>
//           <h1>ARTsian Challenge</h1>
//           <Overlay
//             text={text}
//             title={"PhotoClick Challenge"}
//             author={"Barenya Kumar"}
//           />
//           <div className="aboutContainer">
//             <div className="aboutProfile">
//               <Avatar alt="Remy Sharp" src="./images/3.jpg" />
//               <span>Barenya Kumar Panda </span>
//             </div>
//           </div>
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           <PostList />
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           <h1>Top performers</h1>
//           <div className="stats">
//             <Avatar alt="Remy Sharp" src="./images/3.jpg" />
//             <span>Barenya Kumar Panda </span>
//             <span>12398</span>
//           </div>
//           <div className="stats">
//             <Avatar alt="Remy Sharp" src="./images/3.jpg" />
//             <span>Barenya Kumar Panda </span>
//             <span>12398</span>
//           </div>
//           <div className="stats">
//             <Avatar alt="Remy Sharp" src="./images/3.jpg" />
//             <span>Barenya Kumar Panda </span>
//             <span>12398</span>
//           </div>
//         </TabPanel>
//       </Box>
//     </div>
//   )
// }
