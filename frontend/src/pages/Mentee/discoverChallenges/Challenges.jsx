// import * as React from "react"
// import PropTypes from "prop-types"
// import Tabs from "@mui/material/Tabs"
// import Tab from "@mui/material/Tab"
// import Typography from "@mui/material/Typography"
// import Box from "@mui/material/Box"
// import SearchBar from "../../../components/searchBar/SearchBar"
// import SwiperMentor from "../../../components/Swiper/Swiper"

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

// const challengeList = [
//   {
//     mentorName: "ARTsian Challenge",
//     role: "Time limit : 24hrs",
//     bio: "By Kumar Barenya",
//     img: "m3.jfif",
//   },
//   {
//     mentorName: "ARTsian Challenge",
//     role: "Time limit : 24hrs",
//     bio: "By Kumar Barenya",
//     img: "m4.jfif",
//   },
//   {
//     mentorName: "ARTsian Challenge",
//     role: "Time limit : 24hrs",
//     bio: "By Kumar Barenya",
//     img: "m5.jfif",
//   },
//   {
//     mentorName: "ARTsian Challenge",
//     role: "Time limit : 24hrs",
//     bio: "By Kumar Barenya",
//     img: "m6.jfif",
//   },
// ]

// export default function Challenges() {
//   const [value, setValue] = React.useState(0)

//   const handleChange = (event, newValue) => {
//     setValue(newValue)
//   }

//   return (
//     <div className="Challenges">
//       <h1>Explore Challenges</h1>
//       <div style={{height:"100%" , width:"100%"}}>
        
//       {/* <SearchBar /> */}

//       <Box sx={{ width: "100%" }}>
//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             aria-label="basic tabs example"
//           >
//             <Tab label="Art" {...a11yProps(0)} />
//             <Tab label="Photography" {...a11yProps(1)} />
//             <Tab label="Development" {...a11yProps(2)} />
//           </Tabs>
//         </Box>
//         <TabPanel value={value} index={0}>
//           <div>
//             <h2>Recommended</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Trending</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Latest</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//         </TabPanel>
//         <TabPanel value={value} index={1}>
//           <div>
//             <h2>Recommended</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Trending</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Latest</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//         </TabPanel>
//         <TabPanel value={value} index={2}>
//           <div>
//             <h2>Recommended</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Trending</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//           <div>
//             <h2>Latest</h2>
//             <SwiperMentor arrayList={challengeList} />
//           </div>
//         </TabPanel>
//       </Box>
//       </div>
//     </div>
//   )
// }
